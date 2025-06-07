import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

export class AuthRoutes {
  public static bind(): Router {
    const router = Router();

    const controller = new AuthController();

    /**
     * @swagger
     * /login:
     *   post:
     *     summary: Realiza o login do usuário
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               email:
     *                 type: string
     *                 example: usuario@email.com
     *               senha:
     *                 type: string
     *                 example: senha123
     *     responses:
     *       200:
     *         description: Login realizado com sucesso.
     *       401:
     *         description: Credenciais inválidas.
     */
    router.post("/login", controller.login);

    return router;
  }
}
