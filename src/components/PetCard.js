import React, { useEffect, useState, useCallback } from "react";
import { Icon } from "react-materialize";
import "../css/PetCard.css";
import PetPage from "./PetPage";
import PetAction from "./PetAction";
import { Image } from "cloudinary-react";
import { getPet, getUser } from "../lib/api";

const PetCard = ({ pet }) => {
	const [petImage, setPetImage] = useState('');
	const [petStatus, setPetStatus] = useState('');
	const [petName, setPetName] = useState('');
	const [petBio, setPetBio] = useState('');
	const [petHypo, setPetHypo] = useState('');
	const [petHeight, setPetHeight] = useState('');
	const [petWeight, setPetWeight] = useState('');
	const [petType, setPetType] = useState('');
	const [petColor, setPetColor] = useState('');
	const [petBreed, setPetBreed] = useState('');
	const [petDiet, setPetDiet] = useState('');
	const [adoptUserId, setAdoptUserId] = useState('');
	const [adoptUser, setAdoptUser] = useState("");
	const [fosterUserId, setFosterUserId] = useState('');
	const [fosterUser, setFosterUser] = useState("");
	const [showFoster, setShowFoster] = useState(false);
	const [showAdopt, setShowAdopt] = useState(false);
	const [petId, setPetId] = useState('');

	const getPetDetails = useCallback(async () => {
		try {
			const cardPet = await getPet(pet);
			setPetId(cardPet._id);
			setPetImage(cardPet.images[0]);
			setPetName(cardPet.name);
			setPetBio(cardPet.bio);
			setPetHypo(cardPet.hypo);
			setPetHeight(cardPet.height);
			setPetWeight(cardPet.weight);
			setPetType(cardPet.type);
			setPetColor(cardPet.color);
			setPetBreed(cardPet.breed);
			setPetDiet(cardPet.diet);
			setAdoptUserId(cardPet.adoptId);
			setFosterUserId(cardPet.fosterId);

			if (cardPet.adoption === 1) {
				setPetStatus("Adopted");
			} else if (cardPet.adoption === 2) {
				setPetStatus("Fostered");
			} else if (cardPet.adoption === 3) {
				setPetStatus("Available");
			}
		} catch (error) {
			console.error(error);
		}
	}, [pet]);

	const getAdoptUser = useCallback(async () => {
		try {
			if (adoptUserId) {
				const user = await getUser(adoptUserId);
				setAdoptUser(user);
				setShowAdopt(true);
			}
			else {
				setShowAdopt(false);
			}
		} catch (error) {
			console.error(error);
		}
	}, [adoptUserId]);

	const getFosterUser = useCallback(async () => {
		try {
			if (fosterUserId) {
				const user = await getUser(fosterUserId);
				setFosterUser(user);
				setShowFoster(true);
			}
			else {
				setShowFoster(false);
			}
		} catch (error) {
			console.error(error);
		}
	}, [fosterUserId]);

	useEffect(() => {
		let mounted = true;
		if (mounted) {
			getPetDetails();
			getAdoptUser();
			getFosterUser();
		}
		return function cleanup() {
			mounted = false
		}
	}, [getPetDetails, getAdoptUser, getFosterUser]);

	const petDetails = {
		status: petStatus,
		type: petType,
		hypo: petHypo,
		height: petHeight,
		weight: petWeight,
		color: petColor,
		breed: petBreed,
		diet: petDiet,
		bio: petBio,
	};

	const action = {
		petId: petId,
		adoptUserId: adoptUserId,
		fosterUserId: fosterUserId,
		petName: petName,
		getPetDetails
	}

	return (
		<div className="col s12 m6 offset-m3 ">
			<div className="card sticky-action">
				<div className="card-image waves-effect waves-block waves-light">
					<Image
						cloudName="keshetanan"
						publicId={petImage}
						height="600"
						width="600"
						crop="scale"
					/>
				</div>
				<div className="card-content">
					<span className="card-title activator grey-text text-darken-4">
						<h3>{petName}</h3>
						<Icon className="material-icons right">more_vert</Icon>
					</span>
					{showFoster && (
						<p>
							Fostered by {fosterUser.firstName} {fosterUser.lastName}{" "}
						</p>
					)}
					{showAdopt && (
						<p>
							{" "}
							Adopted by {adoptUser.firstName} {adoptUser.lastName}{" "}
						</p>
					)}
				</div>
				<PetAction cardAction={action} />
				<div className="card-reveal">
					<span className="card-title grey-text text-darken-4 center-align">
						<h4>{petName}</h4>
						<Icon className="material-icons right">close</Icon>
					</span>
					<PetPage petDetails={petDetails} />
				</div>
			</div>
		</div>
	);
};

export default PetCard;
