import bodyParser from "body-parser";
import express from "express";

import { UserController } from "./interfaces/controllers/UserController";

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Rutas de la API
app.get("/users", UserController.getAllUsers);
app.get("/users/:id", UserController.getUserById);
app.post("/users", UserController.createUser);
app.put("/users/:id", UserController.updateUser);
app.delete("/users/:id", UserController.deleteUser);

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
