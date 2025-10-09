"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_service_1 = require("./user.service");
const createUser = async (req, res) => {
    try {
        const user = await user_service_1.UserService.createUser(req.body);
        res.status(201).json({
            success: true,
            message: "user create successfully",
            data: user,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
const getAllUsers = async (req, res) => {
    try {
        const users = await user_service_1.UserService.getAllUsers();
        res.json({
            success: true,
            data: users,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
const getUserById = async (req, res) => {
    try {
        const user = await user_service_1.UserService.getUserById(Number(req.params.id));
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
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
const updateUser = async (req, res) => {
    try {
        const user = await user_service_1.UserService.updateUser(Number(req.params.id), req.body);
        res.json({
            success: true,
            message: "User updated successfully",
            data: user,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};
const deleteUser = async (req, res) => {
    try {
        await user_service_1.UserService.deleteUser(Number(req.params.id));
        res.json({
            success: true,
            message: "User deleted successfully",
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};
exports.UserController = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
};
//# sourceMappingURL=user.controller.js.map