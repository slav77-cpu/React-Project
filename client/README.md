# CarHub – React Car Marketplace

CarHub is a Single Page Application built with React for the React.js course at SoftUni.  
It represents a small car marketplace where users can browse car listings, see details, and manage their own cars.

## 🧩 Features

### Public Area
- Home page with latest 3 added cars
- Cars catalog page (`/cars`) – list of all cars
- Car details page (`/cars/:carId`)

### Private Area
- User authentication (login / register / logout)
- Create car (`/create`)
- Edit car (`/cars/:carId/edit`)
- Delete car (only by the owner)
- Owner-only actions visible only to the creator of the car record

> Guests can browse the catalog and the details page, but **cannot** create / edit / delete cars.

## 🛠 Tech Stack

- React + React Router
- Context API (AuthContext) for authentication state
- React Hooks: `useState`, `useEffect`, `useContext`, `useReducer` (if used)
- Tailwind CSS for styling
- Custom request helper for HTTP calls
- SoftUni Practice Server (REST API, collection: `/data/cars`)

## 🧱 Architecture

