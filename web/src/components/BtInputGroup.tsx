import React from "react";
import { Form } from "react-bootstrap";

interface BtInputGroupProps {
  title: string;
}

export const BtInputGroup: React.FC<BtInputGroupProps> = (
  { ...props },
  { title }
) => {
  return (
    <Form.Group>
      <Form.Label>{title}</Form.Label>
      <Form.Control {...props} />
    </Form.Group>
  );
};
