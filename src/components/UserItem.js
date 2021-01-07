import React, { useCallback, useEffect, useState } from "react";
import { getPet } from "../lib/api";

const UserItem = ({ petList }) => {
    const [idList] = useState(petList);
    const [petArray, setPetArray] = useState([]);

    const getPetArray = useCallback(async () => {
        if (idList.length > 0) {
            const pets = []
            for (let i = 0; i < idList.length; i++) {
                let pet = await getPet(idList[i]);
                pets.push(pet);
            }
            setPetArray(pets)
        }
    }, [idList]);

    useEffect(() => {
        let mounted = true;
        if (mounted) {
            getPetArray()
        }
        return function cleanup() {
            mounted = false
        }
    }, [getPetArray])

    return (
        <>
            {petArray.map((pet) => {
                return (
                    <li key={pet._id}>
                        {pet.name} The {pet.type}
                    </li>
                );
            })}
        </>
    );
};
export default UserItem;
