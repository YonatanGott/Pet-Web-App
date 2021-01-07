import React, { useState } from "react";
import { updatePet, deletePet } from '../lib/api'

const EditPet = ({ pet }) => {
    const [updateName, setUpdateName] = useState(pet.name)
    const [updateBio, setUpdateBio] = useState(pet.bio)
    const [updateHeight, setUpdateHeight] = useState(pet.height)
    const [updateWeight, setUpdateWeight] = useState(pet.weight)
    const [updateType, setUpdateType] = useState(pet.type)
    const [updateColor, setUpdateColor] = useState(pet.color)
    const [updateBreed, setUpdateBreed] = useState(pet.breed)
    const [updateDiet, setUpdateDiet] = useState(pet.diet)
    const [hypo, setHypo] = useState(false);
    const [error, setError] = useState("");
    const [fileInputState, setFileInputState] = useState('');
    const [selectedFiles] = useState([]);
    const [done, setDone] = useState(false);


    const handleChangeName = event => {
        setUpdateName(event.target.value);
    };
    const handleChangeType = event => {
        setUpdateType(event.target.value);
    };
    const handleChangeBreed = event => {
        setUpdateBreed(event.target.value);
    };
    const handleChangeColor = event => {
        setUpdateColor(event.target.value);
    };
    const handleChangeBio = event => {
        setUpdateBio(event.target.value);
    };
    const handleChangeHeight = event => {
        setUpdateHeight(event.target.value);
    };
    const handleChangeWeight = event => {
        setUpdateWeight(event.target.value);
    };
    const handleChangeDiet = event => {
        setUpdateDiet(event.target.value);
    };

    const handleFileInputChange = (e) => {
        const files = e.target.files;
        setFileInputState(e.target.value);
        for (let i = 0; i < files.length; i++) {
            const reader = new FileReader();
            reader.readAsDataURL(files[i]);
            reader.onloadend = () => {
                selectedFiles.push(reader.result);
            };
        }
    };

    async function handleSubmit(e) {
        e.preventDefault();
        setDone(false);
        let editPet = {
            id: pet._id,
            name: updateName,
            type: updateType,
            breed: updateBreed,
            color: updateColor,
            bio: updateBio,
            height: updateHeight,
            weight: updateWeight,
            diet: updateDiet,
            hypo: hypo,
            images: selectedFiles
        }
        try {
            const pet = await updatePet(editPet);
            console.log(pet)
            setDone(true);
        } catch {
            setError("Failed to update Pet");
        }
    }

    const handleClickDelete = (e) => {
        if (window.confirm('Are you sure you want to delete this cute pet?')) {
            deletePet(e.target.value)
        }
    }

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
                                <i className="material-icons">mood</i><span className="black-text"> Pet has been successfully updated </span>
                            </div>
                        </div>
                    </div>
                )}
                <form className="col s12 m8 offset-m2" onSubmit={handleSubmit} >
                    <h4 className='form-header center-align'>Edit Pet</h4>
                    <div className="row">
                        <div className="input-field col  m6 ">
                            <input id="pet_name" type="text" name='name' value={updateName} onChange={handleChangeName} />
                            <label className="active" htmlFor="pet_name">Pet Name</label>
                        </div>
                        <div className="input-field col  m6 ">
                            <input id="pet-type" type="text" name='type' value={updateType} onChange={handleChangeType} />
                            <label className="active" htmlFor="pet-type">Pet Type</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12 m6">
                            <input id="pet-breed" type="text" name='breed' value={updateBreed} onChange={handleChangeBreed} />
                            <label className="active" htmlFor="pet-breed">Breed</label>
                        </div>
                        <div className="input-field col s12 m6">
                            <input id="pet-color" type="text" name='color' value={updateColor} onChange={handleChangeColor} />
                            <label className="active" htmlFor="pet-color">Color</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <textarea id="textarea-pet-bio" className="materialize-textarea" name='bio' value={updateBio} onChange={handleChangeBio}></textarea>
                            <label className="active" htmlFor="textarea-pet-bio">Short Bio</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12 m6">
                            <input type="number" id="pet-height" name='height' value={updateHeight} onChange={handleChangeHeight} />
                            <label className="active" htmlFor="pet-height">Height ( in centimeters  ) </label>
                        </div>
                        <div className="input-field col s12 m6">
                            <input type="number" id="pet-weight" name='weight' value={updateWeight} onChange={handleChangeWeight} />
                            <label className="active" htmlFor="pet-weight">Weight ( in kilograms )</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <input id="pet-diet" type="text" name='diet' value={updateDiet} onChange={handleChangeDiet} />
                            <label className="active" htmlFor="pet-diet">Diet</label>
                        </div>
                    </div>
                    <p className='checkbox-p'>
                        <label>
                            <input type="checkbox" checked={hypo} onChange={(e) => { setHypo(e.target.checked) }} />
                            <span>Hypoallergenic</span>
                        </label>
                    </p>
                    <div className="file-field input-field">
                        <div className="btn">
                            <span>Pet Image</span>
                            <input type="file" name="images" required
                                onChange={handleFileInputChange}
                                value={fileInputState} />
                        </div>
                        <div className="file-path-wrapper">
                            <input className="file-path validate" type="text" placeholder="Upload an image" />
                        </div>
                    </div>
                    <div className="btn-pet-form center-align">
                        <button className="btn" type="submit">
                            <span className="btn-content">Edit Pet</span>
                        </button>
                    </div>
                </form>
            </div>
            <button className="btn waves-effect waves-light red darken-3 delete" value={pet._id} onClick={handleClickDelete}>
                Delete Pet
            </button>
        </div>
    );
};
export default EditPet;