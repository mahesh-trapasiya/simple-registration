import React from "react";
import { Button as BsButton } from "react-bootstrap";

interface ButtonProps {
  size?: "sm" | "lg";
  label?: string;
  type?: "button" | "submit" | "reset";
  className?: string;
  variant?:
    | "primary"
    | "secondary"
    | "success"
    | "danger"
    | "warning"
    | "info"
    | "light"
    | "dark"
    | "outline-primary"
    | "outline-secondary"
    | "outline-success"
    | "outline-danger"
    | "outline-warning"
    | "outline-info"
    | "outline-light"
    | "outline-dark";
  onClick?: () => void;
}

const Button = ({
  size = "sm",
  label = "Button",
  type = "button",
  className = "",
  variant = "primary",
  ...props
}: ButtonProps) => {
  return (
    <BsButton
      type={type}
      className={className}
      variant={variant}
      {...props}
      size={size}
    >
      {label}
    </BsButton>
  );
};
export default Button;
