/** @format */
"use client";
import Link from "next/link";
import { Button, buttonVariants } from "../ui/button";
import { ThemeToggle } from "./theme-toggle";
import { useConvexAuth } from "convex/react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { SearchInput } from "./SearchInput";

export function Navbar() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useConvexAuth();
  return (
    <nav className="w-full py-5 flex items-center justify-between">
      <div className="flex items-center gap-8 ">
        <Link href="/" className="no-underline">
          <h1 className="text-3xl font-bold">
            Next<span className="text-primary">Pro</span>
          </h1>
        </Link>

        <div className="flex items-center gap-2">
          <Link href="/" className={buttonVariants({ variant: "ghost" })}>
            Home{" "}
          </Link>
          <Link href="/blog" className={buttonVariants({ variant: "ghost" })}>
            Blog
          </Link>
          <Link href="/create" className={buttonVariants({ variant: "ghost" })}>
            Create
          </Link>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="hidden md:block mr-2">
          <SearchInput />
        </div>

        {isLoading ? null : isAuthenticated ? (
          <Button
            onClick={() =>
              authClient.signOut({
                fetchOptions: {
                  onSuccess: () => {
                    toast.success("Logged out successfully");
                    router.push("/");
                  },
                  onError: (error) => {
                    toast.error(error.error.message);
                  },
                },
              })
            }
          >
            Logout
          </Button>
        ) : (
          <>
            <Link href="/auth/login" className={buttonVariants()}>
              Login
            </Link>
            <Link
              href="/auth/sign-up"
              className={buttonVariants({ variant: "outline" })}
            >
              Register
            </Link>
          </>
        )}

        <ThemeToggle />
      </div>
    </nav>
  );
}
