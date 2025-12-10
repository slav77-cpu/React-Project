# CarHub – React Car Marketplace

CarHub is a Single Page Application built with React for the React.js course at SoftUni.  
It represents a small car marketplace where users can browse car listings, see details, and manage their own cars.

## Public Area

- Home page displaying the latest 3 added cars

- Cars catalog page (/cars) – list of all car listings

- Car details page (/cars/:carId)

- View comments and likes count

- Responsive and modern UI

## Private Area (Authenticated Users)

- Login / Register / Logout

- Create car listing (/create)

- Edit car (/cars/:carId/edit)

- Delete car (only for the owner)

- Like system – users can like other people's cars

- Comments system – users can post comments on any car

- Personal Profile page (/profile)

- Shows my created cars

- Shows my liked cars

- Route Guards

- Guests cannot access Create, Edit, Profile, etc.

- Logged-in users cannot access Login/Register pages

- Guests can browse everything but cannot create, edit, delete, like or comment.

## Tech Stack

-  React 18

- React Router

- Context API for global auth state

- React Hooks:
- useState, useEffect, useContext, useReducer (if used), useNavigate, useParams

- Tailwind CSS for styling

- SoftUni Practice Server as backend (REST API)

- Custom request() wrapper for all HTTP operations
(automatic token injection, error handling, JSON parsing)
## Architecture 
src/
 │ App.jsx
 │ main.jsx
 │
 ├── components/
 │   ├── home/
 │   ├── auth/
 │   ├── cars/
 │   ├── car-card/
 │   ├── common/
 │   └── profile/
 │
 ├── context/
 │   └── authContext.jsx
 │
 ├── guards/
 │   ├── GuestGuard.jsx
 │   └── PrivateGuard.jsx
 │
 ├── services/
 │   ├── authService.js
 │   ├── likeService.js
 │   └── commentService.js
 │
 └── utils/
     └── request.js

- Clean separation of concerns: components, services, guards, context

- Reusable CarCard component

- Profile page that loads:

1.user-owned cars

2.liked cars via load= relation

- Fully responsive layout
## CRUD Operations

- Car records support full CRUD via REST:

- Create – POST /data/cars

- Read – GET /data/cars, /data/cars/:id

- Update – PUT /data/cars/:id

- Delete – DELETE /data/cars/:id

- Only the owner can Edit/Delete.

### Interaction System
## Likes

- A user can like each car only once

- Owner cannot like their own listing

- Likes counter updates live

## Comments

- Logged-in users can leave comments

# Comments show:

- author email

- timestamp

- message content

### Error Handling & Validation

- Form validation on Login/Register/Create/Edit

## Prevents:

- invalid numbers

- wrong formats

- empty fields

- posting while not authenticated

- Proper error messages from the Practice Server are displayed

### Additional Pages

- Profile

- 404 Not Found

- Background visuals & modern UI