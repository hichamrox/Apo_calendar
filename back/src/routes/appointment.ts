import { Router, Request, Response } from "express";

import prisma from "@/lib/prisma";
import AppointmentService from "src/services/appointment.service";

const router = Router();

const appointmentService = new AppointmentService(prisma);

router.post("/", async (req: Request, res: Response) => {
  const appointment = await appointmentService.createAppointment({
    title: req.body.title,
    description: req.body.description,
    clientId: req.body.clientId,
    staffId: req.body.staffId,
    startDate: new Date(req.body.startDate),
    endDate: new Date(req.body.endDate),
  });

  res.status(201).json(appointment);
});

router.get("/", async (req: Request, res: Response) => {
  const appointments = await appointmentService.getAppointments();
  res.json(appointments);
});

router.put("/:id", async (req: Request, res: Response) => {
  const appointmentId = (req.params.id);
  const appointmentData = {
    title: req.body.title,
    startDate: new Date(req.body.startDate),
    endDate: new Date(req.body.endDate),
  };



  const appointment = await appointmentService.updateAppointment({
    id: appointmentId,
    ...appointmentData,
  });

  res.json(appointment);
})

router.delete("/:id", async (req: Request, res: Response) => {
  const appointmentId = (req.params.id);

  const appointment = await appointmentService.deleteAppointment(appointmentId);

  res.json(appointment);
})

export default router;
