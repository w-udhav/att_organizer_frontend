import React, { createContext, useState } from "react";

export const CredentialContext = createContext();

const CredentialContextProvider = (props) => {
  const [currentUser, setCurrentUser] = useState([]);
  return (
    <CredentialContext.Provider value={{ currentUser, setCurrentUser }}>
      {props.children}
    </CredentialContext.Provider>
  )
}

export default CredentialContextProvider;