# CRUD666 - Node.js PostgreSQL CRUD Application

A simple and robust Node.js Express application utilizing PostgreSQL for CRUD (Create, Read, Update, Delete) operations on an `items` table.

## Features

- **Full CRUD Operations**: Create, read, update, and delete items.
- **Database Auto-reconnection**: Automatically checks and waits for database connection before starting the server.
- **Dynamic SSL Configuration**: Configure SSL connections (e.g., for Supabase or RDS) via the `.env` file.
- **Bulk Data Operations**:
  - **Seed Generator API**: Easily generate 50 random items for testing.
  - **Clear Database API**: Truncate all items and reset ID sequences.
- **Health Check API**: Endpoint to verify database connectivity.
- **Docker Support**: Ready-to-go `Dockerfile` with optimized Node.js slim images and `dumb-init` configuration.

---

## Prerequisites

- [Node.js](https://nodejs.org/) (v20+ recommended)
- [PostgreSQL](https://www.postgresql.org/) database

---

## Installation & Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Configure Environment Variables**:
   Create a `.env` file (or use `.env.local` for local development configurations). Copy and configure the following parameters:
   ```env
   DB_HOST=localhost
   DB_USER=postgres
   DB_PASSWORD=your_password
   DB_PORT=5432
   DB_NAME=crud666
   DB_SSL=false       # Set to true to enable SSL connection (required for Supabase/RDS)
   PORT=3000          # Server port
   ```

3. **Initialize the Database Schema**:
   Run the setup script to drop the existing table, create a new `items` table, and seed initial sample data.
   ```bash
   node setup.js
   ```

4. **Start the Application**:
   ```bash
   node app.js
   ```

---

## API & Route Reference

### Items Management UI
- **`GET /`**: Redirects to `/items`.
- **`GET /items`**: Display list of all items.
- **`GET /items/add`**: Render the form to create a new item.
- **`POST /items/add`**: Submit form details to insert a new item.
- **`GET /items/edit/:id`**: Render form to edit an existing item.
- **`POST /items/edit/:id`**: Submit form details to update an existing item.
- **`GET /items/delete/:id`**: Delete a specific item by ID.

### Bulk & Utility APIs
- **`GET /items/generate`**: **[NEW]** Generates 50 random items with simulated product names, prices, quantities, and status, then redirects to `/items`.
- **`GET /items/clear`**: **[NEW]** Deletes all items from the table and resets the auto-increment primary key ID to `1`, then redirects to `/items`.
- **`GET /health`**: Returns the health status of the database connection in JSON format.
- **`GET /reset`**: Force-recreates the database table schema (Drops table `items` and recreates it).

---

## Database Schema Reference

The `items` table contains the following columns:

| Column Name | Data Type | Constraints |
| :--- | :--- | :--- |
| `id` | `SERIAL` | `PRIMARY KEY` |
| `name` | `VARCHAR(100)` | `NOT NULL` |
| `description` | `TEXT` | `NOT NULL` |
| `price` | `INTEGER` | `NOT NULL` |
| `quantity` | `INTEGER` | `NOT NULL` |
| `is_active` | `BOOLEAN` | `NOT NULL` |

---

## Running with Docker

You can containerize this application using the provided Docker configuration:

1. **Build the Docker Image**:
   ```bash
   docker build -t crud666 .
   ```

2. **Run the Container**:
   Make sure to pass the appropriate environment variables:
   ```bash
   docker run -p 3000:3000 --env-file .env crud666
   ```
