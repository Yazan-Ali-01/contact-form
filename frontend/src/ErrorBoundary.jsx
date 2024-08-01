import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Alert, Container, Row, Col } from 'react-bootstrap';

function ErrorBoundary({ children }) {
  const [errorState, setErrorState] = useState({ hasError: false, error: null, errorInfo: null });

  // Function to handle errors, similar to what getDerivedStateFromError + componentDidCatch would do
  const handleError = (error, errorInfo = null) => {
    console.error("ErrorBoundary caught an error", error, errorInfo);
    setErrorState({ hasError: true, error, errorInfo });
  };

  // Example trigger for errors (This should be integrated where actual errors are caught, e.g., in event handlers or effects)
  const simulateError = () => {
    try {
      // Simulate an error
      throw new Error('Simulated error');
    } catch (error) {
      handleError(error, { componentStack: 'simulated stack trace' });
    }
  };

  if (errorState.hasError) {
    return (
      <Container className="d-flex flex-column align-items-center justify-content-center min-vh-100">
        <Row className="w-100">
          <Col>
            <Alert variant="danger" className="text-center">
              <Alert.Heading>Error!</Alert.Heading>
              <p>An unexpected error has occurred. Please try again later.</p>
            </Alert>
          </Col>
        </Row>
        <Row className="w-100">
          <Col>
            <details style={{ whiteSpace: 'pre-wrap' }}>
              <summary>Details</summary>
              {errorState.error && errorState.error.toString()}
              {errorState.errorInfo && <div>{errorState.errorInfo.componentStack}</div>}
            </details>
          </Col>
        </Row>
      </Container>
    );
  }

  return children;
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired
};

export default ErrorBoundary;
