import "reflect-metadata"
import { DataSource } from "typeorm"
import {user} from "../Model/user_entity"


export const dataConnect = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "ilovemusic12345@",
    database: "eddata",
    entities: [user],
    synchronize: true,
    logging: false,
})