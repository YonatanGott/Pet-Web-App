import axios from "axios";

const baseUrl = "http://localhost:5000";
//const baseUrl = "https://pet-app-backend.herokuapp.com/api";

axios.defaults.withCredentials = true;


export async function getAllUsers() {
    try {
        const response = await axios.get(baseUrl + "/users");
        const data = response.data;
        return data;
    } catch (error) {
        console.error(error);
    }
}

export async function getAllPets() {
    try {
        const response = await axios.get(baseUrl + "/pets");
        const data = response.data;
        return data;
    } catch (error) {
        console.error(error);
    }
}

export async function getAllPetsIds() {
    try {
        const response = await axios.get(baseUrl + "/pets/petsId");
        const data = response.data;
        return data;
    } catch (error) {
        console.error(error);
    }
}

export async function getPetsByType(type) {
    try {
        const response = await axios.post(baseUrl + "/pets/type", {
            type: type
        });
        const data = response.data;
        return data;
    } catch (error) {
        console.error(error);
    }
}

export async function getPetsByStatus(status) {
    try {
        const response = await axios.post(baseUrl + "/pets/status", {
            status: status
        });
        const data = response.data;
        return data;
    } catch (error) {
        console.error(error);
    }
}

export async function getPetsBySize(height, weight) {
    try {
        console.log(weight)
        const response = await axios.post(baseUrl + "/pets/size", {
            height: height,
            weight: weight
        });
        const data = response.data;
        return data;
    } catch (error) {
        console.error(error);
    }
}

export async function getPetsByName(name) {
    try {
        const response = await axios.post(baseUrl + "/pets/name", {
            name: name
        });
        const data = response.data;
        return data;
    } catch (error) {
        console.error(error);
    }
}

export async function getUser(userId) {
    try {
        const response = await axios.get(baseUrl + "/users/" + userId);
        const data = response.data;
        return data;
    } catch (error) {
        console.error(error);
    }
}

export async function getPet(petId) {
    try {
        const response = await axios.get(baseUrl + "/pets/" + petId);
        const data = response.data;
        return data;
    } catch (error) {
        console.error(error);
    }
}

export async function signUpUser(user) {
    try {
        const response = await axios.post(baseUrl + "/users/signup", {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phone: user.phone,
            password: user.password
        });
        const data = response.data;
        return data;
    } catch (error) {
        console.error(error);
    }
}

export async function loginUser(user) {
    try {
        const response = await axios.post(baseUrl + "/users/login", {
            email: user.email,
            password: user.password,
        });
        const data = response.data;
        return data;
    } catch (error) {
        console.error(error);
    }
}

export async function logoutUser() {
    try {
        const response = await axios.get(baseUrl + "/users/logout");
        const data = response.data;
        return data;
    } catch (error) {
        console.error(error);
    }
}

export async function deleteUser(userId) {
    try {
        const response = await axios.delete(baseUrl + "/users/" + userId);
        const data = response.data;
        return data;
    } catch (error) {
        console.error(error);
    }
}

export async function updateUser(user) {
    try {
        const response = await axios.patch(baseUrl + "/users/" + user.id, {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phone: user.phone,
            password: user.password,
            bio: user.bio

        });
        const data = response.data;
        return data;
    } catch (error) {
        console.error(error);
    }
}

export async function addSavedPet(userId, petId) {
    try {
        const response = await axios.patch(baseUrl + "/users/" + userId + "/saved", {
            petId: petId
        });
        const data = response.data;
        return data;
    } catch (error) {
        console.error(error);
    }
}

export async function addFosterPet(userId, petId) {
    try {
        const response = await axios.patch(baseUrl + "/users/" + userId + "/fostered", {
            petId: petId
        });
        const data = response.data;
        return data;
    } catch (error) {
        console.error(error);
    }
}

export async function addAdoptPet(userId, petId) {
    try {
        const response = await axios.patch(baseUrl + "/users/" + userId + "/adopted", {
            petId: petId
        });
        const data = response.data;
        return data;
    } catch (error) {
        console.error(error);
    }
}

export async function deleteSavedPet(userId, petId) {
    try {
        const response = await axios.delete(baseUrl + "/users/" + userId + "/saved", {
            data: {
                petId: petId
            }
        });
        const data = response.data;
        return data;
    } catch (error) {
        console.error(error);
    }
}

export async function deleteFosteredPet(userId, petId) {
    try {
        const response = await axios.delete(baseUrl + "/users/" + userId + "/fostered", {
            data: {
                petId: petId
            }
        });
        const data = response.data;
        return data;
    } catch (error) {
        console.error(error);
    }
}

export async function deleteAdoptedPet(userId, petId) {
    try {
        const response = await axios.delete(baseUrl + "/users/" + userId + "/adopted", {
            data: {
                petId: petId
            }
        });
        const data = response.data;
        return data;
    } catch (error) {
        console.error(error);
    }
}

export async function addPet(pet) {
    try {
        const response = await axios.post(baseUrl + "/pets/addpet", {
            name: pet.name,
            type: pet.type,
            breed: pet.breed,
            color: pet.color,
            bio: pet.bio,
            adoption: pet.adoption,
            height: pet.height,
            weight: pet.weight,
            hypo: pet.hypo,
            diet: pet.diet,
            images: pet.images
        });
        const data = response.data;
        return data;
    } catch (error) {
        console.error(error);
    }
}

export async function updatePet(pet) {
    try {
        const response = await axios.patch(baseUrl + "/pets/" + pet.id, {
            name: pet.name,
            type: pet.type,
            breed: pet.breed,
            color: pet.color,
            bio: pet.bio,
            height: pet.height,
            weight: pet.weight,
            hypo: pet.hypo,
            diet: pet.diet,
            images: pet.images,
        });
        const data = response.data;
        return data;
    } catch (error) {
        console.error(error);
    }
}

export async function deletePet(petId) {
    try {
        const response = await axios.delete(baseUrl + "/pets/" + petId, {
            data: {
                petId: petId
            }
        });
        const data = response.data;
        return data;
    } catch (error) {
        console.error(error);
    }
}

export async function getFosterUser(petId) {
    try {
        const response = await axios.get(baseUrl + "/pets/" + petId + "/foster")
        const data = response.data;
        return data;
    } catch (error) {
        console.error(error);
    }
}

export async function getAdoptUser(petId) {
    try {
        const response = await axios.get(baseUrl + "/pets/" + petId + "/adopt")
        const data = response.data;
        return data;
    } catch (error) {
        console.error(error);
    }
}

export async function postUserAction(action) {
    try {
        const response = await axios.post(baseUrl + "/actions", {
            userName: action.userName,
            petName: action.petName,
            petId: action.petId,
            action: action.action,
        });
        const data = response.data;
        return data;
    } catch (error) {
        console.error(error);
    }
}

export async function getUserAction() {
    try {
        const response = await axios.get(baseUrl + "/actions")
        const data = response.data;
        return data;
    } catch (error) {
        console.error(error);
    }
}
