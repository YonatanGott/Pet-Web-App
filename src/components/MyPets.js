import React, { useCallback, useEffect, useState } from 'react'
import PetsList from './PetsList'


const MyPets = ({ list }) => {
    const [petsList, setPetsList] = useState([])
    const [hasList, setHasList] = useState(false)

    const showList = useCallback(() => {
        if (list.length > 0) {
            setPetsList(list);
            setHasList(true)
        }
        else {
            setHasList(false)
        }
    }, [list])

    useEffect(() => {
        showList()
    }, [showList])


    return (
        <div className='container-my-pets'>
            {
                hasList ? <>
                    <PetsList list={petsList} />
                </>
                    :
                    <h3 className="center-align">No Pets to Show Yet</h3>
            }
        </div>
    )
}
export default MyPets;