import React, { useContext, useState } from "react";
import "../css/Home.css";
import { Tabs, Tab } from "react-materialize";
import MyPets from './MyPets';
import { UserContext } from "../contexts/UserContext";


const Home = () => {
	const { firstName, lastName, savedPets, fosteredPets, adoptedPets } = useContext(UserContext)
	const [list, setList] = useState(savedPets || [])
	const [header, setHeader] = useState('Here Are Your Saved Pets')

	const handleClickSave = () => {
		if (savedPets) {
			setList(savedPets);
			setHeader('Here Are Your Saved Pets')
		}
	}
	const handleClickFoster = () => {
		if (fosteredPets) {
			setList(fosteredPets);
			setHeader('Here Are Your Fostered Pets')

		}
	}
	const handleClickAdopt = () => {
		if (adoptedPets) {
			setList(adoptedPets);
			setHeader('Here Are Your Adopted Pets')
		}
	}


	return (
		<div>
			<div className="section">
				<div className="row container">
					<div className='user-welcome'>
						<h2 className='user-welcome-header center-align'><i className="material-icons">pets</i>Hello {firstName} {lastName}<i className="material-icons">pets</i></h2>
					</div>
				</div>
			</div>
			< div className='row tabs-row '>
				<div className='col s12 m8 offset-m2'>
					<Tabs
						className="tabs"
						options={{
							swipeable: true
						}}
					>
						<Tab
							className="white"
							options={{
								duration: 300,
								onShow: null,
								responsiveThreshold: Infinity,
								swipeable: false
							}}
							title="Saved Pets"
						>
							<div className="save-panel panel center-align">
								<h1 className='panel-content'>Your Saved Pets list showcases the pets that you have an interest in them <br></br> and might want to keep track of. </h1>
								<div className='panel-action'>
									<button className="btn waves-effect waves-light list-btn" onClick={handleClickSave}>Show Saved Pets</button>
								</div>
							</div>
						</Tab>
						<Tab
							className="white"
							options={{
								duration: 300,
								onShow: null,
								responsiveThreshold: Infinity,
								swipeable: false
							}}
							title="Fostered Pets"
						>
							<div className="foster-panel panel center-align">
								<h1 className='panel-content'>Your Fostered Pets list showcases the pets that you gave a temporary home <br></br> to live until getting adopted </h1>
								<div className='panel-action'>
									<button className="btn waves-effect waves-light list-btn" onClick={handleClickFoster}>Show Fostered Pets</button>
								</div>
							</div>
						</Tab>
						<Tab
							className="white"
							options={{
								duration: 300,
								onShow: null,
								responsiveThreshold: Infinity,
								swipeable: false
							}}
							title="Adopted Pets"
						>
							<div className="adopt-panel panel center-align ">
								<h1 className='panel-content'>Your Adopted Pets list shows all the pets you have adopted. <br></br> be sure to make it a long list. </h1>
								<div className='panel-action'>
									<button className="btn waves-effect waves-light list-btn" onClick={handleClickAdopt}>Show Adopted Pets</button>
								</div>
							</div>
						</Tab>
					</Tabs>
				</div>
			</div>
			<h2 className='my-pets-header center-align'>{header}</h2>
			<MyPets list={list} />
		</div>
	);
};

export default Home;
