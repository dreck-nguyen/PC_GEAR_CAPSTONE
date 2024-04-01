import * as orderStatusDAL from '../DAL/OrderStatusDAL.js';
export async function getOrderStatus() {
  const result = await orderStatusDAL.getOrderStatus();
  return result;
}
export async function getDashboard() {
  const result = await orderStatusDAL.getDashboard();
  const chart = await orderStatusDAL.generateChart();

  const chartMapped = chart.map(({ month, monthly_total }) => ({
    month,
    monthly_total,
  }));

  const total = chart[0]?.total || 0;

  return { result, chart: chartMapped, total };
}

export async function getOrderStatusByStatusId(userId, orderStatusId) {
  const result = await orderStatusDAL.getOrderStatusByStatusId(
    userId,
    orderStatusId,
  );
  return result;
}
