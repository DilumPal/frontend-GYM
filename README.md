# FitNova - Frontend 🏋️‍♂️💪

FitNova is a modern, high-performance e-commerce platform dedicated to selling premium gym equipment. Built with **React** and **Vite**, the frontend offers an ultra-fast, smooth, and fully mobile-responsive shopping experience featuring a clean, modern user interface.

🌐 **Frontend Repository:** [https://github.com/DilumPal/frontend-GYM](https://github.com/DilumPal/frontend-GYM)  
🖥️ **Backend Repository:** [https://github.com/DilumPal/backend-GYM](https://github.com/DilumPal/backend-GYM)

---

## 🌟 Key Features

- **Clean & Modern UI:** Designed with a sleek aesthetic, optimized for user engagement and smooth navigation.
- **Fully Mobile Responsive:** Flawless user experience across all devices (desktops, tablets, and mobile phones).
- **Advanced Product Search & Filtering:** Quick search capabilities with organized item categorization.
- **Live Reviews:** Real-time customer product reviews to enhance user interactivity.
- **Live Bet/Auction Sales:** Unique live bidding/selling module for exclusive gym gear.
- **Secure Authentication:** Integrated with Google OAuth and custom JWT-based user authentication.
- **Interactive Admin Dashboard:** Comprehensive interface for admins to manage products, users, and orders seamlessly.
- **Optimized Media Uploads:** Utilizes **Supabase Storage** for lightning-fast, secure product image uploads and hosting.

---

## 🛠️ Tech Stack

- **Framework:** React.js (Vite template)
- **Styling:** Tailwind CSS / Modern CSS (with smooth interactive effects)
- **State Management:** React Context API
- **Authentication:** Google OAuth & JWT
- **Cloud Storage Integration:** Supabase Client (for direct, secure image handling)
- **HTTP Client:** Axios

---

## 📐 Project Structure & Architecture

The codebase follows a modular design pattern to enforce **Separation of Concerns (SoC)**. This keeps the application scalable, maintainable, and easy to collaborate on.

```text
src/
├── assets/          # Static media (logos, default placeholders, icons)
├── components/      # Reusable, atomic UI components (Buttons, Navbar, Glass containers)
├── context/         # Global state management & Authentication providers
├── pages/           # Dedicated view layouts (Home, Shop, Admin Dashboard, LiveBet)
├── services/        # Centralized API handling (Axios interceptors & configurations)
├── utils/           # Shared utility logic (Formatters, validators, helper functions)
├── App.jsx          # Core routing, route guards, and layout wrappers
└── main.jsx         # Application initialization and DOM mounting point