# Fruit.ai

Fruit.ai is an AI-driven chatbot that provides personalized fruit recommendations tailored to your health needs. Whether you're looking to discover new fruits, understand their nutritional values, or find the perfect fruit for your diet, our chatbot is here to assist.

## Setup and Run Instructions

### Prerequisites

- Node.js 
- npm 
- Python
- pip
- PostgreSQL

### Backend Setup

1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/fruit-ai.git
   cd fruit-ai/server
   ```

2. Create a virtual environment and activate it:
   ```sh
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```

3. Install the required Python packages:
   ```sh
   pip install -r requirements.txt
   ```

4. Set up the PostgreSQL database and update the `DATABASE_URL` in the `.env` file:
   ```sh
   export DATABASE_URL="postgresql://username:password@localhost:5432/fruitai"
   ```

5. Run the backend server:
   ```sh
   flask run
   ```

### Frontend Setup

1. Navigate to the client directory:
   ```sh
   cd ../client
   ```

2. Install the required npm packages:
   ```sh
   npm install
   ```

3. Create a `.env` file in the `client` directory and add the following environment variables:
   ```sh
   VITE_SERVER_URL="http://localhost:5500"
   VITE_GL_API_KEY="your-deepl-api-key"
   ```

4. Run the frontend development server:
   ```sh
   npm run dev
   ```

### Project Structure and Design Decisions

The project is divided into two main parts: the backend and the frontend.

#### Backend
- **Directory**: `server`
- **Framework**: Flask
- **Purpose**: Handles API requests, database interactions, and business logic.

#### Frontend
- **Directory**: `client`
- **Framework**: Vite + React
- **Purpose**: Provides the user interface and communicates with the backend API.

### Design Decisions
- **Separation of Concerns**: The project is split into backend and frontend to ensure a clear separation of concerns, making the codebase more maintainable and scalable.
- **Environment Variables**: Used to manage configuration settings and sensitive information securely.
- **PostgreSQL**: Chosen as the database for its robustness and scalability.
- **Flask**: Selected for the backend due to its simplicity and flexibility.
- **Vite**: Chosen for the frontend for its fast build times and modern development experience.
- **React**: Used for building a dynamic and responsive user interface.
- **API-First Approach**: The backend is designed to serve a RESTful API, allowing for easy integration with various frontend frameworks or even mobile applications in the future.
