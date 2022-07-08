import { useState, useEffect } from "react";
import axios from "axios";

const useBreeds = () => {
    const [allBreeds, setAllBreeds] = useState([]);
    const [selectedBreed, setSelectedBreed] = useState();
    const [selectedSubBreed, setSelectedSubBreed] = useState();
    const [breedImages, setBreedImages] = useState();
    const [imgNumber, setImgNumber] = useState(0);

    useEffect(() => {
        fetchAllBreeds();
    }, []);

    const fetchAllBreeds = async () => {
        await axios
            .get("https://dog.ceo/api/breeds/list/all")
            .then((res) => {
                setAllBreeds(res?.data?.message);
            })
            .catch();
    };

    const fetchBreedImages = async () => {
        const subBreedSlug = setSelectedBreed ? "/" + selectedSubBreed : "";

        console.log({ selectedBreed, subBreedSlug, imgNumber });

        await axios
            .get(`https://dog.ceo/api/breed/${selectedBreed}${subBreedSlug}/images/random/${imgNumber}`)
            .then((res) => {
                setBreedImages(res?.data?.message);
            })
            .catch();
    };

    return {
        allBreeds,
        selectedBreed,
        setSelectedBreed,
        selectedSubBreed,
        setSelectedSubBreed,
        breedImages,
        fetchBreedImages,
        imgNumber,
        setImgNumber,
    };
};

export default useBreeds;
