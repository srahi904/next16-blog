/** @format */
"use client";
import { Loader2, MessageSquare } from "lucide-react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { commentSchema } from "@/app/schemas/comment";
import { Field, FieldLabel } from "../ui/field";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { useParams } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";
import { api } from "@/convex/_generated/api";
import { Preloaded, useMutation, usePreloadedQuery } from "convex/react";
import z from "zod";
import { toast } from "sonner";
import { useTransition } from "react";
import { Avatar } from "../ui/avatar";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

export function CommentSection(props: {
  preloadedComments: Preloaded<typeof api.comments.getCommentsByPostId>;
}) {
  const [isPending, startTransition] = useTransition();
  const params = useParams<{ postId: Id<"posts"> }>();

  const data = usePreloadedQuery(props.preloadedComments);

  const createComment = useMutation(api.comments.createComment);

  const form = useForm({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      body: "",
      postId: params.postId,
    },
  });

  function onSubmit(data: z.infer<typeof commentSchema>) {
    startTransition(async () => {
      try {
        await createComment(data);
        form.reset();
        toast.success("Comment added successfully");
      } catch (error) {
        toast.error("Failed to add comment");
      }
    });
  }

  if (data === undefined) {
    return <div>Loading...</div>;
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-2 border-b ">
        <MessageSquare className="size-5" />
        <h2 className="text-xl font-bold ">{data.length} Commnets</h2>
      </CardHeader>

      <CardContent className="space-y-8">
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <Controller
            name="body"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Comment</FieldLabel>

                <div className="relative">
                  <Textarea
                    aria-invalid={fieldState.invalid}
                    placeholder="Write a comment..."
                    className="pr-10"
                    {...field}
                  />
                </div>
              </Field>
            )}
          />

          <Button disabled={isPending}>
            {isPending ? (
              <>
                <Loader2 className="size-4 animate-spin " />
                <span>Loading...</span>
              </>
            ) : (
              <span>Submit</span>
            )}
          </Button>
        </form>

        {data?.length > 0 && <hr className="my-4" />}

        <section className="space-y-4">
          {data?.map((comment) => (
            <div key={comment._id} className="flex gap-4">
              <Avatar className="size-10 shrink-0">
                <AvatarImage
                  src={`https://avatar.vercel.sh/${comment.authorName}`}
                  alt={comment.authorName}
                />

                <AvatarFallback>
                  {comment.authorName.slice(0, 2)}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-sm">{comment.authorName}</p>

                  <p className="text-muted-foreground text-xs">
                    {new Date(comment._creationTime).toLocaleDateString(
                      "en-US"
                    )}
                  </p>
                </div>

                <p className="text-sm text-foreground/90 whitespace-pre-wrap leading-relaxed">
                  {comment.body}
                </p>
              </div>
            </div>
          ))}
        </section>
      </CardContent>
    </Card>
  );
}
