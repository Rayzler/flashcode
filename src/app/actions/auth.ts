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
    // Verify if email is already registered
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return {
        success: false,
        error: "Email already registered"
      };
    }

    // Generate unique username from email
    const baseUsername = email
      .split("@")[0]
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "");
    let username = baseUsername || "user";
    let counter = 1;

    // Ensure the username is unique
    while (await prisma.user.findUnique({ where: { username } })) {
      username = `${baseUsername}${counter}`;
      counter++;
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user account
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
