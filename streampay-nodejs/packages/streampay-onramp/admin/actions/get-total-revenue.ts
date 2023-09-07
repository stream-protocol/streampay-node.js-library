import prismadb from "@/lib/prismadb";

export const getTotalRevenue = async (storeId: string) => {
  // Use prismadb's order.findMany() method to retrieve paid orders for the store.
  // The 'where' parameter filters the orders by storeId and isPaid status.
  // The 'include' parameter fetches associated orderItems and their related products.
  const paidOrders = await prismadb.order.findMany({
    where: {
      storeId,
      isPaid: true
    },
    include: {
      orderItems: {
        include: {
          product: true
        }
      }
    }
  });

  // Calculate the total revenue by summing up the prices of products in each order.
  const totalRevenue = paidOrders.reduce((total, order) => {
    const orderTotal = order.orderItems.reduce((orderSum, item) => {
      return orderSum + item.product.price.toNumber(); // Convert price to a number.
    }, 0);
    return total + orderTotal;
  }, 0);

  return totalRevenue; // Return the calculated total revenue.
};
