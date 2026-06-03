import { Router } from "express";
import usersRoutes from "./users.js";
import categoriesRoutes from "./categories.js";
import productsRoutes from "./products.js";
import ordersRoutes from "./orders.js";
import reviewsRoutes from "./reviews.js";
import productCategoriesRoutes from "./productCategories.js";
import orderProductsRoutes from "./orderProducts.js";
import authRoutes from "./auth.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/users", usersRoutes);
router.use("/categories", categoriesRoutes);
router.use("/products", productsRoutes);
router.use("/orders", ordersRoutes);
router.use("/reviews", reviewsRoutes);
router.use("/product-categories", productCategoriesRoutes);
router.use("/order-products", orderProductsRoutes);

export default router;
