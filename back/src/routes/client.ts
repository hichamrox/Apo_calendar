import { Router, Request, Response } from "express";

import prisma from "@/lib/prisma";
import ClientService from "src/services/client.service";

const router = Router();

const clientService = new ClientService(prisma);

router.post("/", async (req: Request, res: Response) => {
  

  const client = await clientService.createClient({
    name: req.body.name
  });

  res.status(201).json(client);
});

router.get("/", async (req: Request, res: Response) => {
  const cliens = await clientService.getClients();
  res.json(cliens);
});

export default router;
