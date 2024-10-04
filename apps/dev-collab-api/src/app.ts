import express from "express"
import helmet from "helmet"
import routes from "./routes/v1"
const app = express();

app.use(helmet());
app.use(express.json())

app.use("/v1", routes);
export default app;