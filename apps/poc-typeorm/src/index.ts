import "reflect-metadata";
import { getAppDataSource } from "./datasource";

const ds = getAppDataSource();

ds.initialize();

console.log("hello world");
