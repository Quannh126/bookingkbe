import "dotenv/config";
import express from "express";
import { Route } from "@core/interfaces";
import mongoose from "mongoose";
import hpp from "hpp";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import { Logger } from "@core/utils";
import { errorMiddleware } from "@core/middlewares";
import cookieParser from "cookie-parser";
// ...
import swaggerUi from "swagger-ui-express";
import http from "http";
import socketIo from "socket.io";
import YAML from "yamljs";
class App {
    // public io: Server;
    public app: express.Application;
    public port: string | number;
    public production: boolean;
    public server: http.Server;
    public io: socketIo.Server;
    constructor(routes: Route[]) {
        this.app = express();
        this.server = http.createServer(this.app);
        this.io = new socketIo.Server(this.server);
        this.port = process.env.PORT || 5000;
        this.production = process.env.NODE_ENV === "production" ? true : false;
        this.initializeMiddleWares();
        this.connectToDatabase();
        this.initializeRoutes(routes);
        this.initializeErrorMiddlewares();
        this.initializeSwagger();
        this.initSocketIo();
    }

    private initializeMiddleWares() {
        if (this.production) {
            this.app.use(hpp());
            this.app.use(helmet());
            this.app.use(
                cors({
                    origin: "https://booking-k.vercel.app/",
                    credentials: true,
                })
            );
            this.app.use(morgan("combinded"));
        } else {
            this.app.use(
                cors({
                    origin: "https://booking-k.vercel.app",
                    credentials: true,
                })
            );
            this.app.use(morgan("dev"));
        }

        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(cookieParser());
    }
    private initSocketIo() {
        this.server = http.createServer(this.app);
        this.io = new socketIo.Server(this.server, {
            cors: {
                origin: "*",
            },
        });
        this.app.set("socketio", this.io);

        const listCar: any = {};
        this.io.on("connection", (socket: socketIo.Socket) => {
            //Logger.warn("a user connected : " + socket.id);
            console.log("a client connected: " + socket.id);
            //socket.emit("getData", "Hello " + socket.id);

            socket.on("get_init", function (data) {
                // Logger.warn("a user " + data.listCar + " connected");
                console.log("List coaches: " + data.listCar);
                listCar[socket.id] = data.listCar;
            });
            socket.on("seatBooked", function (data) {
                // Logger.warn("a user " + data.listCar + " connected");
                console.log(
                    "List coaches: " + data.car_id + "-" + data.seatCount
                );
                socket.emit("change_data");
            });
            socket.on("disconnect", function () {
                Logger.warn("user " + listCar[socket.id] + " disconnected");
                // remove saved socket from users object
                delete listCar[socket.id];
                //Logger.warn("socket disconnected : " + socket.id);
            });
        });
    }
    private initializeErrorMiddlewares() {
        this.app.use(errorMiddleware);
    }
    public listen() {
        this.app.listen(this.port, () => {
            Logger.info(`Server is listening on port ${this.port}`);
        });
    }
    private initializeRoutes(routes: Route[]) {
        routes.forEach((route) => {
            this.app.use("/api/v1/", route.router);
        });
    }

    private connectToDatabase() {
        const connectString = process.env.MONGODB_URL;
        const options = {};
        if (!connectString) {
            Logger.info("Connecting string is blank");
            return;
        }
        mongoose.connect(connectString).catch((error) => {
            Logger.error(error);
        });
        Logger.info("Database connected...");
    }

    private initializeSwagger() {
        const swaggerDocument = YAML.load("./src/swagger.yaml");

        this.app.use(
            "/swagger",
            swaggerUi.serve,
            swaggerUi.setup(swaggerDocument)
        );
    }
}

export default App;
