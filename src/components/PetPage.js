import React from "react";
import "../css/PetCard.css";

const PetPage = (pet) => {

    return (
        <div className="container">
            <ul className="pet-info">
                <li className="pet-type">
                    {" "}
					Type : <span>{pet.petDetails.type}</span>{" "}
                </li>
                <li className="pet-breed">
                    Breed of {pet.petDetails.type} : <span>{pet.petDetails.breed}</span>{" "}
                </li>
                <li className="pet-color">
                    Color : <span>{pet.petDetails.color}</span>{" "}
                </li>
                <li className="pet-adopt">
                    Adoption Status : <span>{pet.petDetails.status}</span>
                </li>
                <li className="pet-height">
                    Height : <span>{pet.petDetails.height}cm</span>
                </li>
                <li className="pet-weight">
                    Weight : <span>{pet.petDetails.weight}kg</span>{" "}
                </li>
                <li className="pet-hypo">
                    Hypoallergenic : <span>{pet.petDetails.hypo ? "Yes" : "Nope"}</span>{" "}
                </li>
                <li className="pet-diet">
                    Dietary restrictions : <span>{pet.petDetails.diet}</span>{" "}
                </li>
                <li className="pet-bio">
                    Bio : <span>{pet.petDetails.bio}</span>{" "}
                </li>
            </ul>
        </div>
    );
};
export default PetPage;
