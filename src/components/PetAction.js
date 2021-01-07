import React, { useCallback, useContext, useEffect, useState } from "react";
import {
    addSavedPet,
    addFosterPet,
    addAdoptPet,
    deleteSavedPet,
    deleteFosteredPet,
    deleteAdoptedPet,
    postUserAction
} from "../lib/api";
import { UserContext } from "../contexts/UserContext";

const PetAction = ({ cardAction }) => {
    const {
        userId,
        savedPets,
        fosteredPets,
        adoptedPets,
        updateCurrentUser,
        logged,
        firstName,
        lastName
    } = useContext(UserContext);
    const [adoptedByUser, setAdoptedByUser] = useState(false);
    const [fosteredByUser, setFosteredByUser] = useState(false);
    const [available, setAvailable] = useState(true);
    const [saved, setSaved] = useState(false);
    const [loading, setLoading] = useState(false);
    const [adopted, setAdopted] = useState(false);
    const [fostered, setFostered] = useState(false);

    const petId = cardAction.petId;
    const userName = firstName + " " + lastName;


    const checkAdopted = useCallback(() => {
        for (let i = 0; i < adoptedPets.length; i++) {
            if (petId === adoptedPets[i]) {
                setAdoptedByUser(true);
                setFosteredByUser(false);
            }
        }
        if (cardAction.adoptUserId) {
            setAdopted(true);
            setAvailable(false);
        }
    }, [adoptedPets, petId, cardAction]);

    const checkFostered = useCallback(() => {
        for (let i = 0; i < fosteredPets.length; i++) {
            if (petId === fosteredPets[i]) {
                setFosteredByUser(true);
                setAdoptedByUser(false);
            }
        }
        if (cardAction.fosterUserId) {
            setFostered(true);
            setAvailable(false);
        }
    }, [petId, fosteredPets, cardAction]);

    const checkSaved = useCallback(() => {
        for (let i = 0; i < savedPets.length; i++) {
            if (petId === savedPets[i]) {
                setSaved(true);
            }
        }
    }, [petId, savedPets]);

    const handleSavedPet = async () => {
        setLoading(true);
        await addSavedPet(userId, petId);
        await updateCurrentUser(userId);
        setSaved(true);
        setLoading(false);
    };
    const handleFosteredPet = async () => {
        setLoading(true);
        await addFosterPet(userId, petId);
        await updateCurrentUser(userId);
        setFosteredByUser(true);
        setFostered(true);
        setAvailable(false);
        setLoading(false);
        let actionType = 'fostered';
        userAction(actionType);
    };
    const handleAdoptedPet = async () => {
        setLoading(true);
        await addAdoptPet(userId, petId);
        await deleteFosteredPet(userId, petId);
        await updateCurrentUser(userId);
        setAdoptedByUser(true);
        setAdopted(true);
        setAvailable(false);
        setLoading(false);
        let actionType = 'adopted';
        userAction(actionType);
    };
    const handleAdoptedFosterPet = async () => {
        setLoading(true);
        await addAdoptPet(userId, petId);
        await deleteFosteredPet(cardAction.fosterUserId, petId);
        await updateCurrentUser(userId);
        setAdoptedByUser(true);
        setAdopted(true);
        setFostered(false);
        setAvailable(false);
        setLoading(false);
        let actionType = 'adopted';
        userAction(actionType);
    };
    const handleUnsave = async () => {
        setLoading(true);
        await deleteSavedPet(userId, petId);
        await updateCurrentUser(userId);
        setSaved(false);
        setLoading(false);
    };
    const handleUnadopt = async () => {
        setLoading(true);
        await deleteAdoptedPet(userId, petId);
        await updateCurrentUser(userId);
        setAdoptedByUser(false);
        setFosteredByUser(false);
        setAdopted(false);
        setFostered(false);
        setAvailable(true);
        setLoading(false);
        let actionType = 'returned';
        userAction(actionType);
    };
    const handleUnfoster = async () => {
        setLoading(true);
        await deleteFosteredPet(userId, petId);
        await updateCurrentUser(userId);
        setAdoptedByUser(false);
        setFosteredByUser(false);
        setFostered(false);
        setAvailable(true);
        setLoading(false);
        let actionType = 'returned';
        userAction(actionType);
    };

    useEffect(() => {
        let mounted = true;
        if (mounted) {
            checkAdopted();
            checkFostered();
            checkSaved();
            cardAction.getPetDetails()
        }
        return function cleanup() {
            mounted = false
        }
    }, [
        checkAdopted,
        checkFostered,
        checkSaved,
        adoptedPets,
        fosteredPets,
        savedPets,
        cardAction,
    ]);

    const userAction = async (actionType) => {
        const action = { userName: userName, petName: cardAction.petName, petId: petId, action: actionType }
        await postUserAction(action)
    }

    return (
        <div className="card-action  center-align">
            {loading ? (
                <div className="progress deep-purple accent-1">
                    <div className="indeterminate deep-purple accent-4"></div>
                </div>
            ) : (
                    <>
                        {available && (
                            <>
                                <button
                                    disabled={!logged}
                                    className="waves-effect waves-light btn btn-foster"
                                    value={petId}
                                    onClick={handleFosteredPet}
                                >
                                    Foster
							</button>
                                <button
                                    disabled={!logged}
                                    className="waves-effect waves-light btn btn-adopt"
                                    value={petId}
                                    onClick={handleAdoptedPet}
                                >
                                    Adopt
							</button>
                                {saved ? (
                                    <button
                                        className="waves-effect waves-light btn btn-save red darken-1"
                                        value={petId}
                                        onClick={handleUnsave}
                                    >
                                        Unsave
                                    </button>
                                ) : (
                                        <button
                                            disabled={!logged}
                                            className="waves-effect waves-light btn btn-save"
                                            value={petId}
                                            onClick={handleSavedPet}
                                        >
                                            Save
                                        </button>
                                    )}
                            </>
                        )}
                        {fostered && (
                            <>
                                {fosteredByUser ? (
                                    <>
                                        <button
                                            className="waves-effect waves-light btn btn-adopt"
                                            value={petId}
                                            onClick={handleAdoptedPet}
                                        >
                                            Adopt
									</button>
                                        {saved ? (
                                            <button
                                                className="waves-effect waves-light btn btn-save red darken-1"
                                                value={petId}
                                                onClick={handleUnsave}
                                            >
                                                Unsave
                                            </button>
                                        ) : (
                                                <button
                                                    className="waves-effect waves-light btn btn-save"
                                                    value={petId}
                                                    onClick={handleSavedPet}
                                                >
                                                    Save
                                                </button>
                                            )}
                                        <button
                                            className="waves-effect waves-light btn btn-return red darken-3"
                                            value={petId}
                                            onClick={handleUnfoster}
                                        >
                                            Return Pet
									</button>
                                    </>
                                ) : (
                                        <>
                                            <button
                                                disabled={!logged}
                                                className="waves-effect waves-light btn btn-adopt"
                                                value={petId}
                                                onClick={handleAdoptedFosterPet}
                                            >
                                                Adopt
									</button>
                                            {saved ? (
                                                <button
                                                    className="waves-effect waves-light btn btn-save red darken-1"
                                                    value={petId}
                                                    onClick={handleUnsave}
                                                >
                                                    Unsave
                                                </button>
                                            ) : (
                                                    <button
                                                        disabled={!logged}
                                                        className="waves-effect waves-light btn btn-save"
                                                        value={petId}
                                                        onClick={handleSavedPet}
                                                    >
                                                        Save
                                                    </button>
                                                )}
                                        </>
                                    )}
                            </>
                        )}
                        {adopted && (
                            <>
                                {adoptedByUser ? (
                                    <>
                                        {saved ? (
                                            <button
                                                className="waves-effect waves-light btn btn-save red darken-1"
                                                value={petId}
                                                onClick={handleUnsave}
                                            >
                                                Unsave
                                            </button>
                                        ) : (
                                                <button
                                                    className="waves-effect waves-light btn btn-save"
                                                    value={petId}
                                                    onClick={handleSavedPet}
                                                >
                                                    Save
                                                </button>
                                            )}
                                        <button
                                            className="waves-effect waves-light btn btn-return red darken-3"
                                            value={petId}
                                            onClick={handleUnadopt}
                                        >
                                            Return Pet
									</button>
                                    </>
                                ) : (
                                        <>
                                            {saved ? (
                                                <button
                                                    className="waves-effect waves-light btn btn-save red darken-1"
                                                    value={petId}
                                                    onClick={handleUnsave}
                                                >
                                                    Unsave
                                                </button>
                                            ) : (
                                                    <button
                                                        disabled={!logged}
                                                        className="waves-effect waves-light btn btn-save"
                                                        value={petId}
                                                        onClick={handleSavedPet}
                                                    >
                                                        Save
                                                    </button>
                                                )}
                                        </>
                                    )}
                            </>
                        )}
                    </>
                )}
        </div>
    );
};

export default PetAction;
