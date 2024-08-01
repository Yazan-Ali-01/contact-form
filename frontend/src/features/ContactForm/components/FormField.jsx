import React from 'react'
import { Form } from 'react-bootstrap'
import { Controller } from 'react-hook-form'

export const FormField = ({ field, control, errors }) => {
  return (
    <Form.Group className="mb-3">
    <Controller
      name={field}
      control={control}
      defaultValue=""
      render={({ field }) => field.name !== "message" ? (
        <Form.Control
          {...field}
          type={field.name === "email" ? "email" : "text"}
          placeholder={field.name[0].toUpperCase() + field.name.slice(1)}
          className="form-control text-white"
          style={{ backgroundColor: 'transparent', borderColor: 'rgba(255, 255, 255, 0.2)' }}
        />
      ) : (
        <Form.Control
          {...field}
          as="textarea"
          rows={6}
          placeholder={field.name[0].toUpperCase() + field.name.slice(1)}
          className="form-control text-white"
          style={{ backgroundColor: 'transparent', borderColor: 'rgba(255, 255, 255, 0.2)' }}
        />
      )}
    />
    {errors[field] && <Form.Text className="text-danger">{errors[field]?.message}</Form.Text>}
  </Form.Group>
  )
}
