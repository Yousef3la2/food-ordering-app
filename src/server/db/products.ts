import { cache } from "@/lib/cache";
import { db } from "@/lib/prisma";
export const getProductsByCategory = cache(
  () => {
    const products = db.category.findMany({
      include: {
        products: {
          include: {
            Size: true,
            extras: true,
            Dough: true,   
            orders: true, 
          },
        },
      },
    });
    return products;
  },
  ["products-by-category"],
  { revalidate: 3600 }
);

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

      