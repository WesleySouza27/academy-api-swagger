import { Response } from "express";
import { HTTPError } from "./http.error";
import { JsonWebTokenError } from "jsonwebtoken";

export function onError(error: unknown, res: Response): void {
  console.error("Erro capturado no middleware:", error); // Log detalhado do erro

  if (error instanceof HTTPError) {
    res.status(error.statusCode).json({
      sucesso: false,
      mensagem: error.message,
    });
    return;
  }

  if (error instanceof JsonWebTokenError) {
    res.status(401).json({
      sucesso: false,
      mensagem: "Token de autenticação inválido",
      detalhe: error.message,
    });
    return;
  }

  res.status(500).json({
    sucesso: false,
    mensagem: "Ocorreu um erro inesperado.",
    detalhe: (error as Error).message,
  });
}