🍔 Student-Canteen Management System
A high-performance, modern management dashboard for school or college canteens. This application allows administrators to track student accounts, manage a live snack menu, and process orders with a high-contrast, premium UI. Built with a focus on Fluid UX, Smooth Performance, and Hybrid Data Persistence.

🚀 Features
Student Directory: Manage member profiles with unique auto-generated referral codes and lifetime spend tracking.

Live Menu & Ordering: A sleek snack menu featuring real-time quantity selection and order placement via interactive modals.

Data Persistence: Uses a hybrid strategy combining LocalStorage for immediate browser persistence and JSON Server for a mock-backend database.

Premium UX:

Smooth Scrolling: Global smooth-scroll behavior for a fluid navigation experience.

Lazy-Loaded Menu: IntersectionObserver implementation for high-performance image loading and fade-in animations.

Responsive Design: Fully optimized for mobile, tablet, and desktop views using Tailwind CSS 4.

Toast Notifications: Real-time feedback for successful orders, profile creations, and deletions using react-hot-toast.

🛠️ Libraries & Tech Stack
This project leverages the latest frontend tools for a fast and reliable experience:

React 19: Core framework for component-based UI development.

Vite: Ultra-fast build tool and development server.

Tailwind CSS 4: Utility-first styling with advanced high-contrast color palettes.

React Router Dom (v7): Handling client-side routing and dynamic parameter retrieval.

React Hook Form: Efficient, performant form handling for student registration.

JSON Server: To simulate a REST API for persistent data storage in a local environment.

💾 Mock Data Approach
The application is designed to be fully functional without a complex database setup:

JSON Server: Acts as a mock backend. It reads and writes to src/data/data.json, ensuring student records and spending totals are preserved across sessions.

LocalStorage Sync: Order history and state snapshots are synchronized with the browser's LocalStorage. This ensures that even if the server is offline, the user’s recent activity remains visible upon refresh.

Context API: Global state is managed using useReducer to handle complex logic, such as updating a student's total spend automatically when a new order is placed.

