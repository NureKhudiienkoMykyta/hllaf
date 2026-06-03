import { prisma } from "../lib/prisma.js";

export const createProductCategory = async (req, res) => {
  try {
    const { productId, categoryId } = req.body;
    const productCategory = await prisma.productCategory.create({
      data: {
        productId: Number(productId),
        categoryId: Number(categoryId),
      },
    });
    return res.json(productCategory);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Помилка створення Категорії продукту" });
  }
};

export const deleteProductCategory = async (req, res) => {
  try {
    const { productId, categoryId } = req.params;
    await prisma.productCategory.delete({
      where: {
        productId_categoryId: {
          productId: Number(productId),
          categoryId: Number(categoryId),
        },
      },
    });
    return res.json({ success: true });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Помилка видалення Категорії продукту" });
  }
};
