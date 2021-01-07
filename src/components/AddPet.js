import React, { useContext, useState } from "react";
import { addPet, postUserAction } from '../lib/api'
import { UserContext } from "../contexts/UserContext";


const formFields = { name: '', type: '', breed: '', color: '', bio: '', height: '', weight: '', diet: '', picture: '' };

const AddPet = () => {
    const [formData, setFormData] = useState(formFields);
    const [hypo, setHypo] = useState(false);
    const [error, setError] = useState("");
    const [fileInputState, setFileInputState] = useState('');
    const [selectedFiles] = useState([]);
    const { firstName, lastName } = useContext(UserContext);
    const [done, setDone] = useState(false);

    const userName = firstName + " " + lastName;

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
        let newPet = {
            name: formData.name,
            type: formData.type,
            breed: formData.breed,
            color: formData.color,
            bio: formData.bio,
            height: formData.height,
            weight: formData.weight,
            diet: formData.diet,
            hypo: hypo,
            images: selectedFiles
        }
        try {
            const addNewPet = await addPet(newPet);
            let action = { userName: userName, petName: addNewPet.name, petId: addNewPet._id, action: 'added' }
            await postUserAction(action);
            setDone(true);
        } catch {
            setError("Failed to add Pet");
        }
    }


    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
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
                                <i className="material-icons">mood</i><span className="black-text"> Pet has been successfully added </span>
                            </div>
                        </div>
                    </div>
                )}
                <form className="col s12 m8 offset-m2" onSubmit={handleSubmit} >
                    <h2 className='form-header center-align'>Add Pet</h2>
                    <div className="row">
                        <div className="input-field col  m6 ">
                            <input id="pet_name" type="text" name='name' value={formData.name} onChange={handleChange} />
                            <label htmlFor="pet_name">Pet Name</label>
                        </div>
                        <div className="input-field col  m6 ">
                            <input id="pet-type" type="text" name='type' value={formData.type} onChange={handleChange} />
                            <label htmlFor="pet-type">Pet Type</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12 m6">
                            <input id="pet-breed" type="text" name='breed' value={formData.breed} onChange={handleChange} />
                            <label htmlFor="pet-breed">Breed</label>
                        </div>
                        <div className="input-field col s12 m6">
                            <input id="pet-color" type="text" name='color' value={formData.color} onChange={handleChange} />
                            <label htmlFor="pet-color">Color</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <textarea id="textarea-pet-bio" className="materialize-textarea" name='bio' value={formData.bio} onChange={handleChange}></textarea>
                            <label htmlFor="textarea-pet-bio">Short Bio</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12 m6">
                            <input type="number" id="pet-height" name='height' value={formData.height} onChange={handleChange} />
                            <label htmlFor="pet-height">Height ( in centimeters ) </label>
                        </div>
                        <div className="input-field col s12 m6">
                            <input type="number" id="pet-weight" name='weight' value={formData.weight} onChange={handleChange} />
                            <label htmlFor="pet-weight">Weight ( in kilograms )</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <input id="pet-diet" type="text" name='diet' value={formData.diet} onChange={handleChange} />
                            <label htmlFor="pet-diet">Diet</label>
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
                            <input type="file" name="images"
                                onChange={handleFileInputChange}
                                value={fileInputState} />
                        </div>
                        <div className="file-path-wrapper">
                            <input className="file-path validate" type="text" placeholder="Upload an image" />
                        </div>
                    </div>
                    <div className="btn-pet-form center-align">
                        <button className="btn" type="submit">
                            <span className="btn-content">Add Pet</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
export default AddPet;