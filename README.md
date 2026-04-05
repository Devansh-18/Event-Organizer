# EventPost - Event Requirement Management System

EventPost is a modern web application designed to streamline the process of posting and managing event requirements. Whether you're looking for event planners, performers, or crew members, EventPost provides a seamless, multi-step interface to capture all the necessary details and a organized listings page to browse all requirements.

## Live Demo

- **Frontend:** [https://event-organizer-o7jx.vercel.app/](https://event-organizer-o7jx.vercel.app/)
- **Backend (API):** [https://event-organizer-ih22.onrender.com](https://event-organizer-ih22.onrender.com)

---

## Features

- **Multi-Step Form:** A user-friendly, step-by-step form to post requirements with real-time validation.
- **Form Persistence:** Progress is automatically saved to local storage, allowing users to refresh or return later without losing data.
- **Category-Specific Details:** Dynamic form fields that change based on whether you're hiring an Event Planner, Performer, or Crew member.
- **Requirement Listings:** A centralized page to browse, search, and filter all posted event requirements.
- **Modern UI/UX:** Built with a clean, responsive design using Tailwind CSS and Lucide icons.
- **Robust Backend:** Secure and scalable API built with Node.js, Express, and MongoDB.

---

## Tech Stack

- **Frontend:** Next.js, Tailwind CSS, React Hook Form, Axios, Lucide-React.
- **Backend:** Node.js, Express, MongoDB, Mongoose, Cors, Dotenv.
- **State Management:** React Context API (for multi-step navigation) and React Hook Form (for form state).

---

## Local Setup

### Prerequisites

- Node.js (v18 or later recommended)
- npm or yarn
- MongoDB (Local or Atlas)

### 1. Clone the repository
```bash
git clone <repository-url>
cd "Event Organizer"
```

### 2. Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend` folder and add the following variables:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   FRONTEND_URL=http://localhost:3000
   FRONTEND_URL_PROD=your_production_frontend_url
   ```
4. Start the backend server:
   ```bash
   npm run dev
   ```
   The server will start on `http://localhost:5000`.

### 3. Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `frontend` folder and add the following variable:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   ```
4. Start the frontend development server:
   ```bash
   npm run dev
   ```
   The application will be accessible at `http://localhost:3000`.

---

## Project Structure

- `/frontend`: Next.js application containing all UI components, pages, and API integration.
- `/backend`: Express server handling data persistence and API routes.
- `/backend/models`: Mongoose schemas for data structure.
- `/backend/controllers`: Logical handlers for API requests.
- `/frontend/app/components/forms`: Refactored, modular multi-step form system.

---

## License

This project is licensed under the ISC License.
