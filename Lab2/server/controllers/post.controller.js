import { prisma } from "../lib/prisma.js";

export const createPost = async (req, res) => {
  try {
    const { title, content, categoryId } = req.body;
    const userId = req.user?.userId;

    if (!title || !content || !categoryId) {
      return res.status(400).json({
        message: "Усі поля є обов'язковими.",
      });
    }

    const parsedCategoryId = Number(categoryId);
    const parsedUserId = Number(userId);

    if (isNaN(parsedCategoryId) || isNaN(parsedUserId)) {
      return res.status(400).json({ message: "Невалідний формат ID." });
    }

    const existCategory = await prisma.category.findUnique({
      where: { id: parsedCategoryId },
    });

    if (!existCategory) {
      return res.status(404).json({ message: "Такої категорії не існує!" });
    }

    const post = await prisma.post.create({
      data: {
        title,
        content,
        authorId: parsedUserId,
        categoryId: existCategory.id,
      },
      include: {
        category: true,
        author: {
          select: {
            name: true,
          },
        },
      },
    });

    return res.status(201).json({
      message: "Пост успішно створено",
      post,
    });
  } catch (error) {
    console.error("Error createPost: ", error);
    return res.status(500).json({ message: "Внутрішня помилка сервера." });
  }
};

export const getPosts = async (req, res) => {
  try {
    const { search, categoryId } = req.query;

    const posts = await prisma.post.findMany({
      where: {
        AND: [
          search
            ? {
                OR: [
                  { title: { contains: search, mode: "insensitive" } },
                  { content: { contains: search, mode: "insensitive" } },
                ],
              }
            : {},
          categoryId ? { categoryId: Number(categoryId) } : {},
        ],
      },
      include: {
        category: true,
        author: {
          select: {
            name: true,
          },
        },
      },
    });

    return res.status(200).json({ posts });
  } catch (error) {
    console.error("Error getPosts: ", error);
    return res.status(500).json({ message: "Внутрішня помилка сервера." });
  }
};

export const getPost = async (req, res) => {
  try {
    const postId = req.params.id;
    const parsedPostId = Number(postId);

    if (isNaN(parsedPostId)) {
      return res.status(400).json({ message: "Невалідний формат ID." });
    }

    const post = await prisma.post.findUnique({
      where: {
        id: parsedPostId,
      },
      include: {
        category: true,
        author: {
          select: {
            name: true,
          },
        },
      },
    });

    return res.status(200).json({ post });
  } catch (error) {
    console.error("Error getPost: ", error);
    return res.status(500).json({ message: "Внутрішня помилка сервера." });
  }
};

export const getPostComments = async (req, res) => {
  try {
    const postId = req.params.postId;
    const parsedPostId = Number(postId);

    if (isNaN(parsedPostId)) {
      return res.status(400).json({ message: "Невалідний формат ID." });
    }

    const existedPost = await prisma.post.findUnique({
      where: {
        id: parsedPostId,
      },
    });

    if (!existedPost) {
      return res.status(404).json({ message: "Посту немає!" });
    }

    const comments = await prisma.comment.findMany({
      where: {
        postId: parsedPostId,
      },
      include: {
        author: {
          select: {
            name: true,
          },
        },
      },
    });

    return res.status(200).json({ comments });
  } catch (error) {
    console.error("Error getPostComments: ", error);
    return res.status(500).json({ message: "Внутрішня помилка сервера." });
  }
};

export const createPostComment = async (req, res) => {
  try {
    const { content } = req.body;

    if (!content || content.trim() === "") {
      return res.status(400).json({ message: "Немає вмісту коментаря" });
    }

    const userId = req.user?.userId;
    const postId = req.params.postId;
    const parsedPostId = Number(postId);
    const parsedUserId = Number(userId);

    if (isNaN(parsedPostId) || isNaN(parsedUserId)) {
      return res.status(400).json({ message: "Невалідний формат ID." });
    }

    const existedPost = await prisma.post.findUnique({
      where: {
        id: parsedPostId,
      },
    });

    if (!existedPost) {
      return res.status(404).json({ message: "Посту немає!" });
    }

    const comment = await prisma.comment.create({
      data: {
        content,
        authorId: parsedUserId,
        postId: parsedPostId,
      },
    });

    return res.status(201).json({ message: "Коментар створенно", comment });
  } catch (error) {
    console.error("Error createPostComment: ", error);
    return res.status(500).json({ message: "Внутрішня помилка сервера." });
  }
};
