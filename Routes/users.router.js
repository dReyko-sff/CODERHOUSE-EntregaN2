import { Router } from "express";

export default function usersRouter(userManager, io) {
  const router = Router();

  router.get("/", (req, res) => {
    res.json(userManager.getAll());
  });

  router.post("/", (req, res) => {
    const newUser = userManager.create(req.body);
    io.emit("updateUsers", userManager.getAll());
    res.status(201).json(newUser);
  });

  router.put("/:id", (req, res) => {
    userManager.update(req.params.id, req.body);
    io.emit("updateUsers", userManager.getAll());
    res.json({ message: "Actualizado" });
  });

  router.delete("/:id", (req, res) => {
    userManager.delete(req.params.id);
    io.emit("updateUsers", userManager.getAll());
    res.json({ message: "Eliminado" });
  });

  return router;
}