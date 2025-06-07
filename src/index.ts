import express from "express";
import { envs } from "./envs";
import { AlunosRoutes } from "./routes/alunos.routes";
import { TurmasRoutes } from "./routes/turmas.routes";
import { MatriculasRoutes } from "./routes/matriculas.routes";
import { AuthRoutes } from "./routes/auth.routes";
import { ProjetosRoutes } from "./routes/projetos.routes";
import cors from "cors";
import { setupSwagger } from "./swagger";

const app = express();
app.use(express.json());
app.use(cors());

setupSwagger(app);

app.get("/", (_, res) => {
  res.status(200).json({
    sucesso: true,
    mensagem: "API is running",
  });
});

app.use(AlunosRoutes.bind());
app.use(TurmasRoutes.bind());
app.use(MatriculasRoutes.bind());
app.use(AuthRoutes.bind());
app.use(ProjetosRoutes.bind());

app.listen(envs.PORT, () => console.log("Server is running"));
