import { prisma } from "../lib/prisma.js";

export const createProduct = async (req, res) => {
  try {
    const { name, description, price, stock } = req.body;

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price: Number(price),
        stock: stock !== undefined ? Number(stock) : undefined,
      },
    });

    return res.json(product);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Помилка створення Продукту" });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, stock } = req.body;

    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (description !== undefined) updateData.description = description;
    if (price !== undefined) updateData.price = Number(price);
    if (stock !== undefined) updateData.stock = Number(stock);

    const product = await prisma.product.update({
      where: { id: Number(id) },
      data: updateData,
    });

    return res.json(product);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Помилка оновлення Продукту" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.product.delete({ where: { id: Number(id) } });
    return res.json({ success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Помилка видалення Продукту" });
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      include: {
        categories: {
          include: {
            category: true,
          },
        },
      },
    });
    return res.json({ data: products });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Помилка отримання Продуктів" });
  }
};

export const getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await prisma.product.findUnique({
      where: { id: Number(id) },
      include: {
        categories: {
          include: {
            category: true,
          },
        },
      },
    });

    if (!product) {
      return res.status(404).json({ error: "Продукт не знайдено" });
    }

    return res.json({ data: product });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Помилка отримання Продукту" });
  }
};

export const getProductReviews = async (req, res) => {
  try {
    const { id } = req.params;

    const productExists = await prisma.product.findUnique({
      where: { id: Number(id) },
    });

    if (!productExists) {
      return res.status(404).json({ error: "Продукт не знайдено" });
    }

    const reviews = await prisma.review.findMany({
      where: { productId: Number(id) },
      include: {
        user: {
          select: { name: true },
        },
      },
    });

    return res.json({ data: reviews });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Помилка отримання Відгуків до продукту" });
  }
};
