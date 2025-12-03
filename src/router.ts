import { createClient, deleteClient, getClient, getClients, updateClient } from "./handlers"
import { validateRequest } from "./middleware/validation"
import { login } from "./handlers/index"
import { Router } from "express"
import { body } from "express-validator"
import { protect } from "./middleware/auth"

const router = Router()

//AUTH
router.post('/auth',
    body('username')
    .notEmpty()
    .withMessage('El usuario no puede ir vacio'),
    body('password')
    .notEmpty()
    .withMessage('La contraseña no puede ir vacia'),
    validateRequest,
    login
    )

router.get('/clientes', protect, getClients)

router.get('/clientes/:id', protect, getClient)

router.post(
  '/clientes/nuevoCliente',
  protect,
  body('name')
    .notEmpty()
    .withMessage('El nombre no puede ir vacio'),

  body('product')
    .notEmpty()
    .withMessage('Ingrese al menos un producto'),

  body('facturado')
    .isBoolean()
    .withMessage('Indique si el producto fue facturado o no'),

  body('fechaInicio'),

  validateRequest,
  createClient
);


router.patch(
  '/clientes/updateClient/:id',
  protect,
  body('name')
    .notEmpty()
    .withMessage('El nombre no puede ir vacio'),

  body('product')
    .notEmpty()
    .withMessage('Ingrese al menos un producto'),

  body('facturado')
    .isBoolean()
    .withMessage('Indique si el producto fue facturado o no'),

  body('fechaInicio')
    .notEmpty()
    .withMessage('Debe ingresar una fecha'),

  validateRequest,
  updateClient
);

router.delete('/clientes/:id', protect, deleteClient)

export default router