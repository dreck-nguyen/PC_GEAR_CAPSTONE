import { Cart, SequelizeInstance } from '../utility/DbHelper.js';

export async function getCartUser(userId) {
  const sqlQuery = `
 select 
  c.*,
   ARRAY_AGG(
    JSONB_BUILD_OBJECT(
      'cart_item_id', ci.cart_item_id,
      'product_id', ci.product_id,
      'product_name', p.name,
      'quantity', ci.quantity,
      'unit_price', TO_CHAR(p.unit_price, 'FM999,999,999'),
      'created_at', ci.created_at,
      'images', pg.images
    )
  ) AS product_list,
  sum(ci.quantity) as product_total,
  ci.personal_build_pc_id,
  to_json(upb.*) as build_pc_details 
from 
  cart c 
left join 
  cart_item ci 
  on 1=1
  and c.cart_id = ci.cart_id
left join 
product p
  on 1=1
  and ci.product_id = p.product_id
left join 
  (select 
    product_id 
    , ARRAY_AGG(image) as images 
    from 
      product_gallery
    group by 
      product_id) pg
  on 1=1 
  and pg.product_id = p.product_id
left join
  user_pc_build upb 
  on 1=1 
  and upb.user_pc_build_id  = ci.personal_build_pc_id 
where 1=1 
and c.user_id ='${userId}'
group by 
  c.cart_id,ci.personal_build_pc_id,upb.*
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
export async function addBuildPcComponentToCart(
  cartItemId,
  cartId,
  productId,
  quantity,
  createdAt,
  isBuildPc,
) {
  const sqlQuery = `
      INSERT INTO public.cart_item (
        cart_item_id,
        cart_id,
        product_id,
        quantity,
        created_at,
        is_build_pc
      ) 
      VALUES (?, ?, ?, ?, ?, ?)
    `;

  const result = await SequelizeInstance.query(sqlQuery, {
    replacements: [
      cartItemId,
      cartId,
      productId,
      quantity,
      createdAt,
      isBuildPc,
    ],
    type: SequelizeInstance.QueryTypes.INSERT,
  });

  console.log('Build PC component added to cart successfully');
}
