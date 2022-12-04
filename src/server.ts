import "dotenv/config";
import App from "./app";
import {IndexRoute} from './modules/index';
require('dotenv').config()
const routes = [new IndexRoute()]
const app = new App(routes);

app.listen();