import { Pool } from "pg";

import { dbConfig } from "../config";
import { User } from "../domain/models/User";

const pool = new Pool(dbConfig);

export const UserRepository = {
  async getAll(): Promise<User[]> {
    const client = await pool.connect();
    try {
      const result = await client.query("SELECT * FROM users");
      return result.rows;
    } finally {
      client.release();
    }
  },

  async getById(id: string): Promise<User | undefined> {
    const client = await pool.connect();
    try {
      const result = await client.query("SELECT * FROM users WHERE id = $1", [
        id,
      ]);
      if (result.rowCount === 0) {
        return undefined;
      }
      return result.rows[0];
    } finally {
      client.release();
    }
  },

  async create(user: User): Promise<User> {
    const client = await pool.connect();
    try {
      const result = await client.query(
        "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *",
        [user.name, user.email]
      );
      return result.rows[0];
    } finally {
      client.release();
    }
  },

  async update(id: string, data: Partial<User>): Promise<User | undefined> {
    const client = await pool.connect();
    try {
      const result = await client.query(
        "UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *",
        [data.name, data.email, id]
      );
      if (result.rowCount === 0) {
        return undefined;
      }
      return result.rows[0];
    } finally {
      client.release();
    }
  },

  async delete(id: string): Promise<User | undefined> {
    const client = await pool.connect();
    try {
      const result = await client.query(
        "DELETE FROM users WHERE id = $1 RETURNING *",
        [id]
      );
      if (result.rowCount === 0) {
        return undefined;
      }
      return result.rows[0];
    } finally {
      client.release();
    }
  },
};
