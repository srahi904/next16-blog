/** @format */

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { buttonVariants } from "@/components/ui/button";
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import type { Metadata } from "next";
import { cacheLife, cacheTag } from "next/cache";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Blog",
  };
}

export default function BlogPage() {
  return (
    <div className="py-12">
      <div className="text-center pb-12">
        <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">
          Our Blog
        </h1>
        <p className="pt-4 max-w-2xl mx-auto text-xl">
          Insights, Tips, and Updates
        </p>
      </div>

      <Suspense fallback={<SkeletonLoadingUI />}>
        <LoadBlogList />
      </Suspense>
    </div>
  );
}

async function LoadBlogList() {
  // This directive tells Next.js to run this function at BUILD time
  // and cache the result for the specified duration.
  "use cache";
  cacheLife("hours");
  cacheTag("blog");

  // If this fails during build (e.g., missing Env Vars), the build MUST fail.
  // Do not wrap this in try/catch, or you will cache an empty page.
  const data = await fetchQuery(api.posts.getPosts);

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 sm:grid-cols-2">
      {data?.map((post) => (
        <Card key={post._id} className="pt-0">
          <div className="relative h-48 w-full overflow-hidden">
            <Image
              src={
                post.imageUrl ??
                "https://images.unsplash.com/photo-1765498067718-e6e2c27b2a48"
              }
              alt={post.title}
              fill
              className="object-cover rounded-t-lg"
            />
          </div>

          <CardContent>
            <Link href={`/blog/${post._id}`} className="block mt-4">
              <h1 className="text-lg font-bold hover:text-primary">
                {post.title}
              </h1>
            </Link>
            <p className="text-muted-foreground line-clamp-3">{post.body}</p>
          </CardContent>

          <CardFooter>
            <Link
              href={`/blog/${post._id}`}
              className={buttonVariants({
                className: "w-full",
              })}
            >
              <h1 className="text-lg font-bold">Read More &rarr;</h1>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

function SkeletonLoadingUI() {
  return (
    <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-3">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="flex flex-col space-y-3">
          <Skeleton className="h-48 w-full rounded-xl" />
          <div className="space-y-2 flex flex-col">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </div>
      ))}
    </div>
  );
}
