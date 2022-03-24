import React from "react";
import { Form } from "react-bootstrap";
import "./SelectBox.css";

interface option {
  id: string | number;
  value: string | number;
}
interface SelectBoxProps {
  options: option[];
  label: string;
  error?: string;
  hasError?: boolean;
  register?: any;
  defaultValue?: any;
  size?: "sm" | "md" | "lg";
}
export default function SelectBox({
  options,
  label,
  error,
  hasError,
  register,
  defaultValue,
  size = "md",
  ...props
}: SelectBoxProps) {
  return (
    <Form.Group className="mb-3 bs_selectbox">
      <Form.Label>{label}</Form.Label>
      <Form.Select
        {...register}
        {...props}
        defaultValue={defaultValue}
        size={size}
      >
        {options.map((option) => (
          <option value={option.id}> {option.value}</option>
        ))}
      </Form.Select>
      {hasError && (
        <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
      )}
    </Form.Group>
  );
}
