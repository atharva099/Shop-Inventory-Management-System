# Shop Inventory Management System

A full-stack web application developed using **ReactJS, Java, Spring Boot, and MySQL** to help shop owners manage their inventory records.

The application provides a simple interface for managing product categories, suppliers, and products through CRUD (Create, Read, Update, Delete) operations.

## Technologies Used

**Frontend**
- ReactJS
- JavaScript
- HTML
- CSS
- Axios

**Backend**
- Java
- Spring Boot
- Spring Data JPA
- REST APIs
- Maven

**Database**
- MySQL

**Development and Testing Tools**
- Visual Studio Code
- MySQL Workbench
- Postman
- Git and GitHub

## Features

### 1. Category Management
- Add new categories
- View existing categories
- Update category details
- Delete categories

### 2. Supplier Management
- Add new suppliers
- View supplier records
- Update supplier information
- Delete suppliers

### 3. Product Management
- Add new products
- View product records
- Update product information
- Delete products

## Project Architecture

The application follows a layered architecture.

**ReactJS → REST Controller → Service → Repository → MySQL**

1. ReactJS provides the user interface.
2. Axios sends HTTP requests to the Spring Boot backend.
3. The Controller receives and handles API requests.
4. The Service layer handles application logic.
5. The Repository layer performs database operations using Spring Data JPA.
6. MySQL stores the application data.
7. The backend returns responses to the frontend.

## CRUD Operations

| Operation | HTTP Method | Purpose |
|---|---|---|
| Create | POST | Add new records |
| Read | GET | Retrieve existing records |
| Update | PUT | Modify existing records |
| Delete | DELETE | Remove records |

These operations are implemented for Category, Supplier, and Product modules.

## Project Structure

```text
Shop-Inventory-Management-System/
|
|-- backend/
|   |-- src/
|   |   |-- main/
|   |   |   |-- java/com/shop/inventory/
|   |   |   |   |-- controller/
|   |   |   |   |-- entity/
|   |   |   |   |-- repository/
|   |   |   |   |-- service/
|   |   |   |-- resources/
|   |   |       |-- application.properties
|   |-- pom.xml
|
|-- frontend/
|   |-- public/
|   |-- src/
|   |   |-- components/
|   |   |   |-- Category.js
|   |   |   |-- Supplier.js
|   |   |   |-- Product.js
|   |   |-- App.js
|   |   |-- Inventory.css
|   |-- package.json
|
|-- README.md
```

## How to Run the Project

### Prerequisites

- Java 17
- Maven
- Node.js and npm
- MySQL

### 1. Set Up the Database

Create a MySQL database:

```sql
CREATE DATABASE shop_inventory_db;
```

Configure the database connection in `backend/src/main/resources/application.properties`.

The application uses the `DB_PASSWORD` environment variable for the MySQL password. Set this variable in your local environment before starting the backend.

### 2. Start the Backend

Open a terminal in the `backend` directory and run:

```powershell
.\mvnw.cmd spring-boot:run
```

The backend runs at:

`http://localhost:8080`

### 3. Start the Frontend

Open another terminal in the `frontend` directory and run:

```bash
npm install
npm start
```

The frontend runs at:

`http://localhost:3000`

Ensure that the MySQL database and Spring Boot backend are running before using the application.

## API Testing

Postman was used to test the backend REST APIs before integrating them with ReactJS.

The CRUD operations for Category, Supplier, and Product were tested using GET, POST, PUT, and DELETE requests.

## Project Purpose

This project was developed to gain practical experience in full-stack Java development, REST API integration, database operations, and connecting a ReactJS frontend with a Spring Boot backend.

## Author

**Atharva Wadgaonkar**

- GitHub: https://github.com/atharva099
- LinkedIn: https://linkedin.com/in/atharva-wadgaonkar-b11195334
