import React, { useCallback, useEffect, useState } from "react";
import { Carousel } from "react-materialize";
import "../css/Home.css";
import { Collapsible, CollapsibleItem } from "react-materialize";
import { getUserAction } from "../lib/api";
import PetCard from "./PetCard";

const Landing = () => {
	const [allActions, setAllActions] = useState([]);

	const usersActions = useCallback(async () => {
		let actions = await getUserAction();
		setAllActions(actions);
	}, []);

	useEffect(() => {
		usersActions();
	}, [usersActions]);

	return (
		<div>
			<div className="section">
				<div className="row container">
					<div className="welcome-div">
						<h2 className="welcome-header center-align"><i className="material-icons">pets</i>Welcome<i className="material-icons">pets</i></h2>
					</div>
					<Carousel
						carouselId="Carousel-2"
						className="white-text center"
						options={{
							fullWidth: true,
							indicators: true,
						}}
					>
						<div className="first-panel welcome-panel">
							<h1 className='panel-header'>Search For A New Friend</h1>
							<h3 className='panel-content'>Use our search page to find pets that are available for adoption or fostering</h3>
						</div>
						<div className="second-panel welcome-panel">
							<h1 className='panel-header'>Log in or Sign Up</h1>
							<h3 className='panel-content'>Registered users can adopt or foster their favorite pets as well as keep a wish list </h3>
						</div>
						<div className="third-panel welcome-panel">
							<h1 className='panel-header'>About Les Petits Amis</h1>
							<h3 className='panel-content'>This web app is about making the pets the center of attention</h3>
						</div>
					</Carousel>
				</div>
			</div>
			<div className="section">
				<div className="row container activity">
					<h4 className="center-align">Activity on Les Petits Amis </h4>
					<Collapsible popout>
						{allActions.map((action) => {
							return (
								<CollapsibleItem
									className="card-item"
									key={action._id}
									expanded={false}
									header={`${action.petName} was ${action.action} by ${action.userName}`}
									node="div"
								><div className="pets-list landing-list row">

										<PetCard key={action.petId} pet={action.petId} />

									</div>
								</CollapsibleItem>
							);
						})}
					</Collapsible>
				</div>
			</div>
		</div>
	);
};

export default Landing;
