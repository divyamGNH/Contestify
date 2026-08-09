# Contestify 🏆

Contestify is a comprehensive mobile application built with React Native and Expo designed for competitive programmers. It helps users discover coding contests, manage their profiles, track problems, and connect with the community.

## 📱 Mobile App Features

Based on the robust mobile architecture, the application offers the following core features:

*   **Authentication & User Profiles**: Secure login and signup flows, with the ability to link and manage competitive programming handles (e.g., Codeforces).
*   **Contest Discovery**: Browse and discover upcoming coding contests across various platforms.
*   **Contest Details & Management**: View detailed information about specific contests. Users can also create and manage their own custom contests (`addContest`, `yourContest`).
*   **Problem Tracking**: Browse coding problems and view detailed problem statements and metadata.
*   **Community & Social**:
    *   **Chat**: Built-in chat functionality to connect with other competitive programmers.
    *   **Blog**: Read and share blog posts related to competitive programming and algorithms.
*   **Dashboard**: A personalized dashboard summarizing your upcoming contests, recent activity, and performance.

## 🛠️ Tech Stack (Mobile)

The mobile application is built using modern React Native practices:

*   **Framework**: [React Native](https://reactnative.dev/) with [Expo](https://expo.dev/)
*   **Routing**: [Expo Router](https://docs.expo.dev/router/introduction/) for file-based navigation.
*   **Styling**: [NativeWind](https://www.nativewind.dev/) (Tailwind CSS for React Native) for beautiful, utility-first styling.
*   **State Management**: [Zustand](https://github.com/pmndrs/zustand) for lightweight and fast global state.
*   **Networking**: [Axios](https://axios-http.com/) for API communication with the backend.
*   **Icons & UI**: Expo Vector Icons, React Native Element Dropdown, React Native SVG.

## 🗂️ Project Structure

The project is structured into logical directories:

*   `/Mobile`: Contains the complete React Native Expo application.
    *   `/Mobile/app`: Contains the file-based routes (Dashboard, Login, Problems, Chat, etc.).
    *   `/Mobile/components`: Reusable UI components.
    *   `/Mobile/backend`: The dedicated backend service (Controllers, Models, Routes) for the mobile app.
    *   `/Mobile/Store`: Zustand state management stores.
    *   `/Mobile/hooks`: Custom React hooks.
    *   `/Mobile/styles`: Global styles and NativeWind configuration.
*   `/web`: Contains the React + Vite web application (if applicable).

## 🚀 Getting Started

### Prerequisites

*   Node.js (LTS recommended)
*   npm or yarn
*   [Expo CLI](https://docs.expo.dev/get-started/installation/)

### Installation & Running (Mobile)

1.  **Clone the repository** (if you haven't already).
2.  **Navigate to the Mobile directory**:
    ```bash
    cd Mobile
    ```
3.  **Install dependencies**:
    ```bash
    npm install
    ```
4.  **Set up environment variables**:
    Create a `.env` file in the `Mobile` directory based on required variables (e.g., `IP` for local backend).
5.  **Start the Expo development server**:
    ```bash
    npx expo start
    ```
6.  **Run the App**:
    *   Press `a` to open in an Android Emulator.
    *   Press `i` to open in an iOS Simulator.
    *   Scan the QR code with the Expo Go app on your physical device.

## 🔧 Backend Setup

The mobile application relies on its backend (located in `/Mobile/backend`). Make sure to:
1. Navigate to the backend folder.
2. Install backend dependencies (`npm install`).
3. Set up the necessary database connections.
4. Run the backend server (`npm run start` or `node server.js`).

---
*Built with ❤️ for the Competitive Programming Community.*
