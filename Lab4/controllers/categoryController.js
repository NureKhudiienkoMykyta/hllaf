import { prisma } from "../lib/prisma.js";

export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    const category = await prisma.category.create({
      data: {
        name,
      },
    });

    return res.json(category);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Помилка створення Категорії" });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const category = await prisma.category.update({
      where: { id: Number(id) },
      data: {
        name,
      },
    });

    return res.json(category);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Помилка оновлення Категорії" });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.category.delete({ where: { id: Number(id) } });
    return res.json({ success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Помилка видалення Категорії" });
  }
};

export const getCategories = async (req, res) => {
  try {
    const categories = await prisma.category.findMany();
    return res.json({ data: categories });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Помилка отримання Категорій" });
  }
};
