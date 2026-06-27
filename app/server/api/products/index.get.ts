import { fetchAllProducts } from "~/server/utils/Fakestoreclient";
import { applyProductFilters } from "~/server/utils/Productfilters";

/**
 * GET /api/products
 * GET /api/products?search=shirt
 * GET /api/products?categories=electronics,jewelery
 * GET /api/products?sortBy=price-asc
 *
 * Fake Store API didnt provide enough filter options
 * so i make a wrapper backend for my frontend
 */
export default defineEventHandler(async (event) => {
  const query = getQuery<ProductQuery>(event);

  try {
    const allProducts = await fetchAllProducts();
    return applyProductFilters(allProducts, query);
  } catch (error) {
    throw createError({
      statusCode: 502,
      statusMessage: "Failed to fetch products from upstream API",
    });
  }
});
