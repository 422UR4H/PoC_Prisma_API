import prisma from "@/database/db.connection";
import expTable from "@/utils/expTable";

async function main() {
    return prisma.exp.createMany({
        data: expTable
    });
}

main()
    .catch(async (e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });