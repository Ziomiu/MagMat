import React from "react";
import { cn } from "../libs/utils.ts";

function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "bg-card text-card-foreground flex flex-col rounded-xl shadow-sm",
        className,
      )}
      {...props}
    ></div>
  );
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("px-6 ", className)} {...props}></div>;
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("font-semibold py-1", className)} {...props}></div>;
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("px-6", className)} {...props} />;
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center px-6", className)}
      {...props}
    />
  );
}

export { Card, CardHeader, CardTitle, CardContent, CardFooter };
