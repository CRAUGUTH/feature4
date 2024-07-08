import React from "react";

const AuthForm = ({ user, onChange, onSubmit }) => {
  return (
    <html lang="en">
      <head>
      <title>Register Form</title>
        {/* Include Bootstrap CSS */}
        <link
            href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
            rel="stylesheet"
        />
        <link href="styles.css" rel="stylesheet" /> 
      </head>
      <body>
        <header className="text-center mb-4">
          <h1 className="mb-4">Create an Account</h1>
        </header>
        <div>
          <form onSubmit={onSubmit}>
            <div>
              <label>First Name</label>
              <br />
              <input
                type="text"
                value={user.firstName}
                onChange={onChange}
                name="firstName"
                placeholder="first name"
                required
              />
            </div>
            <div>
              <label>Last Name</label>
              <br />
              <input
                type="text"
                value={user.lastName}
                onChange={onChange}
                name="lastName"
                placeholder="last name"
                required
              />
            </div>{" "}
            <div>
              <label>Email</label>
              <br />
              <input
                type="email"
                value={user.email}
                onChange={onChange}
                name="email"
                placeholder="email"
                required
              />
            </div>{" "}
            <div>
              <label>Password</label>
              <br />
              <input
                type="password"
                value={user.password}
                onChange={onChange}
                name="password"
                placeholder="password"
                min="0"
                required
              />
            </div>
            <div>
              <button type="submit" className="btn btn-primary mt-3" onSubmit={onSubmit}>
                Register
              </button>
            </div>
          </form>
        </div>
      </body>
    </html>
  );
};

export default AuthForm;