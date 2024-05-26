import * as orderStatusDAL from '../DAL/OrderStatusDAL.js';
export async function getOrderStatus() {
  const result = await orderStatusDAL.getOrderStatus();
  return result;
}
export async function getDashboard() {
  const result = await orderStatusDAL.getDashboard();
  const chart = await orderStatusDAL.generateChart();

  const total = chart.reduce((acc, curr) => {
    acc += Number(curr.monthly_total);
    return acc;
  }, 0);

  return { result, chart, total };
}

export async function getOrderStatusByStatusId(userId, orderStatusId) {
  const result = await orderStatusDAL.getOrderStatusByStatusId(
    userId,
    orderStatusId,
  );
  return result;
}

export async function createOrderDetailRating(
  userId,
  orderDetailId,
  rating,
  review,
) {
  const [result] = await orderStatusDAL.createOrderDetailRating(
    userId,
    orderDetailId,
    rating,
    review,
  );
  return result;
}
