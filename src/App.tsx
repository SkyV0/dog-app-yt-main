import { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import DogForm from "./components/DogForm";
import Loader from "./components/Loader";
import Results from "./components/Results";
import { fetchDogsData, fetchDogsSubBreed } from "./lib/api";
import { RootState } from "./reducers";
import { Container } from "@mui/material"

function App() {
  const [breedList, setBreedList] = useState(null);
  const [subBreedList, setSubBreedList] = useState([]);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const dogStore = useSelector((state: RootState) => state.app);

  const breedState = dogStore?.breed;
  const imageResultState = dogStore?.imageResults;

  const fetchData = useCallback(async () => {
    await fetchDogsData()
      .then((data) => {
        setBreedList(data?.message);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
    if (breedState !== "all") {
      await fetchDogsSubBreed(breedState)
        .then((data) => {
          setSubBreedList(data?.message);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [breedState]);

  useEffect(() => {
    fetchData();
  }, [breedState, fetchData]);

  if (isLoading) return <Loader />;
  if (!breedList) return <p>No Dogs Found</p>;

  return (
    <Container>
        <Container sx={{
        position: "absolute",
        pt:22
        }}>
        <DogForm
          breedList={breedList}
          subBreedList={subBreedList}
          setImages={setImages}
          setIsLoading={setIsLoading}
        />

          {imageResultState > 0 && <Results images={images} />}
          </Container>
    </Container>
  );
}

export default App;
