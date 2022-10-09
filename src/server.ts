import express, {Express} from "express";
import 'dotenv/config'
import router from "@/routes";

const app: Express = express();
const port = process.env.PORT

app.use('/api', router)

app.listen(port, () => console.log(`Express App is running on PORT : ${port}`));
