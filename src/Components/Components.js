import React from 'react';
import Home from './Home/Home';
import RecipeList from './Recipe/RecipeList';
import AddRecipe from './Recipe/AddRecipe';
import LiveList from './Recipe/LiveList.js';
import EditRecipe from './Recipe/EditRecipe.js';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthModule from "../Services/Auth/AuthLogin.js";
import AuthRegister from "../Services/Auth/AuthRegister.js";
import ProtectedRoute from "../Services/Routes/ProtectedRoute.js";
import Parse from 'parse';

export default function Components() {
  const currentUser = Parse.User.current();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home currentUser={currentUser} />} />
        <Route path="/list" element={<ProtectedRoute element={RecipeList} authRequired={true} />} />
        <Route path="/liveList" element={<ProtectedRoute element={LiveList} authRequired={true} />} />
        <Route path="/add" element={<ProtectedRoute element={AddRecipe} authRequired={true} />} />
        <Route path="/edit-recipe/:id" element={<ProtectedRoute element={EditRecipe} authRequired={true} />} />
        <Route path="/login" element={<ProtectedRoute element={AuthModule} authRequired={false} />} />
        <Route path="/register" element={<ProtectedRoute element={AuthRegister} authRequired={false} />} />
      </Routes>
    </Router>
  );
}
