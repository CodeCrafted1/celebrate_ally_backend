import "reflect-metadata";
import { DataSource } from "typeorm";
import { postgres } from "./config";
import User from "../entities/User";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: postgres.host,
  port: parseInt(postgres.port),
  username: postgres.user,
  password: postgres.password,
  database: postgres.database,
  synchronize: process.env.NODE_ENV === 'development',
  logging: process.env.NODE_ENV === 'development',
  entities: [User],
  migrations: ["src/migrations/**/*.ts"],
  subscribers: ["src/subscribers/**/*.ts"],
});

export const connectDB = async () => {
  try {
    await AppDataSource.initialize();
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Error connecting to the database:', error);
    throw error;
  }
}; 