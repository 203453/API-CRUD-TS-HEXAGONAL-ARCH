import { Request, Response } from "express";

import { UserRepository } from "../../infrastructure/UserRepository";

export const UserController = {
  async getAllUsers(req: Request, res: Response) {
    try {
      const users = await UserRepository.getAll();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener los usuarios" });
    }
  },

  async getUserById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const user = await UserRepository.getById(id);
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ message: "Usuario no encontrado" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error al obtener el usuario" });
    }
  },

  async createUser(req: Request, res: Response) {
    try {
      const { name, email } = req.body;
      const user = await UserRepository.create({ name, email });
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ message: "Error al crear el usuario" });
    }
  },

  async updateUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { name, email } = req.body;
      const updatedUser = await UserRepository.update(id, { name, email });
      if (updatedUser) {
        res.json(updatedUser);
      } else {
        res.status(404).json({ message: "Usuario no encontrado" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error al actualizar el usuario" });
    }
  },

  async deleteUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const deletedUser = await UserRepository.delete(id);
      if (deletedUser) {
        res.json(deletedUser);
      } else {
        res.status(404).json({ message: "Usuario no encontrado" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error al eliminar el usuario" });
    }
  },
};
