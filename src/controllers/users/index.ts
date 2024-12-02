import { Request, Response } from "express";
import cloudinary from "../../config/cloudinary";
import fs from "fs/promises";

import { validateCreateUser } from "./../../validation/users";
import { IUsers } from "./../../interfaces/index";
import { apiErrorHandler } from "./../../errors/index";
import { respond } from "./../../services/index";
import { users } from "./../../utils/users";

export const getAllUsers = (req: Request, res: Response) => {
  respond(res, 200, true, "Users fetched successfully", users);
};

export const getUserById = (req: Request, res: Response) => {
  const id = req.params.id;

  const user = users.find((user) => user.id === id);

  if (!user) {
    respond(res, 404, false, "User not found");
    return;
  }

  respond(res, 200, true, "User fetched successfully", user);
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, surname, job, salary } = validateCreateUser(req.body);
    const { file } = req;

    if (!file) {
      respond(res, 400, false, "No file uploaded");
      return;
    }

    const profilePhotoUrl = await cloudinary.uploader.upload(file?.path, {
        folder: "Users(task-2)",
      })

    await fs.unlink(file.path);

    const newUser: IUsers = {
      id: String(users.length + 1),
      name,
      surname,
      job,
      salary,
      profilePhoto: profilePhotoUrl.secure_url,
    };

    users.unshift(newUser);

    respond(res, 201, true, "User created successfully", newUser);
  } catch (error) {
    apiErrorHandler(res, error);
  }
};
