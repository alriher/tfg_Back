import express from "express"
import userRoutes from "./routes/user.route.js"
import spaceRoutes from "./routes/space.route.js"

const app = express()

app.set("trust proxy", true);
app.use(express.json());

app.use("/users", userRoutes); //Todo lo que hay creado en userRoutes se va a montar en /users
app.use("/spaces", spaceRoutes)


export default app