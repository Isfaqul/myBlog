import type { NextFunction, Request, Response } from "express";
import { prisma } from "../lib/prisma.js";
import { validateCommentForm } from "../validation/comment.js";
import { matchedData, validationResult } from "express-validator";
import type { UserOnRequestObj } from "../@types/auth.js";
import { validatePostBody } from "../validation/blog.js";
import { getSlug } from "../utils/util.js";

const DEFAULT_ADMIN_ID = 1;

export const addPost = [
  validatePostBody,
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ message: "Invalid data", errors: errors.array() });
    }

    const { title, body } = matchedData(req);

    try {
      await prisma.post.create({
        data: {
          title: title,
          slug: getSlug(title),
          body: body,
          userId: DEFAULT_ADMIN_ID, // Default ADMIN userID
        },
      });

      res.status(200).json({ message: "Successfully posted" });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
];

export const listPosts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const posts = await prisma.post.findMany({
      where: {
        published: true,
      },
      include: {
        user: {
          select: {
            name: true,
          },
        },
        comments: {
          include: {
            user: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    res.json(posts);
  } catch (error) {
    next(error);
  }
};

export const getPostById = async (req: Request, res: Response, next: NextFunction) => {
  const postId = Number(req.params.postId);

  if (Number.isNaN(postId)) {
    next(new Error("Invalid post ID."));
    return;
  }

  try {
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
        published: true,
      },
      include: {
        user: {
          select: {
            name: true,
          },
        },
        comments: {
          include: {
            user: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    res.json(post);
  } catch (error) {
    next(error);
  }
};

export const deletePost = async (req: Request, res: Response, next: NextFunction) => {
  const postId = Number(req.params.postId);

  if (Number.isNaN(postId)) {
    next(new Error("Invalid post ID."));
    return;
  }

  res.json({ message: `Delete post ID - ${postId} here` });
};

export const editPost = async (req: Request, res: Response, next: NextFunction) => {
  const postId = Number(req.params.postId);

  if (Number.isNaN(postId)) {
    next(new Error("Invalid post ID."));
    return;
  }

  res.json({ message: `Edit post ID - ${postId} here` });
};

// Comment Section -------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------

export const postComment = [
  validateCommentForm,
  async (req: Request, res: Response, next: NextFunction) => {
    const results = validationResult(req);

    if (!results.isEmpty()) {
      return res.status(400).json({ message: "Invalid data", errors: results.array() });
    }

    const { comment } = matchedData(req);
    const postId = Number(req.params.postId);

    if (Number.isNaN(postId)) {
      next(new Error("Invalid post ID."));
      return;
    }

    const user = req.user as UserOnRequestObj;

    try {
      const newComment = await prisma.comment.create({
        data: {
          comment: comment,
          postId: postId,
          userId: user.id,
        },
        include: {
          user: {
            select: {
              name: true,
            },
          },
        },
      });

      res.json(newComment);
    } catch (error) {
      next(error);
    }
  },
];

export const editComment = async (req: Request, res: Response, next: NextFunction) => {
  const commentId = Number(req.params.commentId);

  if (Number.isNaN(commentId)) {
    next(new Error("Invalid comment ID."));
    return;
  }

  res.json({ message: `Edit comment ID - ${commentId} here` });
};

export const deleteComment = async (req: Request, res: Response, next: NextFunction) => {
  const commentId = Number(req.params.commentId);

  if (Number.isNaN(commentId)) {
    next(new Error("Invalid comment ID."));
    return;
  }

  res.json({ message: `Delete comment ID - ${commentId} here` });
};
