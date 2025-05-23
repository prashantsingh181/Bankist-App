# 💰 Bankist App

Bankist is a small responsive banking application built using vanilla JavaScript. It offers basic banking features such as login, checking balance and transaction history, requesting loans, sending money to other users, and closing accounts. Sorting functionality for transaction movements is also implemented.

<img width="1440" alt="Bankist App Preview" src="https://github.com/user-attachments/assets/bb044289-8617-4253-939d-aedba3c920d2" />

## ✨ Features

- ✅ Login and session-based access
- 💸 Check current balance and transaction history
- 💳 Transfer money to other users
- 🧾 Request a loan with simple eligibility criteria
- ❌ Close account with credential validation
- 🔃 Sort movements by amount
- ⏱️ Auto logout after 10 minutes of inactivity
- 📱 Fully responsive UI for both desktop and mobile

## 🚀 Live Preview

👉 [Click here to view the live app](https://prashantsingh181.github.io/Bankist-App/)

## 🧠 JavaScript Concepts Used

This project demonstrates a wide range of JavaScript features and best practices:

### ✅ Modules and Imports
- Uses ES6 module system with `import`/`export` for clean separation of data and logic.

### 🔒 Strict Mode
- Enabled with `'use strict'` to enforce safer JavaScript practices.

### 🗃️ DOM Manipulation
- Dynamically updates UI using `querySelector`, `innerHTML`, `insertAdjacentHTML`, and more.

### 🧮 Array Methods
- Employs `map`, `reduce`, `filter`, `find`, `some`, `every`, and `sort` for working with account and movement data.

### 🗓️ Date Handling
- Formats and displays dates using `Date` and `toLocaleString()`.

### 🌐 Session Storage
- Uses `sessionStorage` to persist user session data across reloads.

### 🧾 Form Handling
- Processes form submissions with `FormData` and `Object.fromEntries()` for robust input handling.

### ⚠️ Error Handling
- Safely handles invalid user data and session restoration via `try...catch`.

### 🧮 Formatting and Localization
- Formats currency using `Intl.NumberFormat` with proper decimal and currency options.

### 🕒 Timers and Auto Logout
- Implements a session timer using `setInterval()` for auto logout after inactivity (`SESSION_TIME` constant).

### 🔁 State Management
- Manages app state with global variables like `currentUser`, `sorted`, and `interval`.

### 🔄 UI Update Pipeline
- Central `updateUserUI()` function handles all UI updates to ensure consistent state across views.
