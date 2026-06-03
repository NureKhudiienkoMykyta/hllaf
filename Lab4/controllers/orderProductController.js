import { prisma } from "../lib/prisma.js";

export const createOrderProduct = async (req, res) => {
  try {
    const { orderId, productId, quantity } = req.body;
    const orderProduct = await prisma.orderProduct.create({
      data: {
        orderId: Number(orderId),
        productId: Number(productId),
        quantity: Number(quantity),
      },
    });
    return res.json(orderProduct);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Помилка створення Продукту в замовленні" });
  }
};

export const updateOrderProduct = async (req, res) => {
  try {
    const { orderId, productId } = req.params;
    const { quantity } = req.body;
    const orderProduct = await prisma.orderProduct.update({
      where: {
        orderId_productId: {
          orderId: Number(orderId),
          productId: Number(productId),
        },
      },
      data: {
        quantity: Number(quantity),
      },
    });
    return res.json(orderProduct);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Помилка оновлення Продукту в замовленні" });
  }
};

export const deleteOrderProduct = async (req, res) => {
  try {
    const { orderId, productId } = req.params;
    await prisma.orderProduct.delete({
      where: {
        orderId_productId: {
          orderId: Number(orderId),
          productId: Number(productId),
        },
      },
    });
    return res.json({ success: true });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Помилка видалення Продукту в замовленні" });
  }
};
