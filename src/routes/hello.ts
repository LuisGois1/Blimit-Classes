import { Request, Response, Router } from "express";

const helloRoutes = Router()

helloRoutes.get("/", (req: Request, res: Response) =>{
  res.send("Hello World")
})

export default helloRoutes