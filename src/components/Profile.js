import React, { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { updateUser } from '../lib/api'


const Profile = () => {
	const { firstName, lastName, email, phone, bio, userId, userToken, updateCurrentUser } = useContext(UserContext)
	const [updateFirstName, setUpdateFirstName] = useState(firstName)
	const [updateLastName, setUpdateLastName] = useState(lastName)
	const [updateEmail, setUpdateEmail] = useState(email)
	const [updatePhone, setUpdatePhone] = useState(phone)
	const [updatePassword, setUpdatePassword] = useState('')
	const [updateBio, setUpdateBio] = useState(bio || '')
	const [error, setError] = useState("");
	const [done, setDone] = useState(false);


	const handleChangeFirstName = event => {
		setUpdateFirstName(event.target.value);
	};
	const handleChangeLastName = event => {
		setUpdateLastName(event.target.value);
	};
	const handleChangeEmail = event => {
		setUpdateEmail(event.target.value);
	};
	const handleChangePhone = event => {
		setUpdatePhone(event.target.value);
	};
	const handleChangePassword = event => {
		setUpdatePassword(event.target.value);
	};
	const handleChangeBio = event => {
		setUpdateBio(event.target.value);
	};


	const handleSubmit = async (event) => {
		event.preventDefault();
		setError("");
		setDone(false);
		if (updateFirstName.trim() === '' || updateLastName.trim() === '' || updateEmail.trim() === '' || updatePassword.trim() === '') {
			setError('Cannot Accept a Blank Value');
		}
		try {
			let user = {
				id: userId,
				firstName: updateFirstName,
				lastName: updateLastName,
				phone: updatePhone,
				email: updateEmail,
				password: updatePassword,
				bio: updateBio
			}
			const updateProfile = await updateUser(user, userToken);
			console.log(updateProfile)
			updateCurrentUser(userId);
			setDone(true);
		} catch {
			setError("Failed to update your profile");
		}
	};

	return (
		<div className="container">
			<div className="row">
				{error && (
					<div className='row'>
						<div className="col s12 error center-align">
							<div className="card-panel amber lighten-4">
								<i className="material-icons">report_problem</i><span className="black-text"> {error} </span>
							</div>
						</div>
					</div>
				)}
				{done && (
					<div className='row'>
						<div className="col s12 done center-align">
							<div className="card-panel teal lighten-2">
								<i className="material-icons">mood</i><span className="black-text"> Profile has been successfully updated </span>
							</div>
						</div>
					</div>
				)}
				<div className="col s12 m8 offset-m2">
					<h2 className='profile-header center-align'>Your Profile</h2>
					<form className="col s12" onSubmit={handleSubmit}>
						<div className="row">
							<div className="input-field col s6 m6">
								<input id="profile-first-name" type="text" onChange={handleChangeFirstName} value={updateFirstName} />
								<label className="active" htmlFor="profile-first-name">First Name</label>
							</div>
							<div className="input-field col s6 m6">
								<input id="profile-last-name" type="text" onChange={handleChangeLastName} value={updateLastName} />
								<label className="active" htmlFor="profile-last-name">Last Name</label>
							</div>
						</div>
						<div className="row">
							<div className="input-field col s12">
								<input id="profile-email" type="email" onChange={handleChangeEmail} value={updateEmail} />
								<label className="active" htmlFor="profile-email">Email</label>
							</div>
						</div>
						<div className="row">
							<div className="input-field col s12">
								<input id="profile-phone" type="number" onChange={handleChangePhone} value={updatePhone} />
								<label className="active" htmlFor="profile-phone">Phone Number</label>
							</div>
						</div>
						<div className="row">
							<div className="input-field col s12">
								<textarea id="textarea-profile-bio" className="materialize-textarea" name='bio' onChange={handleChangeBio} value={updateBio}></textarea>
								<label className="active" htmlFor="textarea-profile-bio">A Short Bio</label>
							</div>
						</div>
						<div className="row">
							<div className="input-field col s12">
								<input id="profile-password" type="password" onChange={handleChangePassword} value={updatePassword} required />
								<label htmlFor="profile-password">New Password ( Or Retype Old Password )</label>
							</div>
						</div>
						<div className="btn-save center-align">
							<button className="btn" type="submit">
								<span className="btn-content">Save</span>
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Profile;
