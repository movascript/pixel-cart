import { fetchAllCategories } from "~/server/utils/Fakestoreclient";

/**
 * GET /api/products/categories
 *
 * NOTE: Nitro resolves static route segments before dynamic ones,
 * so this takes priority over [id].get.ts for the exact path
 * "/api/products/categories" — no collision with the :id route.
 */
export default defineEventHandler(async () => {
  try {
    return await fetchAllCategories();
  } catch (error) {
    throw createError({
      statusCode: 502,
      statusMessage: "Failed to fetch categories from upstream API",
    });
  }
});
