import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors"
import router from "./router/userrouter";

export const MainApp = (app:Application) => {
    app.use(express.json())
        .use(cors())
      
        .get("/", (req: Request, res: Response) => {
            
            res.status(200).json({
                message:"api is ready"
            })
        
        })
    .use("/api", router)
}