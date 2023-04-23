import jwt from "jsonwebtoken"

export const TokenGenerator = (data:any) => {
    return jwt.sign(data, "thisisthesecrect", {expiresIn:"15s"})
}

export const  refreshToken = (data:any) => {
     return jwt.sign(data, "refreshsecrect", {expiresIn:"3m"})
}