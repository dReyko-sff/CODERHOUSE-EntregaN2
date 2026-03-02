import { Router } from "express";

export default function viewsRouter(userManager) {
  const router = Router();

  router.get("/", (req, res) => {
    res.render("home", { users: userManager.getAll() });
  });

  router.get("/realtimeproducts", (req, res) => {
    res.render("realTimeProducts");
  });

  return router;
}