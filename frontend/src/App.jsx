import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

// Import components
import Navbar from "./components/Navigation/Navbar"; 


// Import pages
import Home from "./Pages/Home"; 
import SignUp from "./Pages/Sign-up";
import CookingMode from "./Pages/CookingMode";
import Login from "./Pages/Login";
import RecipePage from "./components/RecipeDetail/RecipeDetail"; 
import "./components/RecipePageUI/RecipePageUI.css";
import Help from "./Pages/Help";
import PostList from "./components/Forum/PostList";
import Post from "./Pages/Post";
import CreatePost from "./components/Forum/CreatePost";

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
};

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div key={location.pathname} variants={pageVariants} initial="initial" animate="animate" exit="exit">
        <Routes location={location}>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/recipes/:recipeName" element={<RecipePage />} />
          <Route path="/cookingmode/:recipeId" element={<CookingMode />} />
          <Route path="/help" element={<Help />} />
          <Route path="/posts" element={<PostList />} />
          <Route path="/posts/:post_id" element={<Post />} />
          <Route path="posts/:post_id/comments" element={<Post />}/>
          <Route path="/create-post" element={<CreatePost/>} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <AnimatedRoutes />
    </BrowserRouter>
  );
}

export default App;
