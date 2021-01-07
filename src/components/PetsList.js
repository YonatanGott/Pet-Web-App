import React from "react";
import PetCard from './PetCard'

const PetsList = ({ list }) => {

    return (
        <div>
            <div className="pets-list row">
                <div className='col s12 pets-list-col'>
                    {list.map((pet) => {
                        return (
                            <PetCard key={pet} pet={pet} />
                        )
                    })}
                </div>
            </div >
        </div>
    )
};
export default PetsList;