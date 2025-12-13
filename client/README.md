# CarHub – React Car Marketplace

CarHub is a Single Page Application built with React for the React.js course at SoftUni.  
It represents a small car marketplace where users can browse car listings, see details, and manage their own cars.

##  Features

### Public Area

- Home page with the latest 3 added cars  
- Cars catalog page (`/cars`) – list of all cars  
- Car details page (`/cars/:carId`) – full information for a single car  
- 404 Not Found page for invalid routes  

Guests can freely browse the catalog and details.

### Private Area (Authenticated Users)

- User authentication: **login / register / logout**
- Create car (`/create`)
- Edit car (`/cars/:carId/edit`)
- Delete car – **only by the owner**
- Owner-only actions (Edit / Delete buttons visible only for the creator)
- **Like** functionality:
  - Logged-in non-owner users can like a car once
  - Total likes are displayed on the details page
- **Comments**:
  - Logged-in users can add comments to cars
  - Comments show author email and creation date
- **Profile page** (`/profile`):
  - Shows cars created by the current user
  - Shows cars liked by the current user

> Guests can browse the catalog and the details page, but **cannot** create, edit, delete, like or comment.

---

##  Tech Stack

- **React** (functional components)
- **React Router** (client-side routing)
- **Context API** – `AuthContext` for authentication state
- **React Hooks**:
  - `useState` – local component state (forms, loading, likes, comments, etc.)
  - `useEffect` – data fetching and lifecycle logic
  - `useContext` – consuming `AuthContext`
  - `useNavigate`, `useParams` – navigation and route params
- **Tailwind CSS** – styling and layout
- Custom **request helper** for HTTP calls (`fetch` wrapper)
- **SoftUni Practice Server** (REST API)  
  - Collections:
    - `/users` – authentication
    - `/data/cars` – car records
    - `/data/likes` – likes per car
    - `/data/comments` – comments per car

---

##  Architecture

The project is split into logical modules:

- `src/App.jsx`  
  - Main application component  
  - Defines all routes with `Routes` / `Route`  
  - Wraps protected routes with **route guards**:
    - `GuestGuard` – only for guest users (e.g. `/login`, `/register`)
    - `PrivateGuard` – only for authenticated users (e.g. `/create`, `/cars/:carId/edit`, `/profile`)

- `src/context/authContext.jsx`  
  - Holds the logged-in user state  
  - Exposes `login`, `register`, `logout`, `isAuthenticated`, `user`  
  - Uses `localStorage` to persist the auth data  
  - Wraps the entire app with `<AuthProvider>` so all components can access `AuthContext`

- `src/services/`  
  - `authService.js` – login, register, logout requests to the Practice Server  
  - `likeService.js` – get likes count, check if user liked a car, add like  
  - `commentService.js` – load comments for a car, add new comment  
  - These services use the common `request` helper.

- `src/utils/request.js`  
  - Small wrapper around `fetch`  
  - Adds JSON headers, parses the response, throws errors on non-OK status  
  - Automatically attaches `X-Authorization` header if there is a token in `localStorage`

- `src/components/`  
  - `home/`
    - `Header.jsx` – main navigation bar  
      - Shows different links for guests vs logged-in users  
      - Displays logged-in user email and Logout button  
    - `Home.jsx` – landing page, shows latest 3 cars using `CarCard`  
  - `cars/`
    - `CarsCatalog.jsx` – lists all cars from `/data/cars`  
    - `CarDetails.jsx` – car details page, likes, comments, owner actions  
    - `CarCreate.jsx` – bound form for creating a car (with validation)  
    - `CarEdit.jsx` – bound form for editing an existing car (with validation)  
  - `car-card/`
    - `CarCard.jsx` – reusable card component for displaying a single car in grids (Home, Catalog, Profile)
  - `auth/`
    - `Login.jsx` – login form with validation and error messages  
    - `Register.jsx` – register form with password confirmation and validation
  - `profile/`
    - `Profile.jsx` – shows “My cars” and “Liked cars” for the current user
  - `common/`
    - `NotFound.jsx` – 404 page

- `src/guards/`
  - `GuestGuard.jsx` – redirects authenticated users away from login/register pages  
  - `PrivateGuard.jsx` – protects private routes; redirects guests to login

---

## 🔐 Routing & Route Guards

Defined routes (React Router):

- `/` – Home (public)
- `/cars` – Catalog (public)
- `/cars/:carId` – Car details (public)
- `/login` – Guest-only
- `/register` – Guest-only
- `/create` – Private (only logged-in users)
- `/cars/:carId/edit` – Private + owner-only action in UI
- `/profile` – Private (only logged-in users)
- `*` – 404 Not Found

Route guards:

- **GuestGuard** – wraps `/login` and `/register`  
  - If the user is **logged in**, redirects to Home.

- **PrivateGuard** – wraps `/create`, `/cars/:carId/edit`, `/profile`  
  - If the user is **not logged in**, redirects to Login.

---

##  Validation & Error Handling

- **Forms** are fully controlled (bound inputs using `useState`)
- **Create / Edit car**:
  - Numeric fields (`year`, `horsepower`, `price`) are validated:
    - Only numbers
    - Minimum and maximum limits where appropriate
  - Brand / model must be non-empty text
  - Image URL must be non-empty
  - Displays error messages to the user when invalid
- **Login / Register**:
  - Required fields: email, password
  - Email format validation
  - Password length validation
  - Password confirmation on register
- All HTTP calls go through `request.js` and handle:
  - Non-OK responses
  - 204 No Content
  - Display alerts or inline error messages

---

##  React Concepts Used

- **Stateless & stateful components**  
  - Presentation-only components (`CarCard`, `NotFound`)  
  - Stateful components (`CarDetails`, `CarCreate`, `Login`, `Profile`)

- **Hooks**:
  - `useState` – managing form values, loading states, likes count, comments, etc.
  - `useEffect` – fetching data on mount and on parameter change (e.g. `carId`)
  - `useContext` – accessing auth state from `AuthContext`
  - `useNavigate` – redirecting after login, create, edit, delete, logout
  - `useParams` – reading route parameters like `carId`

- **Context API**:
  - `AuthContext` shares auth state and actions across the whole app

- **Synthetic events & bound forms**:
  - `onChange`, `onSubmit` events on forms
  - All inputs controlled via component state (two-way binding)

- **Component lifecycle**:
  - `useEffect` demonstrates mount / update / cleanup patterns
  - Examples: loading cars in catalog, details, profile, etc.

- **Styling**:
  - Tailwind CSS utility classes
  - Background image from `/public/images/background.png`
  - Responsive layout (Home, Catalog, Profile)

---
