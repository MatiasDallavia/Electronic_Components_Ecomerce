import React, { useState, useContext } from "react";

const userContext = React.createContext();
const userToggleContext = React.createContext();

export function useUserContext() {
    return useContext(userContext);
}

export function useUserToggleContext() {
    return useContext(userToggleContext);
}

export function UserProvider(props) {

    const [user, setUser] = useState(null);

    const [count, setProductCount] = useState(0)
    const [prevCount, setPrevProductCount] = useState(0)
    const [productCountValue, setProductCountValue] = useState(0)

    const cambiaLogin = () => {
        if (user) {
            setUser(null);
        } else {
            setUser({
                name: 'Luis',
                email: 'luis@mail.com'
            });
        }
    }

    return (
        <userContext.Provider value={user}>
            <userToggleContext.Provider value={cambiaLogin}>
                {props.children}
            </userToggleContext.Provider>
        </userContext.Provider>
    );
}