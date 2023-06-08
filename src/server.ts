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
import { CustomerRoute } from "@modules/customer";
import { BookingRoute } from "@modules/book";
import { TestsRoute } from "@modules/testquery/cars";
import { UploadRoute } from "@modules/upload/users";
validateEnv();
const routes = [
    new IndexRoute(),
    new UserRoute(),
    new AuthRoute(),
    new CarsRoute(),
    new TripsRoute(),
    new UploadRoute(),
    new LocationRoute(),
    new CustomerRoute(),
    new BookingRoute(),
    new TestsRoute(),
];
const app = new App(routes);

app.listen();
