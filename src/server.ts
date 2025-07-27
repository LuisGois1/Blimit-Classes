import express from "express";
import helloRoutes from "./routes/hello";

const app = express();
const PORT = 3000;

app.use(express.json());

app.use("/hello", helloRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
