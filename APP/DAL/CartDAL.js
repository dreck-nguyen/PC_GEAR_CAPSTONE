import { Cart, SequelizeInstance } from '../utility/DbHelper.js';

export async function getCartUser(userId) {
  const sqlQuery = `
  select 
  c.*,
  array_agg(
  jsonb_build_object(
  'cart_item_id', ci.cart_item_id
  , 'product_id', ci.product_id
  , 'quantity' , ci.quantity
  , 'unit_price', ci.unit_price
  , 'created_at', ci.created_at
  )
) as product_list,
  sum(ci.quantity) as product_total
from 
  cart c 
left join 
  cart_item ci 
  on 1=1
  and c.cart_id = ci.cart_id
where 1=1 
  and c.user_id ='${userId}'
group by c.cart_id
`;

  const userCart = await SequelizeInstance.query(sqlQuery, {
    type: SequelizeInstance.QueryTypes.SELECT,
    raw: true,
  });

  return userCart;
}
export async function createCart(cartObject) {
  const user = await Cart.create({
    cart_id: cartObject.cart_id,
    user_id: cartObject.user_id,
    status: cartObject.status || '',
  });
  return user;
}
export async function getUsersCart() {
  const cart = await Cart.findAll();
  return cart;
}
