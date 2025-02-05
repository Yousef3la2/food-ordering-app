import MainHeading from "@/components/main-heading";
import Menu from "@/components/menu";
import { getBestSellers } from "@/server/db/products";

async function BestSellers() {
  const bestSellers = await getBestSellers(3);
  console.log(bestSellers);
  return (
    <section>
      <div className="container">
        <div className="text-center mb-4">
          <MainHeading subTitle={"checkOut"} title={"Our Best Sellers"} />
        </div>
        {bestSellers && bestSellers.length > 0 ? (
          <Menu items={bestSellers} />
        ) : (
          <p className="text-accent text-center">No products found.</p>
        )}
      </div>
    </section>
  );
}

export default BestSellers;
