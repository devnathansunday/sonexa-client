import { prisma } from "@/lib/prisma";

export async function GET(req) {
    const { searchParams } = req.nextUrl;
    const type = searchParams.get('type');
    const limit = Number(searchParams.get('limit')) || 6;
    const offset = Number(searchParams.get('offset')) || 0;

    try {
        const rows = await prisma[type].findMany({
            orderBy: { createdAt:  'desc' },
            take: limit,
            skip: offset,
        });
        return Response.json(rows);
    } catch (error) {
        return new Response(JSON.stringify(error));
    }
}