import { ProductBrand } from '../utility/DbHelper.js';

export async function getAllBrand() {
  const result = await ProductBrand.findAll();
  return result;
}

export async function getBrand(productBrandId) {
  const result = await ProductBrand.findOne({
    where: {
      product_brand_id: productBrandId,
    },
  });
  return result;
}

export async function createBrand(productBrand) {
  const result = await ProductBrand.create({
    product_brand_id: productBrand.product_brand_id,
    product_brand_name: productBrand.product_brand_name,
  });
  return result;
}
export async function updateBrand(brandId, productBrand) {
  const result = await ProductBrand.update(productBrand, {
    where: {
      product_brand_id: brandId,
    },
    returning: true,
  });
  return result;
}
export async function deleteBrand(productBrandId) {
  await ProductBrand.destroy({
    where: {
      product_brand_id: productBrandId,
    },
  });
}
