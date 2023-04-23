import { user } from "../Model/user_entity"
import jwt from "jsonwebtoken";

import { Request, Response } from "express";
import {TokenGenerator,refreshToken} from "../utils/GenerateToke"

export const  createUser = async (req: Request, res: Response) => {
    try
    {
        const { username, email, password } = req.body;
        
        const userData = await user.create({ email, username, password }).save()
        
        res.status(200).json({
            message: "created",
            data: userData,
        })
        
    } catch (error)
    {
        return res.status(400).json({
            message:"An Error occure" + error
        })
    }
}

export const getOneUser = async (req: Request, res: Response) => {
    try
    {
        const { id } = req.params

        const getuser = await user.find({ where: { id } })

          res.status(200).json({
            message: "all users found",
            data: getuser,
        })
        
    } catch (error)
    {
        return res.status(400).json({
            message:"An Error occure" + error
        })
    }
}

export const viewAllUser = async (req: Request, res: Response) => {
    try
    {
        const alluser = await user.find()

          res.status(200).json({
            message: "all users found",
            data: alluser,
        })
        
    } catch (error)
    {
        return res.status(400).json({
            message:"An Error occure" + error
        })
    }
}


export const userVerify = async (req: Request, res: Response) => { 

    try
    {
        const { id } = req.params
        const getOne = await user.findOne({ where: { id } })

        const token = TokenGenerator({
            id: getOne.id,
            email: getOne.email,
            verified:true
        })

        console.log(token)

        const userInfo = await user.merge(getOne, { verified: true }, { token: token }).save()
        
        return res.status(200).json({
            message: 'user has been verify',
            data:userInfo
        })

        
    } catch (error)
    {
         return res.status(400).json({
            message:"An Error occure" + error
        })
    }
}

export const loginUser = async (req: Request, res: Response) => {
    try
    {
        const { email, password} = req.body
        const { id } = req.params
        const checkUser = await user.findOneBy({ email });
        
        if (checkUser)
        {
            const matchPassword = await checkUser.checkPassword(password)

            if (matchPassword)
            {
                const token= TokenGenerator({
                    id: checkUser.id,
                    email: checkUser.email,
                    verified:true
                })

                const tokenRefresh = refreshToken({
                    id: checkUser.id,
                    email: checkUser.email,
                    verified:true
                })

                return res.status(200).json({
                    message: "login successfull",
                    data: {
                        checkUser, token, tokenRefresh
                    }
                })
                
            } else
            {
               return res.status(200).json({ message:"incorrect password" })  
            }
        } else
        {
            return res.status(200).json({ message:"user not found" })
        }

        
        
    } catch (error)
    {
         return res.status(400).json({
            message:"An Error occure" + error
        })
    }
}

export const userTokenRefresh = async (req: Request, res: Response) => {
    try
    {
        const {refresh} = req.body

        const newToken = jwt.verify(
            refresh,
            "refreshsecrect",
            (error: Error, payload: jwt.JwtPayload) => {
                if (error)
                {
                    if (error.name === "TokenExpiredError") {
                        res.json({
                        message: "jwt expired",
                        });
                    } else {
                        throw error;
                    }
                } else
                {
                    const token = TokenGenerator(
                          {
                        id: payload.id,
                        email: payload.email,
                        verified: payload.verified,
                        },
                    )

                    const tokenRefresh = req.params.refresh


                    return res.status(200).json({
                        messagw: "login sucessfully",
                        data: {
                            token, tokenRefresh
                        }
                    })

                    
               }
           } 

        )
    
    } catch (error)
    {
          return res.status(400).json({
            message:"An Error occure" + error
        })
    }
}