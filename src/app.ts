import express from 'express'
import {Route} from 'core/interfaces'
import mongoose from 'mongoose';
class App {
    public app: express.Application;
    public port: string | number;
    constructor(routes: Route[]){
        this.app = express();
        this.port = process.env.PORT || 5000;
        this.initializeRoutes(routes);
        this.connectToDatabase();
    }
    public listen(){
        this.app.listen(this.port, ()=>{
            console.log(`Server is listening on port ${this.port}`);
        });
    }
    private initializeRoutes(routes: Route[]){
        routes.forEach((route)=> {
            this.app.use('/', route.router);
        })
    }

    private connectToDatabase(){
        try {
            const connectString = process.env.MONGODB_URL;
            
            if(!connectString){
                console.log('Connectiong string is blank');
                return;
            }
            mongoose.connect(connectString);
            console.log('Database connected...')
        } catch (error) {
            console.log("Connect to database error")
        }
    }
}

export default App;