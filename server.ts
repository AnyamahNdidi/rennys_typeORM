import express, { Application, NextFunction, Request, Response } from "express";
import { MainApp } from "./mainApp"
import {dataConnect} from "./confirg/db"

const app: Application = express()
const port:number = 9070


dataConnect
	.initialize()
	.then(() => {
		console.log("posgres database is connected");
	})
	.catch((err) => {
		console.log("an error occured with the database", err); 
	});

const server = app.listen(port,() => {
    console.log(`server is listening on port ${port}`)
})



MainApp(app)
process.on("uncaughtExpection", (err: Error) => {
    console.log("shutting down server")
    console.log(err)
    process.exit(1);
})

process.on("unhandledRejection", (reason:Error) => {
    console.log("shutting down: unhandled rejection")
    console.log(reason)
    process.exit(1);

    server.close(() => {
        process.exit(1)
    })
})