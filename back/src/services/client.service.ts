import type { Client, PrismaClient } from "@prisma/client";

export default class ClientService {
    constructor(private prisma: PrismaClient) {}
    
    async getClients() {
        const clients = await this.prisma.client.findMany();
        return clients;
    }

    async createClient(clientData: Omit<Client, "id">) {
        const client = await this.prisma.client.create({
            data: clientData,
        });

        return client;
    }
}