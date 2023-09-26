import expTable from "./expTable";

export default function calculateLvl(exp: number): number {
    for (let i = expTable.length - 1; i > 1; i--) {
        if (exp >= expTable[i].exp) return i;
    }
    return 1;
}