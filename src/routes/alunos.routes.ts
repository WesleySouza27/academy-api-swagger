import { Router } from "express";
import { AlunosController } from "../controllers/alunos.controller";
import { EnderecosController } from "../controllers/enderecos.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { validateUidFormatMiddleware } from "../middlewares/validate-uid-format.middleware";

export class AlunosRoutes {
  public static bind(): Router {
    const router = Router();

    const controller = new AlunosController();
    const controllerEnderecos = new EnderecosController();

    /**
    * @swagger
    * /alunos:
    *   get:
    *     summary: Lista todos os alunos
    *     responses:
    *       200:
    *         description: Lista de alunos retornada com sucesso.
    *         content:
    *           application/json:
    *             schema:
    *               type: array
    *               items:
    *                 type: object
    *                 properties:
    *                   id:
    *                     type: string
    *                     example: "123e4567-e89b-12d3-a456-426614174000"
    *                   nome:
    *                     type: string
    *                     example: "João Silva"
    */
    router.get("/alunos", controller.listar); // listando todos os alunos

    /**
    * @swagger
    * /alunos/{id}:
    *   get:
    *     summary: Busca um aluno pelo ID
    *     parameters:
    *       - in: path
    *         name: id
    *         required: true
    *         schema:
    *           type: string
    *         description: ID do aluno
    *     responses:
    *       200:
    *         description: Aluno encontrado.
    */
    router.get(
      "/alunos/:id",
      [validateUidFormatMiddleware],
      controller.buscarPorID
    ); // buscar um aluno por ID

    /**
    * @swagger
    * /alunos:
    *   post:
    *     summary: Cadastra um novo aluno
    *     requestBody:
    *       required: true
    *       content:
    *         application/json:
    *           schema:
    *             type: object
    *             properties:
    *               nome:
    *                 type: string
    *                 example: "João Silva"
    *               email:
    *                 type: string
    *                 example: "joao@email.com"
    *               senha:
    *                 type: string
    *                 example: "senha123"
    *               idade:
    *                 type: integer
    *                 example: 25
    *               tipo:
    *                 type: string
    *                 example: "estudante"
    *     responses:
    *       201:
    *         description: Novo aluno cadastrado com sucesso.
    */
    router.post("/alunos", controller.cadastrar); // cadastrando um aluno

    // Rotas privadas - é preciso estar logado
    /**
    * @swagger
    * /alunos:
    *   put:
    *     summary: Atualiza os dados de um aluno
    *     requestBody:
    *       required: true
    *       content:
    *         application/json:
    *           schema:
    *             type: object
    *             properties:
    *               nome:
    *                 type: string
    *                 example: "João Silva"
    *               email:
    *                 type: string
    *                 example: "joao@email.com"
    *               senha:
    *                 type: string
    *                 example: "novaSenha123"
    *               idade:
    *                 type: integer
    *                 example: 26
    *     responses:
    *       200:
    *         description: Aluno atualizado com sucesso.
    */
    router.put("/alunos", [authMiddleware], controller.atualizar); // atualizar um aluno

    /**
    * @swagger
    * /alunos:
    *   delete:
    *     summary: Exclui um aluno
    *     responses:
    *       200:
    *         description: Aluno excluído com sucesso.
    */
    router.delete("/alunos", [authMiddleware], controller.deletar); // excluir um aluno

    /**
    * @swagger
    * /alunos/enderecos:
    *   post:
    *     summary: Cadastra um endereço para o aluno logado
    *     security:
    *       - bearerAuth: []
    *     requestBody:
    *       required: true
    *       content:
    *         application/json:
    *           schema:
    *             type: object
    *             properties:
    *               rua:
    *                 type: string
    *                 example: "Rua das Flores"
    *               numero:
    *                 type: string
    *                 example: "123"
    *               cidade:
    *                 type: string
    *                 example: "São Paulo"
    *               estado:
    *                 type: string
    *                 example: "SP"
    *               cep:
    *                 type: string
    *                 example: "12345-678"
    *     responses:
    *       201:
    *         description: Endereço cadastrado com sucesso.
    *       401:
    *         description: Não autorizado. Token inválido ou ausente.
    */
    router.post(
      "/alunos/enderecos",
      [authMiddleware],
      controllerEnderecos.cadastrar
    );

    /**
    * @swagger
    * /alunos/enderecos:
    *   put:
    *     summary: Atualiza o endereço do aluno logado
    *     security:
    *       - bearerAuth: []
    *     requestBody:
    *       required: true
    *       content:
    *         application/json:
    *           schema:
    *             type: object
    *             properties:
    *               rua:
    *                 type: string
    *                 example: "Rua das Palmeiras"
    *               numero:
    *                 type: string
    *                 example: "456"
    *               cidade:
    *                 type: string
    *                 example: "Rio de Janeiro"
    *               estado:
    *                 type: string
    *                 example: "RJ"
    *               cep:
    *                 type: string
    *                 example: "98765-432"
    *     responses:
    *       200:
    *         description: Endereço atualizado com sucesso.
    *       401:
    *         description: Não autorizado. Token inválido ou ausente.
    */
    router.put(
      "/alunos/enderecos",
      [authMiddleware],
      controllerEnderecos.atualizar
    );

    return router;
  }
}