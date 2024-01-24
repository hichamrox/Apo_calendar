import type { Staff, PrismaClient } from "@prisma/client";

export default class StaffService {
    constructor(private prisma: PrismaClient) {}
    
    async getStaffs() {
        const staffs = await this.prisma.staff.findMany();
        return staffs;
    }

    async createStaff(staffData: Omit<Staff, "id">) {
        const staff = await this.prisma.staff.create({
            data: staffData,
        });

        return staff;
    }

    async getStaffById(staffId: string) {
        const staff = await this.prisma.staff.findUnique({
            where: { id: staffId },
        });

        return staff;
    }

    async deleteStaff(staffId: string) {
        const stuffCount = await this.prisma.staff.count({
            where: { id: staffId },
        });

        if (stuffCount === 0) {
            return null;
        } else {
            const staff = await this.prisma.staff.delete({
                where: { id: staffId },
            });
            return staff;
        }
    }
}