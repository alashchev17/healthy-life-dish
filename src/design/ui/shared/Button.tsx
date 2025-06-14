import { FC, ReactNode } from "react";
import { ArrowRight } from "../../icons/ArrowRight";
import { getButtonStyles } from "#/design/ui/shared/Button.styles";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "special-light"
  | "special-dark"
  | "icon";
export type IconPosition = "left" | "right";

// Base props without children
interface BaseButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  loading?: boolean;
  icon?: ReactNode;
  iconPosition?: IconPosition;
  fullWidth?: boolean;
}

// Conditional type: if variant is 'icon', children is forbidden, otherwise required
export type ButtonProps = BaseButtonProps &
  (
    | {
        variant: "icon";
        children?: never;
        fullyRounded?: boolean;
        size?: "sm" | "md";
      }
    | {
        variant?: Exclude<ButtonVariant, "icon">;
        children: ReactNode;
        fullyRounded?: never;
        size?: never;
      }
  );

export const Button: FC<ButtonProps> = ({
  children,
  variant = "primary",
  loading = false,
  icon,
  size = "sm",
  iconPosition = "right",
  fullWidth = false,
  fullyRounded = false,
  disabled = false,
  className = "",
  ...props
}) => {
  const buttonStyles = getButtonStyles({
    variant,
    fullWidth,
    disabled: disabled || loading,
    fullyRounded,
    size,
  });
  const combinedClassName = `${buttonStyles} ${className}`.trim();

  const renderIcon = () => {
    if (loading) {
      return (
        <div className="animate-spin">
          <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>
      );
    }

    if (icon) {
      return icon;
    }

    // Default arrow icon for primary and secondary buttons
    if (variant === "primary" || variant === "secondary") {
      return <ArrowRight />;
    }

    return null;
  };

  const iconElement = renderIcon();

  return (
    <button
      className={combinedClassName}
      disabled={disabled || loading}
      {...props}
    >
      {variant === "icon" ? (
        <div className="flex justify-center items-center">{iconElement}</div>
      ) : (
        <div className="flex justify-between items-center gap-2">
          {iconPosition === "left" && iconElement && (
            <span className="flex-shrink-0">{iconElement}</span>
          )}

          <span className="flex-1 text-left">{children}</span>

          {iconPosition === "right" && iconElement && (
            <span className="flex-shrink-0">{iconElement}</span>
          )}
        </div>
      )}
    </button>
  );
};
