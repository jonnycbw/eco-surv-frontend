/* eslint-disable no-fallthrough */
import useBreeds from "../hooks/useBreeds";
import ImageGrid from "./ImageGrid";
import { get, isEmpty } from "lodash";
import { useState, useCallback, useRef } from "react";
import party from "party-js";
import { useEffect } from "react";

const BreedSelector = () => {
    const {
        selectedBreed,
        setSelectedBreed,
        selectedSubBreed,
        setSelectedSubBreed,
        setImgNumber,
        imgNumber,
        breedImages,
        setBreedImages,
        allBreeds,
        fetchBreedImages,
    } = useBreeds();

    const [validationMessages, setValidationMessages] = useState([]);
    const partyRef = useRef();

    const validateAndFetch = useCallback(() => {
        const newValidation = [];

        if (isEmpty(selectedBreed)) {
            newValidation.push("breed");
        }

        if (selectedBreed && get(allBreeds, selectedBreed, []).length > 0 && !selectedSubBreed) {
            newValidation.push("sub-breed");
        }

        if (imgNumber == 0 || !imgNumber) {
            newValidation.push("img-number");
        }

        if (newValidation?.length < 1) {
            // reset the validation
            setValidationMessages([]);
            // nice surrpise to show a success
            party.confetti(partyRef.current);
            fetchBreedImages();
        } else {
            setBreedImages([]);
            setValidationMessages(newValidation);
        }
    }, [selectedBreed, selectedSubBreed, imgNumber, partyRef]);

    useEffect(() => {
        console.log({ validationMessages });
    }, [validationMessages]);

    return (
        <>
            <div style={{ display: "flex", flexDirection: "row", gap: "10px", flexWrap: "wrap" }}>
                <select
                    onChange={(e) => {
                        setSelectedBreed(e.target.value);
                    }}
                    value={selectedBreed}
                    style={{ border: validationMessages?.includes("breed") ? "solid red 1px" : "solid 1px black" }}
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
                            style={{ border: validationMessages?.includes("sub-breed") ? "solid red 1px" : "solid 1px black" }}
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
                    style={{ border: validationMessages?.includes("img-number") ? "solid red 1px" : "solid 1px black" }}
                >
                    {Array.from(Array(10).keys()).map((number) => {
                        return (
                            <option key={number} value={number}>
                                {number}
                            </option>
                        );
                    })}
                </select>

                <button
                    ref={partyRef}
                    type="button"
                    style={{ background: "#7f8c8d", color: "white", border: "none", cursor: "pointer" }}
                    onClick={() => validateAndFetch()}
                >
                    View Images
                </button>
            </div>

            <div style={{ marginTop: "50px" }}>
                <ImageGrid images={breedImages} />
            </div>
        </>
    );
};

export default BreedSelector;
