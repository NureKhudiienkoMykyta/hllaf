import { prisma } from "../lib/prisma.js";

export const createOrder = async (req, res) => {
  try {
    const userId = req.user.id;

    const { status } = req.body;

    const order = await prisma.order.create({
      data: {
        userId: Number(userId),
        status,
      },
    });

    return res.json(order);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Помилка створення Замовлення" });
  }
};

export const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updateData = {};
    if (status !== undefined) updateData.status = status;

    const order = await prisma.order.update({
      where: { id: Number(id) },
      data: updateData,
    });

    return res.json(order);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Помилка оновлення Замовлення" });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.order.delete({ where: { id: Number(id) } });
    return res.json({ success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Помилка видалення Замовлення" });
  }
};

export const getOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const orderData = await prisma.order.findUnique({
      where: { id: Number(id) },
      include: {
        products: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!orderData) {
      return res.status(404).json({ error: "Замовлення не знайдено" });
    }

    return res.json({ data: orderData });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Помилка отримання Замовлення" });
  }
};
