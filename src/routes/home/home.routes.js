import express from "express";
import cartRoutes from "#routes/home/cart.routes.js";
import {UserValidator} from "#validator/index.js";

const router = express.Router();


import { IndexController } from "#controllers/index.js";
import { requireToken } from "#middlewares/http/index.js";

router.get("/", IndexController.index);
router.get("/product", UserValidator.validateRememberMe, IndexController.product);
router.get("/about", UserValidator.validateRememberMe, IndexController.about);
router.get("/story", UserValidator.validateRememberMe, IndexController.story);
router.get("/story/:id", UserValidator.validateRememberMe, IndexController.showStory);
router.get("/contact", UserValidator.validateRememberMe, IndexController.contact);
router.post('/feedback', UserValidator.validateRememberMe, IndexController.feedback);
router.get('/service', UserValidator.validateRememberMe, (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.redirect('/auth/login');
    } else {
        next();
    }
}, IndexController.service);
router.post('/service', UserValidator.validateRememberMe, IndexController.createTicket);

router.get('/store', IndexController.store);

router.get('/store/:slug', IndexController.show);

router.use("/cart", cartRoutes);
export default router;