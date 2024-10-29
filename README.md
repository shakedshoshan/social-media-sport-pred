# Social Media Sport Prediction App

This project is a comprehensive social media platform focused on sports predictions. It allows users to engage with sports events by making predictions, joining groups, and interacting with other users through posts, comments, and chat. The website also show PreGame information (by scraping) to help user to make their guess.

## Features

- **User Authentication**: Secure login and signup using JWT-based authentication, ensuring user data privacy and security.
- **Post Creation**: Users can create posts with content and predictions, sharing their insights and opinions on sports events.
- **Group Management**: Users can create and join groups using unique secret codes, fostering community interaction and engagement.
- **Event Predictions**: Users can make predictions on sports events, view others' predictions, and track their prediction history.
- **Chat**: Group chat functionality allows users to communicate, enhancing the interactive experience.
- **User Profiles**: Users can view and manage their profiles, including followers and following lists, and see their activity history.
- **Responsive Design**: The application is optimized for both desktop and mobile devices, ensuring a seamless user experience across platforms.
- **Web Scraping**: Utilizes web scraping to gather and display sports event data, providing users with up-to-date information.
- **Caching with Redis**: Implements Redis for caching frequently accessed data, improving application performance and reducing load times.

## Tech Stack

- **Frontend**: 
  - **React**: A JavaScript library for building user interfaces.
  - **Vite**: A fast build tool and development server for modern web projects.
  - **Tailwind CSS**: A utility-first CSS framework for rapid UI development.

- **Backend**: 
  - **Node.js**: A JavaScript runtime built on Chrome's V8 JavaScript engine.
  - **Express**: A minimal and flexible Node.js web application framework.
  - **PostgreSQL**: A powerful, open-source object-relational database system.

- **State Management**: 
  - **Zustand**: A small, fast, and scalable state management solution for React.

- **Caching**: 
  - **Redis**: An in-memory data structure store used as a database, cache, and message broker.

- **Web Scraping**: 
  - **Cheerio**: A fast, flexible, and lean implementation of core jQuery designed specifically for the server.

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/social-media-sport-pred.git
   cd social-media-sport-pred
   ```

2. **Install dependencies**:
   - For the frontend:
     ```bash
     cd frontend
     npm install
     ```
   - For the backend:
     ```bash
     cd backend
     npm install
     ```

3. **Environment Variables**:
   - Create a `.env` file in the `backend` directory and configure your database, Redis, and other environment variables.

4. **Run the application**:
   - Start the backend server:
     ```bash
     npm run dev
     ```
   - Start the frontend development server:
     ```bash
     cd frontend
     npm run dev
     ```

## Usage

- Navigate to `http://localhost:5173` to access the application.
- Sign up or log in to start using the platform.
- Explore events, make predictions, join groups, and interact with other users.
