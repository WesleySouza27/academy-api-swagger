import express from "express";
import cors from "cors";
import { AlunosRoutes } from "./routes/alunos.routes";
import { TurmasRoutes } from "./routes/turmas.routes";
import { MatriculasRoutes } from "./routes/matriculas.routes";
import { AuthRoutes } from "./routes/auth.routes";
import { ProjetosRoutes } from "./routes/projetos.routes";

export const createServer = () => {
  const app = express();
  app.use(express.json());
  app.use(cors());

  app.use(AlunosRoutes.bind());
  app.use(TurmasRoutes.bind());
  app.use(MatriculasRoutes.bind());
  app.use(AuthRoutes.bind());
  app.use(ProjetosRoutes.bind());

  return app;
};