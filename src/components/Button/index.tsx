import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchBreedImages, fetchSubBreedImages } from "../../lib/api";
import { RootState } from "../../reducers";
import { ActionType } from "../../types/reducer";
import { Button as MuiButton } from "@mui/material";
import { orange, grey, green, red } from "@mui/material/colors";

interface Props {
  setImages: React.Dispatch<React.SetStateAction<never[]>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

function Button({ setImages, setIsLoading }: Props) {
  const dispatch = useDispatch();

  const dogStore = useSelector((state: RootState) => state.app);

  const breedState = dogStore?.breed;
  const subBreedState = dogStore?.subBreed;
  const numberState = dogStore?.number;

  const handleImagesFetch = async () => {
    if (breedState === "all") {
      dispatch({
        type: ActionType.ERROR,
        payload: true,
      });
    }
    if (breedState !== "all" && subBreedState === "all") {
      await fetchBreedImages(breedState, numberState)
        .then((data) => {
          if (data?.status === "success" && data?.message?.length) {
            setImages(data?.message);
            setIsLoading(false);
            dispatch({
              type: ActionType.IMAGE_RESULTS,
              payload: data?.message.length,
            });
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
    if (breedState !== "all" && subBreedState !== "all") {
      await fetchSubBreedImages(breedState, subBreedState, numberState)
        .then((data) => {
          if (data?.status === "success" && data?.message?.length) {
            setImages(data?.message);
            setIsLoading(false);
            dispatch({
              type: ActionType.IMAGE_RESULTS,
              payload: data?.message.length,
            });
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
    <>
      <MuiButton role="button" onClick={() => handleImagesFetch()} sx={{
        color: grey[900],
        variant: "contained",
        backgroundColor: orange[800],
        "&:hover": {
          backgroundColor: green[500],
        }
      }}>
        Search Dogs
      </MuiButton>
      <MuiButton
        role="button"
        onClick={() => {
          dispatch({
            type: ActionType.RESET,
          });
        }}
        sx={{
         color: grey[900],
        variant: "contained",
        backgroundColor: orange[800],
        "&:hover": {
          backgroundColor: red[500],
        }
        }}
      >
        Reset Search
      </MuiButton>
    </>
  );
}

export default Button;
