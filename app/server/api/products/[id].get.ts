import { fetchProductById } from "~/server/utils/Fakestoreclient";

// GET /api/products/:id
export default defineEventHandler(async (event) => {
  const idParam = getRouterParam(event, "id");
  const id = Number(idParam);

  if (!idParam || Number.isNaN(id)) {
    throw createError({
      statusCode: 400,
      statusMessage: "Product id must be a number",
    });
  }

  try {
    return await fetchProductById(id);
  } catch (error) {
    throw createError({
      statusCode: 404,
      statusMessage: `Product ${id} not found`,
    });
  }
});
