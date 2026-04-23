import { prisma } from "../lib/prisma.js";

export const getCategories = async (req, res) => {
  try {
    const categories = await prisma.category.findMany();

    return res.status(200).json({ categories });
  } catch (error) {
    console.error("Error getCategories: ", error);
    return res.status(500).json({ message: "Внутрішня помилка сервера." });
  }
};
