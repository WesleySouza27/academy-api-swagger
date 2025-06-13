import { authMiddleware } from "../../src/middlewares/auth.middleware";
import { prismaMock } from "../config/prisma.mock";
import { JWT } from "../../src/utils/jwt";

describe("AuthMiddleware", () => {
  it("deve autorizar o usuário com token válido", async () => {
    const payload = { id: "1", nome: "João Silva", email: "joao@email.com" };
    const jwt = new JWT();
    const randomToken = jwt.encoder(payload); // Gera um token válido

    const req = {
      headers: { authorization: `Bearer ${randomToken}` },
      method: "GET", // Adicione o método HTTP
      path: "/alunos", // Adicione o path da rota
    } as any;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as any;

    const next = jest.fn();

    // Mock do Prisma para retornar permissões esperadas
    prismaMock.permissao.findMany.mockResolvedValue([
      {
        alunoId: "1",
        funcionalidadeId: "1",
        ler: true,
        criar: true,
        atualizar: true,
        deletar: true,
        funcionalidade: { nome: "alunos" }, // relacionamento incluído
      } as any, // <-- ignora o erro de tipo do TS
    ]);

    await authMiddleware(req, res, next);

    // Verifica se o método next foi chamado
    expect(next).toHaveBeenCalled();
  });

  it("deve retornar erro 401 para token ausente", async () => {
    const req = { headers: {} } as any;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as any;

    const next = jest.fn();

    await authMiddleware(req, res, next);

    // Verifica se o status e a mensagem de erro foram retornados corretamente
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      sucesso: false,
      mensagem: "Token de autenticação ausente",
    });
  });
});