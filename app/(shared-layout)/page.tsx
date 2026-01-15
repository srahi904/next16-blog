/** @format */

"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  PenTool,
  Sparkles,
  BookOpen,
  Zap,
  Mouse,
  ChevronDown,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
// Import the new background component

export default function HomePage() {
  const posts = useQuery(api.posts.getPosts);

  const postsSectionRef = useRef<HTMLElement>(null);

  const scrollToPosts = () => {
    postsSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="flex flex-col min-h-screen bg-background text-foreground">
      {/* --- HERO SECTION --- */}
      <section className="relative pt-24 pb-32 lg:pt-36 lg:pb-40 overflow-hidden flex flex-col items-center justify-center min-h-[90vh]">
        {/* Static Blur Effect for depth */}
        <div className="absolute top-0 left-0 right-0 h-[500px] bg-primary/5 blur-[120px] rounded-full mix-blend-multiply -z-10" />

        <div className="max-w-5xl mx-auto text-center px-6 relative z-10 flex flex-col items-center">
          {/* Badge Animation */}
          <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium bg-secondary/50 backdrop-blur-sm mb-6 animate-in fade-in slide-in-from-top-4 duration-1000 ease-out">
            <Sparkles className="mr-2 h-4 w-4 text-yellow-500" />
            <span className="text-muted-foreground">
              The 2.0 Platform is live
            </span>
          </div>

          {/* Heading Animation */}
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-primary mb-6 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-100 fill-mode-backwards">
            Write. Share. <br className="hidden md:block" />
            <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Build in Public.
            </span>
          </h1>

          {/* Text Animation */}
          <p className="mt-4 text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200 fill-mode-backwards">
            A minimalist blogging platform designed for developers, thinkers,
            and creators who value clarity over clutter.
          </p>

          {/* Buttons Animation */}
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300 fill-mode-backwards">
            <Link href="/create">
              <Button
                size="lg"
                className="w-full sm:w-auto text-lg h-12 px-8 shadow-lg hover:shadow-primary/20 transition-all hover:scale-105"
              >
                Start Writing <PenTool className="ml-2 h-4 w-4" />
              </Button>
            </Link>

            <Link href="/blog">
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto text-lg h-12 px-8 bg-background/50 backdrop-blur-sm hover:bg-accent/50 transition-all"
              >
                Read Community <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>

        {/* --- MOUSE SCROLL INDICATOR --- */}
        <div
          onClick={scrollToPosts}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 cursor-pointer group animate-in fade-in duration-1000 delay-700"
        >
          <div className="flex flex-col items-center gap-2 text-muted-foreground group-hover:text-primary transition-colors">
            <span className="text-xs font-medium uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Scroll
            </span>
            {/* Bouncing Mouse Icon */}
            <div className="relative">
              <Mouse className="h-8 w-8 animate-bounce" />
              <ChevronDown className="h-4 w-4 absolute -bottom-4 left-1/2 -translate-x-1/2 animate-pulse" />
            </div>
          </div>
        </div>
      </section>

      {/* --- LATEST POSTS --- */}
      <section
        ref={postsSectionRef}
        className="py-16 md:py-24 max-w-7xl mx-auto px-6 scroll-mt-20"
      >
        <div className="flex items-center justify-between mb-10">
          <div className="space-y-1">
            <h2 className="text-3xl font-bold tracking-tight">
              Latest Thoughts
            </h2>
            <p className="text-muted-foreground">
              Fresh ideas from the community.
            </p>
          </div>
          <Link
            href="/blog"
            className="hidden md:flex items-center text-primary hover:underline underline-offset-4"
          >
            View all <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>

        {posts === undefined ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="rounded-xl border border-border/50 bg-card/50 h-full overflow-hidden flex flex-col animate-pulse"
              >
                <Skeleton className="h-56 w-full rounded-none" />
                <div className="p-6 flex-1 flex flex-col gap-4">
                  <Skeleton className="h-6 w-3/4" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                  </div>
                </div>
                <div className="p-6 pt-0 flex items-center gap-3">
                  <Skeleton className="h-6 w-16 rounded-md" />
                  <Skeleton className="h-4 w-20" />
                </div>
              </div>
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-20 bg-muted/20 rounded-xl border border-dashed animate-in fade-in zoom-in-95 duration-500">
            <p className="text-xl text-muted-foreground">
              No posts yet. Be the first creator.
            </p>
            <Link
              href="/create"
              className="text-primary font-medium mt-2 inline-block"
            >
              Write a post &rarr;
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.slice(0, 6).map((post, index) => (
              <Link
                key={post._id}
                href={`/blog/${post._id}`}
                className="group h-full"
              >
                <Card
                  // Staggered animation for cards
                  className="h-full overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-primary/20 animate-in fade-in slide-in-from-bottom-4"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative h-56 w-full overflow-hidden">
                    <Image
                      src={
                        post.imageUrl ||
                        "https://images.unsplash.com/photo-1498050108023-c5249f4df085"
                      }
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105 rounded-t-lg"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold tracking-tight mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground line-clamp-3 leading-relaxed text-sm">
                      {post.body}
                    </p>
                  </CardContent>
                  <CardFooter className="p-6 pt-0 flex items-center text-xs text-muted-foreground font-medium uppercase tracking-wider">
                    <span className="bg-primary/10 text-primary px-2 py-1 rounded">
                      Article
                    </span>
                    <span className="mx-2">•</span>
                    <span>5 min read</span>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* --- FEATURE SECTION --- */}
      <section className="py-24 bg-muted/30 border-y">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center rounded-lg bg-blue-500/10 px-3 py-1 text-sm font-medium text-blue-500">
                Why NextPro?
              </div>
              <h2 className="text-4xl font-bold tracking-tight">
                Built for clarity, <br />
                optimized for speed.
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                NextPro is designed for people who value clean thinking. We
                stripped away the distractions so you can focus on shipping
                content.
              </p>

              <div className="space-y-4 pt-4">
                {[
                  { icon: Zap, text: "Real-time sync with Convex DB" },
                  { icon: PenTool, text: "Distraction-free Markdown editor" },
                  { icon: BookOpen, text: "SEO optimized by default" },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-background shadow-sm border">
                      <item.icon className="h-5 w-5 text-primary" />
                    </div>
                    <span className="font-medium">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative h-[500px] w-full rounded-2xl overflow-hidden shadow-2xl border bg-background">
              <div className="absolute top-10 right-10 w-20 h-20 bg-blue-500/20 rounded-full blur-2xl z-10" />
              <div className="absolute bottom-10 left-10 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl z-10" />
              <Image
                src="https://images.unsplash.com/photo-1555066931-4365d14bab8c"
                alt="Editor preview"
                fill
                className="object-cover opacity-90"
              />
            </div>
          </div>
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto bg-primary text-primary-foreground rounded-3xl p-12 text-center relative overflow-hidden shadow-2xl animate-in fade-in slide-in-from-bottom-8 duration-700 view-animate">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Ready to publish your legacy?
            </h2>
            <p className="text-primary-foreground/80 text-lg mb-8 max-w-lg mx-auto">
              Join thousands of developers sharing their journey. Your first
              post is just one click away.
            </p>
            <Link href="/create">
              <Button
                size="lg"
                variant="secondary"
                className="h-14 px-8 text-lg font-semibold shadow-lg hover:scale-105 transition-transform"
              >
                Create Your First Post
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
