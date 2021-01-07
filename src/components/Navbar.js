import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { Navbar, NavItem, Icon, Button, Modal } from "react-materialize";
import SignUp from "./SignUp";
import LogIn from "./LogIn";
import { UserContext } from "../contexts/UserContext";

const NavBar = () => {
	const { logged, admin, handleUserLogout } = useContext(UserContext);

	const history = useHistory();

	const handleLogout = () => {
		handleUserLogout();
		console.log("logged out");
		history.push("/");
	};

	return (
		<>
			{logged && (
				<Navbar
					className=" deep-purple darken-1 navbar"
					alignLinks="right"
					brand={
						<Link className="brand-logo" to="/">
							Les Petits Amis
						</Link>
					}
					id="mobile-nav"
					menuIcon={<Icon>menu</Icon>}
					options={{
						draggable: true,
						edge: "left",
						inDuration: 250,
						onCloseEnd: null,
						onCloseStart: null,
						onOpenEnd: null,
						onOpenStart: null,
						outDuration: 200,
						preventScrolling: true,
					}}
				>
					{admin === 2 && <Link to="/Dashboard">Dashboard</Link>}
					<Link to="/Home">
						<Icon left className='home-icon'>home</Icon>Home
					</Link>
					<Link to="/Search">Search Page</Link>
					<Link to="/Profile">Profile</Link>
					<Button
						className="waves-effect waves-light log-out-btn btn"
						onClick={handleLogout}
					>
						Log Out
					</Button>
				</Navbar>
			)}
			{!logged && (
				<Navbar
					className=" deep-purple darken-1 navbar"
					alignLinks="right"
					brand={
						<Link className="brand-logo" to="/">
							Les Petits Amis
						</Link>
					}
					id="mobile-nav"
					menuIcon={<Icon>menu</Icon>}
					options={{
						draggable: true,
						edge: "left",
						inDuration: 250,
						onCloseEnd: null,
						onCloseStart: null,
						onOpenEnd: null,
						onOpenStart: null,
						outDuration: 200,
						preventScrolling: true,
					}}
				>
					<Link to="/Search">Search Page</Link>
					<Modal
						actions={[
							<Button flat modal="close" node="button" waves="green">
								Close
							</Button>,
						]}
						bottomSheet={false}
						fixedFooter={false}
						header="Log In"
						id="Modal-0"
						open={false}
						options={{
							dismissible: true,
							endingTop: "10%",
							inDuration: 250,
							onCloseEnd: null,
							onCloseStart: null,
							onOpenEnd: null,
							onOpenStart: null,
							opacity: 0.5,
							outDuration: 250,
							preventScrolling: true,
							startingTop: "4%",
						}}
						trigger={<NavItem>Log In</NavItem>}
					>
						<LogIn />
					</Modal>
					<Modal
						actions={[
							<Button flat modal="close" node="button" waves="green">
								Close
							</Button>,
						]}
						bottomSheet={false}
						fixedFooter={false}
						header="Sign Up"
						id="Modal-0"
						open={false}
						options={{
							dismissible: true,
							endingTop: "10%",
							inDuration: 250,
							onCloseEnd: null,
							onCloseStart: null,
							onOpenEnd: null,
							onOpenStart: null,
							opacity: 0.5,
							outDuration: 250,
							preventScrolling: true,
							startingTop: "4%",
						}}
						trigger={<NavItem>Sign Up</NavItem>}
					>
						<SignUp />
					</Modal>
				</Navbar>
			)}
		</>
	);
};
export default NavBar;
