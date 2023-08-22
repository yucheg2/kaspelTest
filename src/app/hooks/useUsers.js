import _ from "lodash";
import React, { useContext, useState, useEffect } from "react";

const usersContext = React.createContext();

const UsersProvider = ({ children }) => {
    const [users, setUsers] = useState([]);

    const addUser = (data) => {
        const newArr = [...users, { ...data, key: _.uniqueId(Date.now()) }];
        setUsers(newArr);
        localStorage.setItem("users", JSON.stringify(newArr));
    };

    const deleteUser = (key) => {
        const newArr = users.filter((user) => user.key !== key);
        setUsers(newArr);
        localStorage.setItem("users", JSON.stringify(newArr));
    };

    const editUser = (data, key) => {
        const newArr = [...users];
        const userInd = users.findIndex((u) => u.key === key);
        newArr[userInd] = { ...data, key };
        setUsers(newArr);
        localStorage.setItem("users", JSON.stringify(newArr));
    };

    useEffect(() => {
        const users = localStorage.getItem("users");

        setUsers(users ? JSON.parse(users) : []);
    }, []);
    return (
        <usersContext.Provider value={{ users, addUser, deleteUser, editUser }}>
            {children}
        </usersContext.Provider>
    );
};

export const useUsers = () => useContext(usersContext);

export default UsersProvider;
