import { body } from "express-validator";

export const validateCommentForm = [
  body("comment")
    .trim()
    .notEmpty()
    .withMessage("Comment must not be empty")
    .bail()
    .isLength({ min: 2, max: 200 })
    .withMessage("Name must be between 2 - 200 characters")
    .bail()
];
