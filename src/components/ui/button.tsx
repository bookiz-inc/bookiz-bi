import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary-500 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "text-primary-600 hover:text-primary-700 active:text-primary-800",
        destructive:
          "text-red-500 hover:text-red-600 active:text-red-700",
        outline:
          "border border-gray-200 bg-white shadow-sm hover:bg-gray-50 text-primary-600 hover:text-primary-700 active:bg-gray-100",
        secondary:
          "bg-primary-50 text-primary-600 shadow-sm hover:bg-primary-100 active:bg-primary-200",
        ghost:
          "text-primary-600 hover:bg-primary-50 hover:text-primary-700 active:bg-primary-100",
        link: "text-primary-600 underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants } 