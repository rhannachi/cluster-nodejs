import express, {Express} from "express";
import router from "@/routes";
import {PORT} from "@/config";

const app: Express = express();

app.use('/api', router)

app.listen(PORT, () => console.log(`Express App is running on PORT : ${PORT}`));
