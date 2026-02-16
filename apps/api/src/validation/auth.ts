import { body } from "express-validator";
import { prisma } from "../lib/prisma.js";

const validateSignupFormData = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name must not be empty")
    .bail()
    .isLength({ min: 2, max: 100 })
    .withMessage("Name must be between 2-100 characters")
    .bail(),
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username must not be empty")
    .bail()
    .isLength({ min: 2, max: 50 })
    .withMessage("Username must be between 2-50 characters")
    .bail()
    .custom(async (value) => {
      const foundUsername = await prisma.user.findUnique({
        where: {
          username: value,
        },
      });

      if (foundUsername) throw new Error(`Username '${value}' already exists. Please try another.`);
      return true;
    }),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password must not be empty")
    .bail()
    .isLength({ min: 8, max: 100 })
    .withMessage("Password must be between 8-100 characters")
    .bail(),
];

const validateLoginFormData = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username must not be empty")
    .bail()
    .isLength({ min: 2, max: 50 })
    .withMessage("Username must be between 2-50 characters")
    .bail(),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password must not be empty")
    .bail()
    .isLength({ min: 8, max: 100 })
    .withMessage("Password must be between 8-100 characters")
    .bail(),
];

export { validateLoginFormData, validateSignupFormData };
