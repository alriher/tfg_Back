import express from "express"
import cookieParser from "cookie-parser"
import userRoutes from "./routes/user.route.js"
import spaceRoutes from "./routes/space.route.js"
import bookingRoutes from "./routes/booking.route.js"
import loginRoutes from "./routes/login.route.js"

const app = express()

app.set("trust proxy", true);

app.use(cookieParser());
app.use(express.json());

app.use("/users", userRoutes); //Todo lo que hay creado en userRoutes se va a montar en /users
app.use("/spaces", spaceRoutes);
app.use("/bookings", bookingRoutes);
app.use("/", loginRoutes);

export default app