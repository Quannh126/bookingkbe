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
import { PermissionRoute } from "@modules/permissions";
import { CoachRoute } from "@modules/coach";
import { PaymentRoute } from "@modules/payment";
// import { UserRoute } from "@modules/users";
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
    new PermissionRoute(),
    new CoachRoute(),
    new PaymentRoute(),
    // new UserRoute()
];
const app = new App(routes);

app.listen();
