import React, {useState, useEffect} from "react";
import UserServiceData from './services/user.js';

const UserContext = React.createContext();


function UserContextProvider(props){
  const [user, setUser] = useState();

  useEffect(() => {
    if (!user && localStorage.getItem('token')) {
        UserServiceData.getUser()
          .then(response => {
            setUser({'email': response.data['email']})
          });
    }
  });

  return (
    <UserContext.Provider value={{ user: user, setUser: setUser }}>
      {props.children}
    </UserContext.Provider>
  );
}

export {UserContextProvider};
export default UserContext;
