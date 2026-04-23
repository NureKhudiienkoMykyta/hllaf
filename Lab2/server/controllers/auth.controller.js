import { prisma } from "../lib/prisma.js";
import { generateAccessToken } from "../utils/jwt.js";
import bcrypt from "bcrypt";

const SALT = 10;

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Не всі поля заповненні" });
    }

    const existedUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existedUser) {
      return res.status(400).json({ message: "Користувач вже існує" });
    }

    const hashPassword = await bcrypt.hash(password, SALT);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashPassword,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    const token = generateAccessToken({ userId: user.id });

    return res.status(200).json({ token, user });
  } catch (error) {
    console.error("Error register: ", error);
    return res.status(500).json({ message: "Внутрішня помилка сервера." });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Не всі поля заповненні" });
    }

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(400).json({ message: "Користувача не існує" });
    }

    const matchPassword = await bcrypt.compare(password, user.password);

    if (!matchPassword) {
      return res.status(400).json({ message: "Неправильний пароль" });
    }

    const token = generateAccessToken({ userId: user.id });

    return res.status(200).json({ token });
  } catch (error) {
    console.error("Error login: ", error);
    return res.status(500).json({ message: "Внутрішня помилка сервера." });
  }
};
