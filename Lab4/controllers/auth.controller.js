import { prisma } from "../lib/prisma.js";
import { generateAccessToken } from "../utils/jwt.js";

export const register = async (req, res) => {
  try {
    const { email, name, password } = req.body;

    const candidate = await prisma.user.findUnique({ where: { email } });
    if (candidate) {
      return res
        .status(400)
        .json({ error: "Користувач з таким email вже існує" });
    }

    const user = await prisma.user.create({
      data: {
        email,
        name,
        password,
      },
    });

    return res.json({
      user: { id: user.id, email: user.email, name: user.name },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Помилка при реєстрації" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(400).json({ error: "Неправильний email або password" });
    }

    if (user.password !== password) {
      return res.status(400).json({ error: "Неправильний email або password" });
    }

    const token = generateAccessToken({ id: user.id, email: user.email });

    return res.json({
      token,
      user: { id: user.id, email: user.email, name: user.name },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Помилка при вході в систему" });
  }
};
