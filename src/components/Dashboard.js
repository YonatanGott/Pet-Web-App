import React, { useEffect, useState } from "react";
import { getAllUsers, getAllPets, deleteUser } from "../lib/api";
import { Collapsible, CollapsibleItem } from "react-materialize";
import EditPet from "./EditPet";
import { Link } from "react-router-dom";
import UserItem from "./UserItem";


const Dashboard = () => {
    const [allUsers, setAllUsers] = useState([]);
    const [allPets, setAllPets] = useState([]);
    const [petEdit, setPetEdit] = useState(false);


    const usersArray = async () => {
        let users = await getAllUsers();
        setAllUsers(users);
    }

    const petsArray = async () => {
        let pets = await getAllPets();
        setAllPets(pets);
    }


    useEffect(() => {
        usersArray();
        petsArray()
    }, []);

    const handleClickOpen = () => {
        setPetEdit(true)
    }
    const handleClickClose = () => {
        setPetEdit(false)
    }

    const handleClickDelete = (e) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            deleteUser(e.target.value)
        }
    }


    return (
        <div className="container">
            <div className="row center-align">
                <div className='col s12'>
                    <button className='waves-effect waves-light btn'>
                        <Link to="/AddPet">Add A Pet</Link>
                    </button>
                </div>
            </div>
            <h2 className='users-header center-align'>Users</h2>
            <Collapsible accordion>
                {allUsers.map((user) => {
                    return (
                        <CollapsibleItem key={user._id}
                            expanded={false}
                            header={`${user.firstName} ${user.lastName}`}
                            node="div">
                            <blockquote className='user-item'>
                                Email: {user.email}
                            </blockquote>
                            <blockquote className='user-item'>
                                Phone: {user.phone}
                            </blockquote>
                            <blockquote className='user-item'>
                                Bio: {user.bio}
                            </blockquote>
                            <blockquote className='user-item'>
                                <ul>Saved Pets:
                                    <UserItem petList={user.savedPets} />
                                </ul>
                            </blockquote>
                            <blockquote className='user-item'>
                                <ul>Fostered Pets:
                                <UserItem petList={user.fosterPets} />
                                </ul>
                            </blockquote>
                            <blockquote className='user-item'>
                                <ul>Adopted Pets:
                                <UserItem petList={user.adoptPets} />
                                </ul>
                            </blockquote>
                            <button className="btn waves-effect waves-light delete right-align red darken-3" value={user._id} onClick={handleClickDelete}>
                                Delete User
                            </button>
                        </CollapsibleItem>)
                })}
            </Collapsible>
            <h2 className='pets-header center-align'>Pets</h2>
            <Collapsible accordion>
                {allPets.map((pet) => {
                    return (
                        <CollapsibleItem key={pet._id}
                            expanded={false}
                            header={`${pet.name} The ${pet.type}`}
                            node="div">
                            <blockquote className='user-item'>
                                {pet.breed}
                            </blockquote>
                            <blockquote className='user-item'>
                                {pet.bio}
                            </blockquote>
                            <div className=" edit center-align">
                                {!petEdit ?
                                    <button className="btn waves-effect waves-light center-align" value={pet._id} onClick={handleClickOpen}>
                                        Edit Pet
                                </button> :
                                    <button className="btn waves-effect waves-light center-align" value={pet._id} onClick={handleClickClose}>
                                        Close Edit
                                </button>
                                }
                                {petEdit && <EditPet pet={pet} />}
                            </div>
                        </CollapsibleItem>)
                })}
            </Collapsible>
        </div>
    );
};
export default Dashboard;


