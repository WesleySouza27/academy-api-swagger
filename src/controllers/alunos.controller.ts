import { Request, Response } from "express";
import { AlunosService } from "../services/alunos.service";
import { onError } from "../utils/on-error";

export class AlunosController {
  public async listar(req: Request, res: Response): Promise<void> {
    try {
      console.log("Chamando método listar no AlunosController"); // Log para depuração

      const { nome } = req.query;

      const service = new AlunosService();
      const resultado = await service.listar({
        nome: nome as string | undefined,
      });

      console.log("Resultado do serviço listar:", resultado); // Log para depuração

      if (!resultado.length) {
        res.status(404).json({
          sucesso: false,
          mensagem: "Nenhum aluno encontrado",
        });
        return;
      }

      res.status(200).json({
        sucesso: true,
        mensagem: "Alunos listados com sucesso",
        dados: resultado,
      });
    } catch (error) {
      onError(error, res);
    }
  }

  public async buscarPorID(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const service = new AlunosService();
      const resultado = await service.buscarPorId(id);

      res.status(200).json({
        sucesso: true,
        mensagem: "Aluno encontrado",
        dados: resultado,
      });
    } catch (error) {
      onError(error, res);
    }
  }

  public async cadastrar(req: Request, res: Response): Promise<void> {
    try {
      const { nome, email, idade, senha, tipo } = req.body;

      const service = new AlunosService();
      const resultado = await service.cadastrar({ nome, email, senha, idade, tipo });

      res.status(201).json({
        sucesso: true,
        mensagem: "Novo aluno cadastrado",
        dados: resultado,
      });
    } catch (error) {
      onError(error, res);
    }
  }

  public async atualizar(req: Request, res: Response): Promise<void> {
    try {
      const { nome, email, idade, senha } = req.body;

      const service = new AlunosService();
      const resultado = await service.atualizar({
        id: req.alunoLogado.id,
        nome,
        email,
        senha,
        idade,
      });

      res.status(200).json({
        sucesso: true,
        mensagem: "Aluno atualizado",
        dados: resultado,
      });
    } catch (error) {
      onError(error, res);
    }
  }

  public async deletar(req: Request, res: Response): Promise<void> {
    try {
      const service = new AlunosService();
      const resultado = await service.excluir(req.alunoLogado.id);

      res.status(200).json({
        sucesso: true,
        mensagem: "Aluno excluído",
        dados: resultado,
      });
    } catch (error) {
      onError(error, res);
    }
  }
}