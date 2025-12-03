import type { Request, Response } from "express";
import { isValidDDMMYYYY } from "../utils/dateUtils";
import Client from "../models/Client";
import type { IClient } from "../models/Client";
import mongoose from "mongoose";
import { generateJWT } from "../utils/jwt";



// declare global {
//     namespace Express {
//         interface Request {
//             user?: IClient
//         }}}


export const getClient = async (req: Request, res: Response) => {
    try{
      const { id } = req.params      
      if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: 'ID de cliente inválido' })
      }

      // Buscar y eliminar
      const client = await Client.findById(id)

      if (!client) {
        return res.status(404).json({ msg: 'Cliente no encontrado' })
      }

      res.json(client)

    } catch (error) {
        res.status(500).json({ msg: 'Error del servidor' })
    }
}

export const getClients = async (req: Request, res:Response ) => {
  try {
    const clients = await Client.find()
    res.json(clients)
  } catch (error) {
    res.status(500).json({ msg: 'Error del servidor' })
  }
}

export const createClient = async (req: Request, res: Response) => {
    try {
        const client = new Client(req.body)
        await client.save()
        res.status(201).send('Cliente creado correctamente')
    } catch (error) {
        res.status(500).json({ message: "Error al crear cliente" })
    }
}

export const updateClient = async (req: Request, res: Response) => {
   try {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
       return res.status(400).json({ message: 'ID inválido' })
    }

    // Comprueba si existe antes de actualizar (para dar feedback claro)
    const existing = await Client.findById(id)
    if (!existing) {
      return res.status(404).json({ message: 'Cliente no encontrado' })
    }

    const updatedClient = await Client.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    })

    if (!updatedClient) {
      return res.status(500).json({ message: 'No se pudo actualizar el cliente' })
    }
    
    
    return res.json({ message: 'Cliente actualizado', client: updatedClient })
  } catch (error: any) {
    return res.status(500).json({ message: 'Error del servidor' })
  }
}

export const deleteClient = async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      
      // Verificar si el id es válido
      if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: 'ID inválido' })
      }

      // Buscar y eliminar
      const client = await Client.findByIdAndDelete(id)

      if (!client) {
        return res.status(404).json({ msg: 'Cliente no encontrado' })
      }

      res.json({ msg: 'Cliente eliminado correctamente', client })

    } catch (error) {
        res.status(500).json({ msg: 'Error del servidor' })
    }
}


export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body

  if (!username || !password) {
    return res.status(400).json({ msg: "Usuario y contraseña requeridos" })
  }

  if (username !== process.env.APP_USER || password !== process.env.APP_PASS) {
    return res.status(401).json({ msg: "Usuario o contraseña incorrecto" })
  }
  
  const token = generateJWT({user: 'admin'})
  return res.send(token)
}