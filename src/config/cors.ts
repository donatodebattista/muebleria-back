import { CorsOptions } from "cors";

export const corsConfig: CorsOptions = {
  origin: function (origin, callback) {

    const allowedOrigins = [
      process.env.FRONT_URL,
      'https://muebleriadonpepe.netlify.app',
      'http://localhost:5173'
    ];

    if (!origin) {
      return callback(null, true);
    }

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('ERROR de CORS: Acceso Denegado'));
    }
  },
  credentials: true
};