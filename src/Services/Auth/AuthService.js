import Parse from "parse";

export const createUser = (newUser) => {
  const user = new Parse.User();

  user.set("username", newUser.email);
  user.set("firstName", newUser.firstName);
  user.set("lastName", newUser.lastName);
  user.set("password", newUser.password);
  user.set("email", newUser.email);

  console.log("User: ", user);

  return user
    .signUp()
    .then((newUserSaved) => {
      return newUserSaved;
    })
    .catch((error) => {
      alert(`Error: ${error.message}`);
    });
};


export const loginUser = async (user) => {
    let username = user.email
    let password = user.password

    try {
      const loggedInUser = await Parse.User.logIn(username, password);
      return loggedInUser;
    } catch (error) {
      alert("Error: " + error.code + " " + error.message);
      return null;
    }
  };

export const getUser = () => {
  const currentUser = Parse.User.current();
  if (currentUser) {
    return currentUser;
  } else {
    throw new Error('No user logged in');
  }
};
  