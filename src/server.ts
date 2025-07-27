import express, { Request, Response } from 'express';

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/hello", (req: Request, res: Response) => {
  return res.send("Hello World")
})

app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
});