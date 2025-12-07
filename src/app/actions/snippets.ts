"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

interface CreateSnippetInput {
  title: string;
  code: string;
  language: string;
  description?: string;
}

interface UpdateSnippetInput {
  id: string;
  title: string;
  code: string;
  language: string;
  description?: string;
}

export async function createSnippet(input: CreateSnippetInput) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return { success: false, error: "Unauthorized" };
    }

    const snippet = await prisma.savedCode.create({
      data: {
        userId: session.user.id,
        title: input.title,
        code: input.code,
        language: input.language,
        description: input.description || null,
        isPublic: false // MVP: solo privados
      }
    });

    revalidatePath("/editor");

    return { success: true, snippet };
  } catch (error) {
    console.error("Create snippet error:", error);
    return { success: false, error: "Failed to save snippet" };
  }
}

export async function getMySnippets() {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return { success: false, error: "Unauthorized" };
    }

    const snippets = await prisma.savedCode.findMany({
      where: {
        userId: session.user.id
      },
      orderBy: {
        updatedAt: "desc"
      }
    });

    return { success: true, snippets };
  } catch (error) {
    console.error("Get snippets error:", error);
    return { success: false, error: "Failed to load snippets" };
  }
}

export async function getSnippet(id: string) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return { success: false, error: "Unauthorized" };
    }

    const snippet = await prisma.savedCode.findUnique({
      where: {
        id,
        userId: session.user.id // Solo sus propios snippets
      }
    });

    if (!snippet) {
      return { success: false, error: "Snippet not found" };
    }

    return { success: true, snippet };
  } catch (error) {
    console.error("Get snippet error:", error);
    return { success: false, error: "Failed to load snippet" };
  }
}

export async function updateSnippet(input: UpdateSnippetInput) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return { success: false, error: "Unauthorized" };
    }

    const snippet = await prisma.savedCode.update({
      where: {
        id: input.id,
        userId: session.user.id // Solo sus propios snippets
      },
      data: {
        title: input.title,
        code: input.code,
        language: input.language,
        description: input.description || null
      }
    });

    revalidatePath("/editor");

    return { success: true, snippet };
  } catch (error) {
    console.error("Update snippet error:", error);
    return { success: false, error: "Failed to update snippet" };
  }
}

export async function deleteSnippet(id: string) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return { success: false, error: "Unauthorized" };
    }

    await prisma.savedCode.delete({
      where: {
        id,
        userId: session.user.id // Solo sus propios snippets
      }
    });

    revalidatePath("/editor");

    return { success: true };
  } catch (error) {
    console.error("Delete snippet error:", error);
    return { success: false, error: "Failed to delete snippet" };
  }
}
