import express from 'express'
import {Route} from '@core/interfaces'
import mongoose from 'mongoose';
import hpp from 'hpp';
import helmet from 'helmet'
import cors from 'cors';
import morgan from 'morgan'
import { Logger } from '@core/utils';
import { errorMiddleware } from '@core/middlewares';
class App {
    public app: express.Application;
    public port: string | number;
    public production: boolean;
    constructor(routes: Route[]){
        this.app = express();
        this.port = process.env.PORT || 5000;
        this.production = process.env.NODE_ENV === 'production'? true : false;
        this.initializeMiddleWares();
        this.connectToDatabase();
        this.initializeRoutes(routes);
        this.initializeErrorMiddlewares();
    }

    private initializeMiddleWares(){
        if(this.production){
            this.app.use(hpp());
            this.app.use(helmet());
            this.app.use(cors({origin: 'https://booking-k.vercel.app/', credentials: true}));
            this.app.use(morgan('combinded'));
        }else{
            this.app.use(cors({origin: true, credentials: true}));
            this.app.use(morgan('dev'));
        }
        
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: true}));
        
    }
    private  initializeErrorMiddlewares(){
        this.app.use(errorMiddleware);
    }
    public listen(){
        this.app.listen(this.port, ()=>{
            Logger.info(`Server is listening on port ${this.port}`);
        });
    }
    private initializeRoutes(routes: Route[]){
        routes.forEach((route)=> {
            this.app.use('/', route.router);
        })
    }

    private connectToDatabase(){
        
            const connectString = process.env.MONGODB_URL;
            const options = {
            };
            if(!connectString){
                Logger.info('Connectiong string is blank');
                return;
            }
            mongoose
                .connect(connectString).catch((error)=>{
                    Logger.error(error);
            })
            Logger.info('Database connected...')   
    }

    
}

export default App;