/* eslint-disable no-fallthrough */
import useBreeds from "../hooks/useBreeds";
import ImageGrid from "./ImageGrid";
import { get } from "lodash";
import { useState } from "react";

const BreedSelector = () => {
    const {
        selectedBreed,
        setSelectedBreed,
        selectedSubBreed,
        setSelectedSubBreed,
        setImgNumber,
        imgNumber,
        breedImages,
        allBreeds,
        fetchBreedImages,
    } = useBreeds();

    const [validationMessages, setValidationMessages] = useState([]);

    const validateAndFetch = () => {
        switch (true) {
            case !selectedBreed:
                validationMessages.push("Breed");
                setValidationMessages(validationMessages);

            case Object?.keys(allBreeds).length > 0 && !selectedSubBreed:
                validationMessages.push("Sub-Breed");

                setValidationMessages(validationMessages);

            case !imgNumber || imgNumber == 0:
                validationMessages.push("Number of images");

            default:
        }

        if (validationMessages?.length < 1) {
            fetchBreedImages();
        } else {
            setValidationMessages(validationMessages);
        }
    };

    return (
        <>
            <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
                <select
                    onChange={(e) => {
                        setSelectedBreed(e.target.value);
                    }}
                    value={selectedBreed}
                >
                    <option value=""> Select a breed</option>
                    {Object?.keys(allBreeds)?.map((breed) => {
                        return (
                            <option key={breed} value={breed}>
                                {breed}
                            </option>
                        );
                    })}
                </select>

                {Object?.keys(allBreeds).length > 0 && selectedBreed && get(allBreeds, selectedBreed, []).length > 0 ? (
                    <>
                        <select
                            onChange={(e) => {
                                setSelectedSubBreed(e.target.value);
                            }}
                            value={selectedSubBreed}
                        >
                            <option value=""> Select a Sub-breed</option>
                            {get(allBreeds, selectedBreed, []).map((breed) => {
                                return (
                                    <option key={breed} value={breed}>
                                        {breed}
                                    </option>
                                );
                            })}
                        </select>
                    </>
                ) : null}

                <select
                    onChange={(e) => {
                        setImgNumber(e.target.value);
                    }}
                    value={imgNumber}
                >
                    {Array.from(Array(10).keys()).map((number) => {
                        return (
                            <option key={number} value={number}>
                                {number}
                            </option>
                        );
                    })}
                </select>

                <button type="button" onClick={validateAndFetch}>
                    View Images
                </button>
            </div>

            {validationMessages?.map((field) => {
                console.log({ field });
                return <div key={field}>{field} - field must be selected</div>;
            })}

            <div style={{ marginTop: "50px" }}>
                <ImageGrid images={breedImages} />
            </div>
        </>
    );
};

export default BreedSelector;
