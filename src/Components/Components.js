import Home from './Home/Home';
import RecipeList from './Recipe/RecipeList';
import AddRecipe from './Recipe/AddRecipe';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthModule from "../Services/Auth/AuthLogin.js";
import AuthRegister from "../Services/Auth/AuthRegister.js";
import ProtectedRoute from "../Services/Routes/ProtectedRoute.js";

export default function Components() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/list" element={<RecipeList />} />
        <Route path="/add" element={<AddRecipe />} />
        <Route path="/login" element={<ProtectedRoute element={AuthModule} />} />
        <Route path="/register" element={<ProtectedRoute element={AuthRegister} />} />
        
      </Routes>
    </Router>
  );
}
