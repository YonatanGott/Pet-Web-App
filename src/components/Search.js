import React, { useCallback, useEffect, useState } from "react";
import {
    getPetsByType,
    getPetsByStatus,
    getPetsBySize,
    getPetsByName,
    getAllPetsIds,
} from "../lib/api";
import PetsList from "./PetsList";
import { Select, Icon } from "react-materialize";

const Search = () => {
    const [searchTermType, setSearchTermType] = useState("");
    const [searchTermStatus, setSearchTermStatus] = useState("");
    const [searchTermName, setSearchTermName] = useState("");
    const [searchTermHeight, setSearchTermHeight] = useState("");
    const [searchTermWeight, setSearchTermWeight] = useState("");

    const [searchResults, setSearchResults] = useState([]);
    const [showType, setShowType] = useState(true);
    const [showName, setShowName] = useState(false);
    const [showSize, setShowSize] = useState(false);
    const [showStatus, setShowStatus] = useState(false);

    const handleSelectChange = (e) => {
        switch (e.target.value) {
            case "2":
                setShowName(true);
                setShowStatus(false);
                setShowSize(false);
                setShowType(false);
                break;
            case "3":
                setShowStatus(true);
                setShowSize(false);
                setShowType(false);
                setShowName(false);
                break;
            case "4":
                setShowSize(true);
                setShowType(false);
                setShowName(false);
                setShowStatus(false);
                break;
            default:
                setShowType(true);
                setShowName(false);
                setShowStatus(false);
                setShowSize(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        getSearchResultsType(searchTermType);
        getSearchResultsName(searchTermName);
        getSearchResultsStatus(searchTermStatus);
        getSearchResultsSize(searchTermHeight, searchTermWeight);
    };

    const handleChangeType = (e) => {
        setSearchTermType(e.target.value);
    };
    const handleChangeName = (e) => {
        setSearchTermName(e.target.value);
    };
    const handleChangeHeight = (e) => {
        setSearchTermHeight(e.target.value);
    };
    const handleChangeWeight = (e) => {
        setSearchTermWeight(e.target.value);
    };
    const handleRadioChange = (e) => {
        setSearchTermStatus(e.target.value);
    };

    const getSearchResultsType = async (searchTermType) => {
        if (showType) {
            const pets = await getPetsByType(searchTermType);
            setSearchResults(pets);
        }
    };
    const getSearchResultsName = async (searchTermName) => {
        if (showName) {
            const pets = await getPetsByName(searchTermName);
            setSearchResults(pets);
        }
    };
    const getSearchResultsStatus = async (searchTermStatus) => {
        if (showStatus) {
            const pets = await getPetsByStatus(searchTermStatus);
            setSearchResults(pets);
        }
    };

    const getSearchResultsSize = async (searchTermHeight, searchTermWeight) => {
        if (showSize) {
            const pets = await getPetsBySize(searchTermHeight, searchTermWeight);
            setSearchResults(pets);
        }
    };

    const getPets = useCallback(async () => {
        try {
            const pets = await getAllPetsIds();
            setSearchResults(pets);
        } catch (error) {
            console.error(error);
        }
    }, []);

    useEffect(() => {
        getPets();
    }, [getPets]);

    return (
        <div>
            <div className="section">
                <div className="row container ">
                    <div className="search-div col s12">
                        <h2 className="search-header center-align">Search All Pets</h2>
                        <div className="search-row row ">
                            <div className="select col s12 m3">
                                <Select
                                    className="select-menu "
                                    icon={<Icon>search</Icon>}
                                    id="Select-9"
                                    label="Choose Search Type"
                                    multiple={false}
                                    options={{
                                        classes: "",
                                        dropdownOptions: {
                                            alignment: "left",
                                            autoTrigger: true,
                                            closeOnClick: true,
                                            constrainWidth: true,
                                            coverTrigger: true,
                                            hover: false,
                                            inDuration: 150,
                                            onCloseEnd: null,
                                            onCloseStart: null,
                                            onOpenEnd: null,
                                            onOpenStart: null,
                                            outDuration: 250,
                                        },
                                    }}
                                    value="1"
                                    onChange={handleSelectChange}
                                >
                                    <option value="1">Pet Type</option>
                                    <option value="2">Pet Name</option>
                                    <option value="3">Pet Status</option>
                                    <option value="4">Pet Size</option>
                                </Select>
                            </div>
                            <div className="col s12 m9">
                                <form
                                    action="#"
                                    className="search-form row valign-wrapper"
                                    onSubmit={handleSubmit}
                                >
                                    {showType && (
                                        <div className="input-field col s10">
                                            <input
                                                id="search-type"
                                                type="search"
                                                required
                                                placeholder="Search Pet Type"
                                                value={searchTermType}
                                                onChange={handleChangeType}
                                            />
                                        </div>
                                    )}
                                    {showName && (
                                        <div className="input-field col s10">
                                            <input
                                                id="search-name"
                                                type="search"
                                                required
                                                placeholder="Search Pet Name"
                                                value={searchTermName}
                                                onChange={handleChangeName}
                                            />
                                        </div>
                                    )}{" "}
                                    {showStatus && (
                                        <div className="status-search col s10 ">
                                            <p>
                                                <label>
                                                    <input
                                                        name="group1"
                                                        type="radio"
                                                        value={3}
                                                        onChange={handleRadioChange}
                                                    />
                                                    <span>Available</span>
                                                </label>
                                                <label>
                                                    <input
                                                        name="group1"
                                                        type="radio"
                                                        value={2}
                                                        onChange={handleRadioChange}
                                                    />
                                                    <span>Fostered</span>
                                                </label>
                                                <label>
                                                    <input
                                                        name="group1"
                                                        type="radio"
                                                        value={1}
                                                        onChange={handleRadioChange}
                                                    />
                                                    <span>Adopted</span>
                                                </label>
                                            </p>
                                        </div>
                                    )}
                                    {showSize && (
                                        <>
                                            <div className="input-field col s5 ">
                                                <input
                                                    type="number"
                                                    id="pet-height-search"
                                                    name="height"
                                                    onChange={handleChangeHeight}
                                                />
                                                <label htmlFor="pet-height"> Max height in cm' </label>
                                            </div>
                                            <div className="input-field col s5 ">
                                                <input
                                                    type="number"
                                                    id="pet-weight-search"
                                                    name="weight"
                                                    onChange={handleChangeWeight}
                                                />
                                                <label htmlFor="pet-weight">Max weight in kg'</label>
                                            </div>
                                        </>
                                    )}
                                    <div className="col s2 ">
                                        <button
                                            className="btn waves-effect waves-light"
                                            type="submit"
                                        >
                                            Search
										</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col s12">
                    <PetsList list={searchResults} />
                </div>
            </div>
        </div>
    );
};

export default Search;
