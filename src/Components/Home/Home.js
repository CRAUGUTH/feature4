import React from 'react';
import { Link } from 'react-router-dom';
import Parse from 'parse';

const logout = () => {
  Parse.User.logOut().then(() => {
    window.location.reload();
  });
};

export default function Home({ currentUser }) {
  return (
    <html lang="en">
      <head>
        <title>Home - Welcome</title>
        {/* Include Bootstrap CSS */}
        <link
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
          rel="stylesheet"
        />
        <link href="styles.css" rel="stylesheet" />
      </head>
      <body>
        <header className="text-center mb-4">
          <h1 className="mb-4">Welcome to Recipes!</h1>
          {/* Internal Links */}
          <nav>
            <ul className="nav justify-content-center">
              <li className="nav-item">
                <Link className="nav-link" to="/">Dashboard</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/add">Create New Recipe</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/list">All Recipes</Link>
              </li>
              {currentUser ? (
                <li className="nav-item">
                  <button className="nav-link" onClick={logout}>Logout</button>
                </li>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">Login</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/register">Register</Link>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </header>
        <main className="container">
          {/* General Information */}
          <div className="profile-info text-center">
            {/* Company Picture */}
            <img
              src="images/logo.png"
              alt="Application Logo"
              className="profile-pic mb-3 img-fluid"
              width="125"
              height="150"
            />
          </div>
          <h2>What is Recipes?</h2>
          <p>Recipes is a webpage that allows you to not only store your favorite
            recipes for future reference but allows you to also store each
            recipe's corresponding macro nutrients to help you achieve your health
            goals!</p>
        </main>
        {/* Links to Socials */}
        <footer className="text-center mt-4">
          <p>
            Find us on LinkedIn
            <a href="https://www.linkedin.com/in/connerrauguth" target="_blank" rel="noopener noreferrer"> Conner Rauguth </a>
            |
            <a href="https://www.linkedin.com/in/michael-danzi-559770214/" target="_blank" rel="noopener noreferrer"> Michael Danzi</a>
          </p>
        </footer>
      </body>
    </html>
  );
}
