import { configDotenv } from "dotenv";
import { listen } from "./core/server/server";

configDotenv()
listen(process.env.PORT || '3000')
