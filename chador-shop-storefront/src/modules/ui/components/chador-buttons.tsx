import { clx } from "@medusajs/ui"
import React from "react"

interface ChadorButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "gold" | "outline"
  size?: "sm" | "md" | "lg" | "xl"
  fullWidth?: boolean
  isLoading?: boolean
  children: React.ReactNode
}

const ChadorButton = React.forwardRef<HTMLButtonElement, ChadorButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      fullWidth = false,
      isLoading = false,
      className,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseClasses = "inline-flex items-center justify-center font-medium tracking-wide transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"

    const variantClasses = {
      primary: "bg-chador-black text-chador-warm-white hover:bg-chador-dark-brown hover:shadow-lg transform hover:-translate-y-0.5 focus:ring-chador-gold",
      secondary: "bg-transparent border-2 border-chador-black text-chador-black hover:bg-chador-black hover:text-chador-warm-white focus:ring-chador-gold",
      gold: "bg-chador-gold text-chador-black hover:bg-opacity-90 hover:shadow-lg focus:ring-chador-brown",
      outline: "bg-transparent border border-chador-taupe text-chador-brown hover:border-chador-gold hover:text-chador-gold focus:ring-chador-gold"
    }

    const sizeClasses = {
      sm: "px-4 py-2 text-sm rounded",
      md: "px-6 py-3 text-sm rounded-md",
      lg: "px-8 py-3 text-base rounded-md",
      xl: "px-10 py-4 text-lg rounded-lg"
    }

    const widthClasses = fullWidth ? "w-full" : ""

    return (
      <button
        ref={ref}
        className={clx(
          baseClasses,
          variantClasses[variant],
          sizeClasses[size],
          widthClasses,
          className
        )}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <>
            <svg
              className="animate-spin -ml-1 mr-3 h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Laden...
          </>
        ) : (
          children
        )}
      </button>
    )
  }
)

ChadorButton.displayName = "ChadorButton"

// Icon Button Component
interface ChadorIconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "gold" | "ghost"
  size?: "sm" | "md" | "lg"
  icon: React.ReactNode
  label?: string
}

const ChadorIconButton = React.forwardRef<HTMLButtonElement, ChadorIconButtonProps>(
  (
    {
      variant = "ghost",
      size = "md",
      icon,
      label,
      className,
      ...props
    },
    ref
  ) => {
    const baseClasses = "inline-flex items-center justify-center rounded-full transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2"

    const variantClasses = {
      primary: "bg-chador-black text-chador-warm-white hover:bg-chador-dark-brown focus:ring-chador-gold",
      secondary: "bg-chador-cream text-chador-black hover:bg-chador-soft-beige focus:ring-chador-gold",
      gold: "bg-chador-gold text-chador-black hover:bg-opacity-90 focus:ring-chador-brown",
      ghost: "bg-transparent text-chador-brown hover:bg-chador-cream hover:text-chador-black focus:ring-chador-gold"
    }

    const sizeClasses = {
      sm: "w-8 h-8 text-sm",
      md: "w-10 h-10 text-base",
      lg: "w-12 h-12 text-lg"
    }

    return (
      <button
        ref={ref}
        className={clx(
          baseClasses,
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        title={label}
        aria-label={label}
        {...props}
      >
        {icon}
      </button>
    )
  }
)

ChadorIconButton.displayName = "ChadorIconButton"

// Link Button Component
interface ChadorLinkButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: "primary" | "secondary" | "gold" | "text"
  size?: "sm" | "md" | "lg"
  icon?: React.ReactNode
  iconPosition?: "left" | "right"
}

const ChadorLinkButton = React.forwardRef<HTMLAnchorElement, ChadorLinkButtonProps>(
  (
    {
      variant = "text",
      size = "md",
      icon,
      iconPosition = "right",
      className,
      children,
      ...props
    },
    ref
  ) => {
    const baseClasses = "inline-flex items-center gap-2 font-medium tracking-wide transition-all duration-200 ease-in-out group"

    const variantClasses = {
      primary: "text-chador-black hover:text-chador-gold",
      secondary: "text-chador-brown hover:text-chador-black",
      gold: "text-chador-gold hover:text-chador-dark-brown",
      text: "text-chador-brown hover:text-chador-gold underline-offset-4 hover:underline"
    }

    const sizeClasses = {
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg"
    }

    return (
      <a
        ref={ref}
        className={clx(
          baseClasses,
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {icon && iconPosition === "left" && icon}
        {children}
        {icon && iconPosition === "right" && icon}
      </a>
    )
  }
)

ChadorLinkButton.displayName = "ChadorLinkButton"

export { ChadorButton, ChadorIconButton, ChadorLinkButton }