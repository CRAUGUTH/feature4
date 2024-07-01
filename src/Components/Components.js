import Home from './Home/Home';
import RecipeList from './Recipe/RecipeList';
import AddRecipe from './Recipe/AddRecipe';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

export default function Components() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/list" element={<RecipeList />} />
        <Route path="/add" element={<AddRecipe />} />
      </Routes>
    </Router>
  );
}
