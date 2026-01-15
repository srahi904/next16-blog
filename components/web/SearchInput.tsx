/** @format */
"use client";

import { Loader2, Search } from "lucide-react";
import { Input } from "../ui/input"; // Adjust path if needed
import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Link from "next/link";

export function SearchInput() {
  const [term, setTerm] = useState("");
  const [open, setOpen] = useState(false);

  const results = useQuery(
    api.posts.searchPosts,
    term.length >= 2 ? { limit: 5, term } : "skip"
  );

  return (
    <div className="relative w-full max-w-sm z-50">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search posts..."
          className="pl-9"
          value={term}
          onChange={(e) => {
            setTerm(e.target.value);
            setOpen(true);
          }}
          // We keep onBlur to close the menu if the user tabs out or clicks blank space
          onBlur={() => {
            setOpen(false);
          }}
        />
      </div>

      {open && term.length >= 2 && (
        <div className="absolute top-full mt-2 w-full overflow-hidden rounded-lg border bg-popover shadow-xl animate-in fade-in-0 zoom-in-95">
          {results === undefined ? (
            <div className="flex items-center justify-center gap-2 p-4 text-sm text-muted-foreground">
              <Loader2 className="size-4 animate-spin" />
              Searching…
            </div>
          ) : results.length === 0 ? (
            <p className="p-4 text-center text-sm text-muted-foreground">
              No results found
            </p>
          ) : (
            <ul className="divide-y">
              {results.map((post) => (
                <li key={post._id}>
                  <Link
                    href={`/blog/${post._id}`}
                    className="block px-4 py-3 transition-colors hover:bg-accent hover:text-accent-foreground"
                    // --- THE FIX STARTS HERE ---
                    // Prevent the input from losing focus when clicking the link
                    onMouseDown={(e) => e.preventDefault()}
                    // Handle the closing manually on click
                    onClick={() => {
                      setOpen(false);
                      setTerm("");
                    }}
                    // --- THE FIX ENDS HERE ---
                  >
                    <p className="truncate font-medium">{post.title}</p>
                    <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                      {post.body}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
