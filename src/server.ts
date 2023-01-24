import "dotenv/config";
import App from "./app";
import { IndexRoute } from "@modules/index";
import { UserRoute } from "@modules/users";
import { validateEnv } from "@core/utils";
import { AuthRoute } from "@modules/auth";
import { CarsRoute } from "@modules/cars";
import { TripsRoute } from "@modules/trips";
import { LineRoute } from "@modules/lines";
import LocationRoute from "@modules/location/location.route";
validateEnv();
const routes = [
    new IndexRoute(),
    new UserRoute(),
    new AuthRoute(),
    new CarsRoute(),
    new TripsRoute(),
    //new LineRoute(),
    new LocationRoute(),
];
const app = new App(routes);

app.listen();
