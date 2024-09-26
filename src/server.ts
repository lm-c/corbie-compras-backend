import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import fs from "fs";
import https from "https";
import { router } from "./routes";

const app = express();

app.use(express.json());
app.use(cors());

app.use(router);

app.get("/", (req: Request, res: Response) => {
  const json = {
    status: "ok",
    message: "Sistema Compras em Produção!",
  };
  res.json(json);
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof Error) {
    return res.status(400).json({
      error: err.message,
    });
  }

  return res.status(500).json({
    status: "Error",
    message: "Internal server error",
  });
});

const port = process.env.PORT || 63021;

if (process.env.NODE_ENV !== "dev") {
  const options = {
    key: fs.readFileSync("/etc/ssl/private/lm/private.key"),
    cert: fs.readFileSync("/etc/ssl/certs/lm/certificate.crt"),
    ca: fs.readFileSync("/etc/ssl/certs/lm/ca-bundle.crt"),
  };

  // Criação do servidor HTTPS
  const httpsServer = https.createServer(options, app);

  httpsServer.listen(port, () => {
    console.log(`Servidor Compras Online, com HTTPS na porta ${port}!`);
  });
} else {
  // Criação do servidor HTTP
  app.listen(port, () => {
    console.log(`Servidor Compras Online, rodando com HTTP na porta ${port}!`);
  });
}
