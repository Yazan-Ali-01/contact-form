import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Container, Row, Col, Form, Spinner } from 'react-bootstrap';
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-toastify";
import "./contactForm.scss";
import { submitForm } from "../../services/apiService";
import { FormField } from "./components/FormField";

// Define the schema using zod
const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(1, "Message is required")
});

function ContactForm() {
  const [loading, setLoading] = useState(false);
  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(schema)
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await submitForm(data);
      toast.success("Form Submitted Successfully");
      reset();
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error("Failed to submit form");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (errors) {
      Object.keys(errors).forEach((field) => {
        toast.error(errors[field]?.message);
      });
    }
  }, [errors]);

  return (
    <Container fluid>
      <div className="gradient-background"></div>

      <Row className="justify-content-center">
        <Col md={10} className="p-4">
          <div className="contact-wrap p-4 rounded-4">
            <h3 className="mb-4 text-white">Send us a message</h3>
            <Form onSubmit={handleSubmit(onSubmit)} className="contactForm">
              {["name", "email", "subject", "message"].map((field, index) => (
               <FormField key={index} field={field} control={control} errors={errors} />
              ))}
              <button type="submit" className="cs-btn btn-custom" disabled={loading}>
                {loading ? (
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                ) : (
                  'Send Message'
                )}
              </button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default ContactForm;
