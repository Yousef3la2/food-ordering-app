import { cache } from "@/lib/cache";
import { db } from "@/lib/prisma";

export const getBestSellers = cache(
  async (limit?: number) => {
    const bestSellers = await db.product.findMany({
      where: {
        orders: {
          some: {},
        },
      },
      orderBy: {
        orders: {
          _count: 'desc', 
        },
      },
      include: {
        Size: true,
        extras: true,
        Dough: true,   
        orders: true,  
      },
      take: limit,
    });
    return bestSellers;
  },
  ["best-sellers"],
  { revalidate: 3600 }
);

      