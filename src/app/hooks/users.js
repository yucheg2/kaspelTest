import React, { useContext, useState } from "react";

const usersContext = React.createContext();

const UsersProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
    return (
        <usersContext.Provider value={{ users }}>
            {children}
        </usersContext.Provider>
    );
};

export const useUsers = () => useContext(usersContext);

export default UsersProvider;
