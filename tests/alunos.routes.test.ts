import request from "supertest";
import { createServer } from "../src/express.server";
import { prismaMock } from "./config/prisma.mock";

const server = createServer();

describe("Testes de API - Alunos", () => {
  beforeEach(() => {
    prismaMock.aluno.findMany.mockResolvedValue([
      {
        id: "1",
        nome: "João Silva",
        email: "joao@email.com",
        idade: 25,
        senha: "senha123",
        criadoEm: new Date(),
        atualizado_em: new Date(),
      },
    ]);

    prismaMock.aluno.create.mockResolvedValue({
      id: "2",
      nome: "Maria Oliveira",
      email: "maria@email.com",
      idade: 30,
      senha: "senha456",
      criadoEm: new Date(),
      atualizado_em: new Date(),
    });
  });

  it("deve retornar 200 ao listar alunos", async () => {
    const result = await request(server).get("/alunos").send();
    expect(result.statusCode).toBe(200);
    expect(result.body).toHaveProperty("sucesso", true);
    expect(result.body.dados).toHaveLength(1);
  });

  it("deve retornar 201 ao cadastrar um aluno", async () => {
    const result = await request(server).post("/alunos").send({
      nome: "Maria Oliveira",
      email: "maria@email.com",
      senha: "senha456",
    });
    expect(result.statusCode).toBe(201);
    expect(result.body).toHaveProperty("sucesso", true);
  });
});