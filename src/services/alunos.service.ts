import { Aluno } from "@prisma/client";
import { prismaClient } from "../database/prisma.client";
import {
  AtualizarAlunoDto,
  CadastrarAlunoDto,
  ListarAlunosDto,
} from "../dtos/alunos.dto";
import { HTTPError } from "../utils/http.error";
import { Bcrypt } from "../utils/bcrypt";

type AlunoParcial = Omit<Aluno, "senha">;

export class AlunosService {
  public async cadastrar({
    email,
    nome,
    senha,
    idade,
    tipo,
  }: CadastrarAlunoDto): Promise<AlunoParcial> {
    const emailJaCadastrado = await prismaClient.aluno.findUnique({
      where: { email },
    });

    if (emailJaCadastrado) {
      throw new HTTPError(409, "E-mail já cadastrado por outro aluno");
    }

    const bcrypt = new Bcrypt();
    const senhaEncriptografada = await bcrypt.gerarHash(senha);

    const novoAluno = await prismaClient.aluno.create({
      data: {
        nome,
        email,
        senha: senhaEncriptografada,
        idade,
      },
    });

    return {
      id: novoAluno.id,
      nome: novoAluno.nome,
      email: novoAluno.email,
      idade: novoAluno.idade,
      criadoEm: novoAluno.criadoEm,
      atualizado_em: novoAluno.atualizado_em,
    };
  }

  public async listar({ nome }: ListarAlunosDto): Promise<AlunoParcial[]> {
    console.log("Chamando método listar no AlunosService");
    const alunosDB = await prismaClient.aluno.findMany({
      where: {
        nome: {
          contains: nome,
          mode: "insensitive",
        },
      },
      orderBy: {
        nome: "asc",
      },
    });
    console.log("Resultado do findMany:", alunosDB); // Log para depuração

    return alunosDB.map((aluno) => ({
      id: aluno.id,
      nome: aluno.nome,
      email: aluno.email,
      idade: aluno.idade,
      criadoEm: aluno.criadoEm,
      atualizado_em: aluno.atualizado_em,
    }));
  }

  public async buscarPorId(idAluno: string): Promise<AlunoParcial> {
    const aluno = await prismaClient.aluno.findUnique({
      where: { id: idAluno },
    });

    if (!aluno) {
      throw new HTTPError(404, "Aluno não encontrado");
    }

    return {
      id: aluno.id,
      nome: aluno.nome,
      email: aluno.email,
      idade: aluno.idade,
      criadoEm: aluno.criadoEm,
      atualizado_em: aluno.atualizado_em,
    };
  }

  public async atualizar({
    id,
    email,
    idade,
    nome,
    senha,
  }: AtualizarAlunoDto): Promise<AlunoParcial> {
    await this.buscarPorId(id);

    const alunoAtualizado = await prismaClient.aluno.update({
      where: { id },
      data: {
        email,
        idade,
        nome,
        senha,
      },
    });

    return {
      id: alunoAtualizado.id,
      nome: alunoAtualizado.nome,
      email: alunoAtualizado.email,
      idade: alunoAtualizado.idade,
      criadoEm: alunoAtualizado.criadoEm,
      atualizado_em: alunoAtualizado.atualizado_em,
    };
  }

  public async excluir(idAluno: string): Promise<AlunoParcial> {
    await this.buscarPorId(idAluno);

    const alunoExcluido = await prismaClient.aluno.delete({
      where: { id: idAluno },
    });

    return {
      id: alunoExcluido.id,
      nome: alunoExcluido.nome,
      email: alunoExcluido.email,
      idade: alunoExcluido.idade,
      criadoEm: alunoExcluido.criadoEm,
      atualizado_em: alunoExcluido.atualizado_em,
    };
  }
}