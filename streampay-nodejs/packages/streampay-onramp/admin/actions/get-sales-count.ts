import prismadb from "@/lib/prismadb";

export const getSalesCount = async (storeId: string) => {
  // Use prismadb's order.count() method to count the number of orders.
  // The 'where' parameter filters the orders by storeId and isPaid status.
  const salesCount = await prismadb.order.count({
    where: {
      storeId,
      isPaid: true
    },
  });

  return salesCount; // Return the calculated sales count.
};
