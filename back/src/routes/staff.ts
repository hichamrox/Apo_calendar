import { Router, Request, Response } from "express";
import prisma from "@/lib/prisma";
import StaffService from "src/services/staff.service";

const router = Router();

const staffService = new StaffService(prisma);

router.post("/", async (req: Request, res: Response) => {
  const staffData = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  };

  const staff = await staffService.createStaff(staffData);
  res.status(201).json(staff);
});

router.get("/", async (req: Request, res: Response) => {
  const staffs = await staffService.getStaffs()
  res.json(staffs);
});

router.get("/:id", async (req: Request, res: Response) => {
  const i = req.params.id;
  const staff = await staffService.getStaffById(i);

  res.json(staff);
});

router.delete("/:id", async (req: Request, res: Response) => {
  const i = req.params.id;

  const staff = await staffService.deleteStaff(i);

  if(staff) {
    return res.status(200).end()
  } else {
    return res.status(404).end();
  }
  
});

export default router;
