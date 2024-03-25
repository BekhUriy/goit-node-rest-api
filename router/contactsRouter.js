import express from "express";
import { updateContactFavorite } from "../controllers/contactsControllers.js";

const contactsRouter = express.Router();

contactsRouter.patch("/:contactId/favorite", updateContactFavorite);

export default contactsRouter;
