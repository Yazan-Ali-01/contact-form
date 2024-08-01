# Contact Us Form - MERN Stack Assessment
This project is a "Contact Us" form developed as part of an assessment to demonstrate skills in backend and frontend development using the MERN stack. The application includes features for users to submit queries and an admin portal to manage these submissions.

## Backend
This project consists of a "Contact Us" form with backend functionalities to store submissions in a MongoDB database and send emails to both the user and the admin. The admin portal allows for viewing, exporting, and managing submissions.

## Features

### Contact Us Form

- **Design**: An impressive design using Bootstrap.
- **Fields**: Name, Email, Subject, and Message.
### Form Submission

- **Data Storage**: Store the submitted data in a MongoDB database.
- **Emails**:

    - *User Email*: Sends a thank you email to the user with the company logo.
    - *Admin Email*: Notifies the admin of the new submission.
### Admin Portal
- **Access**: Predefined credentials for logging in.
- **Features**: 
    - *Submissions Listing*: Data table using Material-UI or Bootstrap with jQuery.
    - *Export to CSV*: Export the data table to a CSV file.
    - *Single Submission View*: View details of each submission and send an email to the user. 
### Settings and Environment Variables
**Configuration**: Separate settings file or environment variables for:
  - Email settings (SMTP configuration)
  - Application theme color (hexadecimal format)

### Installation

- Clone the repository:

      `git clone [repository-url]`

- Navigate to the project directory and install dependencies:

      cd [project-directory]
      npm install
      

- Set up environment variables by creating a .env file in the root directory:
`
    - MONGO_URI=[your_mongo_uri]
    - SMTP_HOST=[your_smtp_host]
    - SMTP_PORT=[your_smtp_port]
    - SMTP_USER=[your_smtp_user]
    - SMTP_PASS=[your_smtp_pass]
    - ADMIN_EMAIL=[admin_email]
    - PORT=[port]
`

### Usage
There are two ways to run the project:
- **Running Locally** :
  Ensure RabbitMQ, MongoDB, and Node.js are installed  and running on your local machine. Set up the .env file as mentioned in the installation section and start the application:
  - Start the server:
  
        npm start
- **Running with Docker**: 
  If you prefer to use Docker, you can start all required services using Docker Compose. This includes the application, MongoDB, and RabbitMQ.
  - Build and start the containers:
      `docker-compose up`
- **Access the application**:

        Contact Us Form: http://localhost:8080
        Admin Portal: http://localhost:8080/admin
The application Backend is accessed via Nginx, which acts as a reverse proxy to the Node.js application running on port 3000.


## Real-World Considerations

  ### **If this were a real-world project, the following improvements would be made**:

- Implement real-world authentication instead of mock credentials.
- Use an enterprise-level process manager (e.g., PM2) for better management.
- Deploy with Kubernetes for container orchestration.
- Adopt Domain-Driven Design (DDD) instead of the MVC pattern for better scalability and maintainability.
- Include Swagger or Postman documentation for API endpoints.
- Implement automation testing, including unit tests for critical components.
- Develop production-level Docker files instead of the current simple development ones.

## Frontend

### Technologies Used
- **React.js**: A JavaScript library for building user interfaces.
- **Vite**: A build tool that provides a fast development environment.
- **Bootstrap**: A CSS framework for responsive design.
- **React Bootstrap**: Bootstrap components built with React.
- *Material UI*: A popular React UI framework for design consistency.

##  Installation


- Navigate to the frontend directory:

      `cd [project-directory]/frontend`

- Navigate to the project directory and install dependencies:

      
      npm install
      

- Set up environment variables by creating a .env file in the root directory:
```
    -VITE_API_URL=http://localhost:8080/api
    -VITE_PRIMARY_COLOR='#ff4081'
    -VITE_SECONDARY_COLOR='#f50057'
    -VITE_BACKEND_URL=http://localhost:8080
```


## Potential Enhancements
If more time were available, the following enhancements would be made:

- **Dockerization**: Dockerizing the frontend application for consistent development and production environments**.
- **Bundling**: Implementing advanced bundling techniques with tools like Webpack to optimize the build size and performance.
- **UI Customization**: Providing more customization options in the UI for better user experience and branding alignment.
- **Accessibility Improvements**: Ensuring the application is fully accessible, adhering to WCAG guidelines.

