import { body } from "express-validator";

export const validatePostBody = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Post body must not be empty.")
    .bail()
    .isLength({ min: 10, max: 200 })
    .withMessage("Title must be between 10-200 characters."),
  body("body")
    .trim()
    .notEmpty()
    .withMessage("Post body must not be empty.")
    .bail()
    .isLength({ min: 500, max: 5000 })
    .withMessage("Post body must be 500-5000 characters."),
];
