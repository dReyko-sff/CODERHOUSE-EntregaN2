import express from "express";
import { engine } from "express-handlebars";
import http from "http";
import { Server } from "socket.io";

import UserManager from "./managers/UserManager.js";
import usersRouter from "./Routes/users.router.js";
import viewsRouter from "./Routes/views.router.js";

const app = express();
const server = http.createServer(app); 
const io = new Server(server);

const PORT = 8080;

const userManager = new UserManager();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./public"));

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

// Routers
app.use("/api/users", usersRouter(userManager, io));
app.use("/", viewsRouter(userManager));

// Websocket
io.on("connection", socket => {
  console.log("Cliente conectado");

  socket.emit("updateUsers", userManager.getAll());

  socket.on("createUser", data => {
    userManager.create(data);
    io.emit("updateUsers", userManager.getAll());
  });

  socket.on("deleteUser", id => {
    userManager.delete(id);
    io.emit("updateUsers", userManager.getAll());
  });
});

// Servidor local
server.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});