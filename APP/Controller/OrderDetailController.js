import * as orderDetailService from '../Service/OrderDetailService.js';
export async function getOrderDetailByOrderDetailId(req, res, next) {
  try {
    const orderDetailId = req.params.orderDetailId;
    const result = await orderDetailService.getOrderDetailByOrderDetailId(
      orderDetailId,
    );
    res.send(result);
  } catch (e) {
    console.log(e);
    res.send(e);
  }
}
