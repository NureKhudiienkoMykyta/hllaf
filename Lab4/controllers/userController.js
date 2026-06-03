import { prisma } from "../lib/prisma.js";

export const createUser = async (req, res) => {
  try {
    const { email, name, password } = req.body;
    const user = await prisma.user.create({ data: { email, name, password } });
    return res.json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Помилка створення Користувача" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { email, name, password } = req.body;

    const updateData = {};
    if (email !== undefined) updateData.email = email;
    if (name !== undefined) updateData.name = name;
    if (password !== undefined) updateData.password = password;

    const user = await prisma.user.update({
      where: { id: Number(id) },
      data: updateData,
    });

    return res.json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Помилка оновлення Користувача" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.user.delete({ where: { id: Number(id) } });
    return res.json({ success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Помилка видалення Користувача" });
  }
};
