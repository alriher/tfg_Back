import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user.route.js";
import spaceRoutes from "./routes/space.route.js";
import bookingRoutes from "./routes/booking.route.js";
import loginRoutes from "./routes/login.route.js";

//Crea la aplicación web.
const app = express();

//Define desde qué direcciones se permite acceder al servidor (por seguridad). 
//Por ejemplo, tu frontend si es otra app o está en otro puerto.
const CLIENT_URL = process.env.CLIENT_URL || "";
const CLIENT_URL_LOCALHOST = process.env.CLIENT_URL_LOCALHOST || "";

//Permite solicitudes desde otros orígenes (cross-origin), y habilita el uso de cookies entre frontend y backend.
app.set("trust proxy", true);
app.use(
  cors({
    credentials: true,
    origin: [CLIENT_URL, CLIENT_URL_LOCALHOST],
  })
);

//Prepara el servidor para leer cookies y entender datos en formato JSON
app.use(cookieParser());
app.use(express.json());

//Aquí conecta cada "sección" (ruta) del backend. 
//Cuando alguien visita /users, va a usar lo que esté definido en user.route.js, y así con las demás.
app.use("/users", userRoutes); 
app.use("/spaces", spaceRoutes); //Todo lo que hay creado en spaceRoutes se va a montar en /spaces
app.use("/bookings", bookingRoutes);
app.use("/", loginRoutes);

export default app;
