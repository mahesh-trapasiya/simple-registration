import React from "react";
import { Form } from "react-bootstrap";
import "./TextBox.css";

interface TextBoxProps {
  type: string;
  placeholder?: string;
  label: string;
  error?: string;
  hasError?: boolean;
  isRequired?: boolean;
  register?: any;
  size?: "sm" | "md" | "lg";
  className?: string;
}
export default function TextBox({
  type,
  placeholder,
  label,
  error,
  hasError,
  isRequired = false,
  register,
  size = "md",
  className = "",
  ...props
}: TextBoxProps) {
  return (
    <Form.Group className="mb-3 bs_textbox">
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type={type}
        placeholder={placeholder}
        isInvalid={hasError}
        required={isRequired}
        size={size}
        className={className}
        {...register}
        {...props}
      />
      <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
    </Form.Group>
  );
}
