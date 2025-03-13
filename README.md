# Reminder REST API

Welcome to the Reminder REST API! This API allows users to manage reminders by creating, retrieving, updating, and deleting them. Below, you'll find information on how to set up and use the API.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 14 or higher)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Mahesh5726/reminder-restapi.git
   cd reminder-restapi/boron
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

## Usage

1. **Start the server:**

   ```bash
   npm start
   ```

   By default, the server runs on `http://localhost:3000`.

2. **Access the API:**

   You can interact with the API using tools like [Postman](https://www.postman.com/) or [curl](https://curl.se/).

## API Endpoints

### 1. Get All Reminders

- **Endpoint:** `GET /reminders`
- **Description:** Retrieves a list of all reminders.
- **Response:**
  - `200 OK`: Returns an array of reminder objects.

### 2. Get a Reminder by ID

- **Endpoint:** `GET /reminders/:id`
- **Description:** Retrieves a reminder by its ID.
- **Parameters:**
  - `id` (string): The ID of the reminder.
- **Response:**
  - `200 OK`: Returns the reminder object.
  - `404 Not Found`: If the reminder is not found.

### 3. Create a New Reminder

- **Endpoint:** `POST /reminders`
- **Description:** Creates a new reminder.
- **Request Body:**
  - `title` (string): The title of the reminder.
  - `description` (string, optional): The description of the reminder.
  - `dueDate` (string, optional): The due date in `YYYY-MM-DD` format.
- **Response:**
  - `201 Created`: Returns the created reminder object.

### 4. Update a Reminder

- **Endpoint:** `PUT /reminders/:id`
- **Description:** Updates an existing reminder.
- **Parameters:**
  - `id` (string): The ID of the reminder.
- **Request Body:**
  - `title` (string, optional): The new title.
  - `description` (string, optional): The new description.
  - `dueDate` (string, optional): The new due date in `YYYY-MM-DD` format.
  - `isCompleted` (boolean, optional): Completion status.
- **Response:**
  - `200 OK`: Returns the updated reminder object.
  - `404 Not Found`: If the reminder is not found.

### 5. Delete a Reminder

- **Endpoint:** `DELETE /reminders/:id`
- **Description:** Deletes a reminder by its ID.
- **Parameters:**
  - `id` (string): The ID of the reminder.
- **Response:**
  - `200 OK`: Confirmation of deletion.
  - `404 Not Found`: If the reminder is not found.

### 6. Get Completed Reminders

- **Endpoint:** `GET /reminders/completed`
- **Description:** Retrieves all reminders marked as completed.
- **Response:**
  - `200 OK`: Returns an array of completed reminder objects.

### 7. Get Reminders Due Today

- **Endpoint:** `GET /reminders/due-today`
- **Description:** Retrieves all reminders that are due today.
- **Response:**
  - `200 OK`: Returns an array of reminders due today.
  - `404 Not Found`: If no reminders are due today.

## Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository.**
2. **Create a new branch:**

   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes and commit them:**

   ```bash
   git commit -m 'Add new feature'
   ```

4. **Push to the branch:**

   ```bash
   git push origin feature/your-feature-name
   ```

5. **Submit a pull request.**

## License

This project is licensed under the MIT License. See the [LICENSE](../LICENSE) file for details.

---

Thank you for using the Reminder REST API! If you have any questions or feedback, please open an issue on the repository.

