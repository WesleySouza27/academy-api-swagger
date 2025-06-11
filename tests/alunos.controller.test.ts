import { AlunosController } from "../src/controllers/alunos.controller";
import { prismaMock } from "./config/prisma.mock";

describe("AlunosController", () => {
  const controller = new AlunosController();

  it("deve listar os alunos com sucesso", async () => {
    prismaMock.aluno.findMany.mockResolvedValue([
    {
      id: "1",
      nome: "João Silva",
      email: "joao@email.com",
      idade: 25,
      senha: "senha123",
      criadoEm: new Date("2025-06-11T17:20:38.397Z"), // Use uma instância de Date
      atualizado_em: new Date("2025-06-11T17:20:38.397Z"), // Use uma instância de Date
    },
  ]);

    const req = { query: {} } as any;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as any;

    await controller.listar(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      sucesso: true,
      mensagem: "Alunos listados com sucesso",
      dados: [
        {
          id: "1",
          nome: "João Silva",
          email: "joao@email.com",
          idade: 25,
          criadoEm: expect.any(Date),
          atualizado_em: expect.any(Date),
        },
      ],
    });
  });
});