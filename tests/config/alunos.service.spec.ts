import { AlunosService } from "../../src/services/alunos.service";
import { prismaMock } from "../config/prisma.mock";

describe("AlunosService", () => {
  const service = new AlunosService();

  it("deve cadastrar um novo aluno com sucesso", async () => {
    prismaMock.aluno.create.mockResolvedValue({
      id: "1",
      nome: "João Silva",
      email: "joao@email.com",
      idade: 25,
      senha: "senha123",
      criadoEm: new Date(),
      atualizado_em: new Date(),
    });

    const resultado = await service.cadastrar({
      nome: "João Silva",
      email: "joao@email.com",
      senha: "senha123",
      idade: 25,
      tipo: "T",
    });

    expect(resultado).toEqual({
      id: "1",
      nome: "João Silva",
      email: "joao@email.com",
      idade: 25,
      criadoEm: expect.any(Date),
      atualizado_em: expect.any(Date),
    });
  });

  it("deve lançar erro ao cadastrar aluno com e-mail duplicado", async () => {
    prismaMock.aluno.findUnique.mockResolvedValue({
      id: "1",
      nome: "João Silva",
      email: "joao@email.com",
      idade: 25,
      senha: "senha123",
      criadoEm: new Date(),
      atualizado_em: new Date(),
    });

    await expect(
      service.cadastrar({
        nome: "João Silva",
        email: "joao@email.com",
        senha: "senha123",
        idade: 25,
        tipo: 'T',
      })
    ).rejects.toThrow("E-mail já cadastrado por outro aluno");
  });
});