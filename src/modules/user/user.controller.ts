import { Request, Response } from "express";
import { UserService } from "./user.service";

const createUser = async (req: Request, res: Response) => {
  try {
    const user = await UserService.createUser(req.body);
    res.status(201).json({
      success: true,
      message: "user create successfully",
      data: user,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await UserService.getAllUsers();
    res.json({
      success: true,
      data: users,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await UserService.getUserById(Number(req.params.id));
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.json({
      success: true,
      data: user,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const user = await UserService.updateUser(Number(req.params.id), req.body);
    res.json({
      success: true,
      message: "User updated successfully",
      data: user,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    await UserService.deleteUser(Number(req.params.id));
    res.json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
export const UserController = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
