# Frontend Setup

## 1. Project Overview

This is the frontend for our project, built using **Vite**.

## 2. Prerequisites

Before setting up the project, ensure you have:

- **Node.js** (Download from [nodejs.org](https://nodejs.org/))
- you can check if you have node.js or not by typing:
  ```sh
  node -v
  ```

## 3. Setting Up the Project

1. **Install Dependencies**

   ```sh
   cd frontend
   npm install
   ```

2. **Run the Development Server**
   ```sh
   npm run dev
   ```
   This will start the project and provide a local URL (e.g., `http://localhost:5173`). Open it in your browser.

## 4. Understanding the Project Structure

- **`src/`** → Contains all React components, styles, and logic.
- **`public/`** → Static assets like images and icons.
- **`vite.config.js`** → Vite configuration for the project.
- **`package.json`** → Defines dependencies and available commands.

## 5. Making Changes

1. **Modify or add files** inside the `src/` directory.
2. **Run the Project Locally** (use `npm run dev` to test changes).

## 6. Adding a New Page or Component

### Adding a New Component

1. Inside `src/components/`, create a new file, e.g., `MyComponent.jsx`.
2. Define your component:
   ```jsx
   function MyComponent() {
     return <div>Hello, this is MyComponent!</div>;
   }
   export default MyComponent;
   ```
3. Import and use it inside `App.jsx`:
   ```jsx
   import MyComponent from "./components/MyComponent";
   function App() {
     return (
       <div>
         <MyComponent />
       </div>
     );
   }
   export default App;
   ```

### Adding a New Page

1. Inside `src/pages/`, create a new file, e.g., `About.jsx`.
2. Define your page component:
   ```jsx
   function About() {
     return <h1>About Page</h1>;
   }
   export default About;
   ```
3. If using React Router, update `App.jsx`:
   ```jsx
   import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
   import About from "./pages/About";
   function App() {
     return (
       <Router>
         <Routes>
           <Route path="/about" element={<About />} />
         </Routes>
       </Router>
     );
   }
   export default App;
   ```

## 7. Best Practices

- Keep code **clean and modular**.
- Follow **naming conventions** (e.g., `camelCase` for variables, `PascalCase` for components).

If you have any questions, ask in the team chat!
