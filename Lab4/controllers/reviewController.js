import { prisma } from "../lib/prisma.js";

export const createReview = async (req, res) => {
  try {
    const { rating, comment, userId, productId } = req.body;

    const review = await prisma.review.create({
      data: {
        rating: Number(rating),
        comment,
        userId: Number(userId),
        productId: Number(productId),
      },
    });

    return res.json(review);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Помилка створення Відгуку" });
  }
};

export const updateReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { rating, comment } = req.body;

    const updateData = {};
    if (rating !== undefined) updateData.rating = Number(rating);
    if (comment !== undefined) updateData.comment = comment;

    const review = await prisma.review.update({
      where: { id: Number(id) },
      data: updateData,
    });

    return res.json(review);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Помилка оновлення Відгуку" });
  }
};

export const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.review.delete({ where: { id: Number(id) } });
    return res.json({ success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Помилка видалення Відгуку" });
  }
};
