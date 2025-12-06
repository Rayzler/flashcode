"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

interface RegisterInput {
  email: string;
  password: string;
  name: string;
}

interface RegisterOutput {
  success: boolean;
  error?: string;
}

export async function registerUser(
  input: RegisterInput
): Promise<RegisterOutput> {
  const { email, password, name } = input;

  try {
    // Verificar si el usuario ya existe
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return {
        success: false,
        error: "Email already registered"
      };
    }

    // Generar username único desde el email
    const baseUsername = email
      .split("@")[0]
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "");
    let username = baseUsername;
    let counter = 1;

    // Asegurar que el username sea único
    while (await prisma.user.findUnique({ where: { username } })) {
      username = `${baseUsername}${counter}`;
      counter++;
    }

    // Hash de la contraseña
    const hashedPassword = await bcrypt.hash(password, 12);

    // Crear usuario
    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        username
      }
    });

    return { success: true };
  } catch (error) {
    console.error("Registration error:", error);
    return {
      success: false,
      error: "Failed to create account"
    };
  }
}
