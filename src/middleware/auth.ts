import type { Request, Response, NextFunction } from "express";
import jwt  from 'jsonwebtoken'

export const protect = async (req: Request, res: Response, next: NextFunction) => {
  const bearer = req.headers.authorization;

   if (!bearer) {
     const error = new Error("Usuario no autorizado. No se ha proporcionado un token de autenticación");
     res.status(401).json({ error: error.message });
     return;
   }

   
    const token = bearer.split(" ")[1]

   if (!token) {
    const error = new Error("Usuario no autorizado. Token de autenticación inválido");
    res.status(401).json({ error: error.message });
    return;
    }

   try {
        jwt.verify(token, process.env.JWT_SECRET);
        next()
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Error al verificar el token de autenticación" });
    }
}