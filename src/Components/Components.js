import Home from './Home/Home';
import RecipeList from './Recipe/RecipeList';
import AddRecipe from './Recipe/AddRecipe';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthModule from "./Auth/AuthLogin.js";
import AuthRegister from "./Auth/AuthRegister.js";

export default function Components() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/list" element={<RecipeList />} />
        <Route path="/add" element={<AddRecipe />} />
        <Route path="/login" element={<AuthModule />} />
        <Route path="/register" element={<AuthRegister />} />
      </Routes>
    </Router>
  );
}
