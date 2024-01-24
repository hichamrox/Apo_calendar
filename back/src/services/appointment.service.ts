import type { Appointment, PrismaClient } from "@prisma/client";

export default class AppointmentService {

  constructor(private prisma: PrismaClient) {}
    

  async getAppointments() {
    const appointments = await this.prisma.appointment.findMany({
      include: {
        staff: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
        client: {
          select: {
            name: true,
          },
        },
      },
    });
    return appointments;
  }

  async updateAppointment(appointmentData: Pick<Appointment, "id" | "title" | "startDate" | "endDate">) {
    const appointmentId = appointmentData.id;
    const appointment = await this.prisma.appointment.update({
      where: { id: appointmentId },
      data: appointmentData,
      include: {
        staff: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
        client: {
          select: {
            name: true,
          },
        },
      },
    });

    return appointment;
  }

  async deleteAppointment(appointmentId: string) {
    const appointment = await this.prisma.appointment.delete({
      where: { id: appointmentId },
    });

    return appointment;
  }

  async createAppointment(appointmentData: Omit<Appointment, "id">) {
    const appointment = await this.prisma.appointment.create({
      data: appointmentData,
      include: {
        staff: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
        client: {
          select: {
            name: true,
          },
        },
      },
    });

    return appointment;
  }
}