import * as env from "dotenv";
import { EnvironmentsType } from "../types";

export const environment = env.config().parsed as unknown as EnvironmentsType;
