/** @format */
"use server";

import z from "zod";
import { postSchema } from "./schemas/blog";
import { fetchMutation } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { redirect } from "next/navigation";
import { getToken } from "@/lib/auth-server";
import { updateTag } from "next/cache";

export async function createBlogAction(values: z.infer<typeof postSchema>) {
  try {
    const parsed = postSchema.safeParse(values);

    if (!parsed.success) {
      throw new Error("Invalid input");
    }

    // Simulate a delay for async operation (e.g., database call)

    const token = await getToken();

    if (!token) {
      throw new Error("Not authenticated");
    }

    const imageUrl = await fetchMutation(
      api.posts.generateImageUploadUrl,
      {},
      { token }
    );

    const uploadResponse = await fetch(imageUrl, {
      method: "POST",
      headers: {
        "Content-Type": parsed.data.image.type,
      },
      body: parsed.data.image,
    });

    if (!uploadResponse.ok) {
      throw new Error("Image upload failed");
    }

    const { storageId } = await uploadResponse.json();

    await fetchMutation(
      api.posts.createPost,
      {
        title: parsed.data.title,
        body: parsed.data.content,
        imageStorageId: storageId,
      },
      { token }
    );
  } catch (error) {
    throw new Error("Failed to create post");
  }
  updateTag("blog");
  return redirect("/blog");
}
