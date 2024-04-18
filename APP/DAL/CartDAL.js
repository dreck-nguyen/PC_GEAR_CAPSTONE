import { Cart, SequelizeInstance } from '../utility/DbHelper.js';

export async function getCartUser(userId) {
  const sqlQuery = `
 select
  c.*,
  ci.*,
  p.product_brand_id,
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
  on
	1 = 1
	and c.cart_id = ci.cart_id
left join 
product p
  on
	1 = 1
	and ci.product_id = p.product_id
inner join 
  (
	select
		product_id 
    ,
		ARRAY_AGG(image) as images
	from
		product_gallery
	group by
		product_id) pg
  on
	1 = 1
	and pg.product_id = p.product_id
left join
  (select
	upb.user_pc_build_id,
	upb.user_id,
	upb.profile_name,
	upb.motherboard_id,
	to_json(ms.*) as motherboard_specification,
	upb.processor_id,
	to_json(ps.*) as processor_specification,
	upb.case_id,
	to_json(cs.*) as case_specification,
	upb.gpu_id,
	to_json(gs.*) as gpu_specification,
	upb.ram_id,
	to_json(rs.*) as ram_specification,
	upb.storage_id,
	to_json(ss.*) as storage_specification,
	upb.case_cooler_id,
	to_json(case_cooler.*) as case_cooler,
	upb.monitor_id,
	to_json(monitor.*) as monitor,
	upb.cpu_cooler_id,
	to_json(cpu_cooler.*) as cpu_cooler,
	upb.psu_id,
	to_json(psu.*) as psu,
	upb.ram_quantity,
	upb.storage_quantity
from
	public.user_pc_build upb
left join (
	select
		p.product_id as primary_product_id,
		p."name",
		p.description,
		p.unit_price,
		TO_CHAR(p.unit_price,
		'FM999,999,999') as price,
		p.discount,
		p.sold,
		c."name" as category_name,
		pb.product_brand_name as brand_name,
		ARRAY_AGG(pg.image) as image_links
	from
		product p
	left outer join category c on
		c.category_id = p.category_id
	left outer join product_brand pb on
		pb.product_brand_id = p.product_brand_id
	inner join product_gallery pg on
		pg.product_id = p.product_id
	group by
		p.product_id,
		c.category_id,
		pb.product_brand_id
  ) psu
on
	1 = 1
	and psu.primary_product_id = upb.psu_id
left join (
	select
		p.product_id as primary_product_id,
		p."name",
		p.description,
		p.unit_price,
		TO_CHAR(p.unit_price,
		'FM999,999,999') as price,
		p.discount,
		p.sold,
		c."name" as category_name,
		pb.product_brand_name as brand_name,
		ARRAY_AGG(pg.image) as image_links
	from
		product p
	left outer join category c on
		c.category_id = p.category_id
	left outer join product_brand pb on
		pb.product_brand_id = p.product_brand_id
	inner join product_gallery pg on
		pg.product_id = p.product_id
	group by
		p.product_id,
		c.category_id,
		pb.product_brand_id
  ) case_cooler
on
	1 = 1
	and case_cooler.primary_product_id = upb.case_cooler_id
left join (
	select
		p.product_id as primary_product_id,
		p."name",
		p.description,
		p.unit_price,
		TO_CHAR(p.unit_price,
		'FM999,999,999') as price,
		p.discount,
		p.sold,
		c."name" as category_name,
		pb.product_brand_name as brand_name,
		ARRAY_AGG(pg.image) as image_links
	from
		product p
	left outer join category c on
		c.category_id = p.category_id
	left outer join product_brand pb on
		pb.product_brand_id = p.product_brand_id
	inner join product_gallery pg on
		pg.product_id = p.product_id
	group by
		p.product_id,
		c.category_id,
		pb.product_brand_id
  ) monitor
on
	1 = 1
	and monitor.primary_product_id = upb.monitor_id
left join (
	select
		p.product_id as primary_product_id,
		p."name",
		p.description,
		p.unit_price,
		TO_CHAR(p.unit_price,
		'FM999,999,999') as price,
		p.discount,
		p.sold,
		c."name" as category_name,
		pb.product_brand_name as brand_name,
		ARRAY_AGG(pg.image) as image_links
	from
		product p
	left outer join category c on
		c.category_id = p.category_id
	left outer join product_brand pb on
		pb.product_brand_id = p.product_brand_id
	inner join product_gallery pg on
		pg.product_id = p.product_id
	group by
		p.product_id,
		c.category_id,
		pb.product_brand_id
  ) cpu_cooler
on
	1 = 1
	and cpu_cooler.primary_product_id = upb.cpu_cooler_id
left join 
(
	select
		p.product_id as primary_product_id,
		p."name",
		p.unit_price,
		TO_CHAR(p.unit_price,
		'FM999,999,999') as price,
		p.discount,
		ARRAY_AGG(pg.image) as image_links
	from
		product p
	left outer join category c on
		c.category_id = p.category_id
	left outer join product_brand pb on
		pb.product_brand_id = p.product_brand_id
	inner join product_gallery pg on
		pg.product_id = p.product_id
	inner join motherboard_specification ms on
		p.product_id = ms.product_id
	group by
		p.product_id,
		c.category_id,
		pb.product_brand_id,
		ms.product_id,
		ms.specification_id
)ms 
on
	upb.motherboard_id = ms.primary_product_id
left join 
(
	select
		p.product_id as primary_product_id,
		p."name",
		p.unit_price,
		TO_CHAR(p.unit_price,
		'FM999,999,999') as price,
		p.discount,
		ARRAY_AGG(pg.image) as image_links
	from
		product p
	left outer join category c on
		c.category_id = p.category_id
	left outer join product_brand pb on
		pb.product_brand_id = p.product_brand_id
	inner join product_gallery pg on
		pg.product_id = p.product_id
	inner join processor_specification ps on
		p.product_id = ps.product_id
	group by
		p.product_id,
		c.category_id,
		pb.product_brand_id,
		ps.product_id,
		ps.specification_id
) ps 
on
	upb.processor_id = ps.primary_product_id
left join 
(
	select
		p.product_id as primary_product_id,
		p."name",
		p.unit_price,
		TO_CHAR(p.unit_price,
		'FM999,999,999') as price,
		p.discount,
		ARRAY_AGG(pg.image) as image_links
	from
		product p
	left outer join category c on
		c.category_id = p.category_id
	left outer join product_brand pb on
		pb.product_brand_id = p.product_brand_id
	inner join product_gallery pg on
		pg.product_id = p.product_id
	inner join case_specification cs on
		p.product_id = cs.product_id
	group by
		p.product_id,
		c.category_id,
		pb.product_brand_id,
		cs.product_id,
		cs.specification_id
) cs 
on
	upb.case_id = cs.primary_product_id
left join 
(
	select
		p.product_id as primary_product_id,
		p."name",
		p.unit_price,
		TO_CHAR(p.unit_price,
		'FM999,999,999') as price,
		p.discount,
		ARRAY_AGG(pg.image) as image_links
	from
		product p
	left outer join category c on
		c.category_id = p.category_id
	left outer join product_brand pb on
		pb.product_brand_id = p.product_brand_id
	inner join product_gallery pg on
		pg.product_id = p.product_id
	inner join graphics_specification gs on
		p.product_id = gs.product_id
	group by
		p.product_id,
		c.category_id,
		pb.product_brand_id,
		gs.product_id,
		gs.specification_id
) gs 
on
	upb.gpu_id = gs.primary_product_id
left join 
(
	select
		p.product_id as primary_product_id,
		p."name",
		p.unit_price,
		TO_CHAR(p.unit_price,
		'FM999,999,999') as price,
		p.discount,
		ARRAY_AGG(pg.image) as image_links
	from
		product p
	left outer join category c on
		c.category_id = p.category_id
	left outer join product_brand pb on
		pb.product_brand_id = p.product_brand_id
	inner join product_gallery pg on
		pg.product_id = p.product_id
	inner join ram_specification rs on
		p.product_id = rs.product_id
	group by
		p.product_id,
		c.category_id,
		pb.product_brand_id,
		rs.product_id,
		rs.specification_id
) rs 
on
	upb.ram_id = rs.primary_product_id
left join 
(
	select
		p.product_id as primary_product_id,
		p."name",
		p.unit_price,
		TO_CHAR(p.unit_price,
		'FM999,999,999') as price,
		p.discount,
		ARRAY_AGG(pg.image) as image_links
	from
		product p
	left outer join category c on
		c.category_id = p.category_id
	left outer join product_brand pb on
		pb.product_brand_id = p.product_brand_id
	inner join product_gallery pg on
		pg.product_id = p.product_id
	inner join storage_specification ss on
		p.product_id = ss.product_id
	group by
		p.product_id,
		c.category_id,
		pb.product_brand_id,
		ss.product_id,
		ss.specification_id
) ss 
on
	upb.storage_id = ss.primary_product_id
group by
	upb.user_pc_build_id,
	ms.*,
	ps.*,
	cs.*,
	gs.*,
	rs.*,
	ss.*,
	case_cooler.*,
	monitor.*,
	cpu_cooler.*,
	psu.*
  ) upb 
  on
	1 = 1
	and upb.user_pc_build_id = ci.personal_build_pc_id
where
	1 = 1
	and c.user_id = '${userId}'
group by
	c.cart_id,
	ci.personal_build_pc_id,
	upb.*,
	ci.*,
	ci.cart_item_id,
	p.name,
	p.unit_price,
	pg.images,
	p.product_brand_id
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
