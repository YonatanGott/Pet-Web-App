import React, { createContext, useEffect, useState } from "react"
import { getUser, logoutUser } from "../lib/api"


export const UserContext = createContext()

const UserContextProvider = (props) => {
    const [userId, setUserId] = useState('')
    const [logged, setLogged] = useState(false);
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [bio, setBio] = useState('')
    const [savedPets, setSavedPets] = useState([])
    const [fosteredPets, setFosteredPets] = useState([])
    const [adoptedPets, setAdoptedPets] = useState([])
    const [admin, setAdmin] = useState('')

    const handleUserId = (id) => {
        setUserId(id)
    }
    const handleUserLogin = (loggedId) => {
        setUserId(loggedId);
        updateCurrentUser(loggedId);
    }

    const handleUserLogout = () => {
        logoutUser();
        setLogged(false);
        localStorage.clear();
    }

    async function updateCurrentUser(id) {
        let user = await getUser(id);
        setFirstName(user.firstName);
        setLastName(user.lastName);
        setAdoptedPets(user.adoptPets);
        setFosteredPets(user.fosterPets);
        setSavedPets(user.savedPets);
        setEmail(user.email);
        setPhone(user.phone);
        setBio(user.bio);
        setAdmin(user.admin);
        setUserId(user._id);
        setLogged(true);
        localStorage.setItem('user', user._id)
    }

    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
            const foundUser = loggedInUser
            updateCurrentUser(foundUser)
        }
    }, []);

    const value = {
        userId,
        handleUserId,
        handleUserLogin,
        updateCurrentUser,
        firstName,
        lastName,
        savedPets,
        fosteredPets,
        adoptedPets,
        email,
        phone,
        bio,
        logged,
        handleUserLogout,
        admin
    }
    return (
        <UserContext.Provider value={value} >
            {props.children}
        </UserContext.Provider>
    );
}
export default UserContextProvider;