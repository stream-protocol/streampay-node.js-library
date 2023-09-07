import prismadb from "@/lib/prismadb";

export const getStockCount = async (storeId: string) => {
  // Use prismadb's product.count() method to count the number of products.
  // The 'where' parameter filters the products by storeId and isArchived status.
  const stockCount = await prismadb.product.count({
    where: {
      storeId,
      isArchived: false,
    }
  });

  return stockCount; // Return the calculated stock count.
};
