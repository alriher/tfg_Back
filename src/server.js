import express from "express"
import userRoutes from "./routes/user.route.js"

const app = express()

app.set("trust proxy", true);
app.use(express.json());

app.use("/users", userRoutes);
// app.use("/spaces", spaceRoutes)

export default app