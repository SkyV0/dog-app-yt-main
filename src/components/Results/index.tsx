import React from "react";
import DogInfo from "./DogInfo";
import Images from "./Images";
import { Container } from "@mui/material";

interface Props {
  images: string[];
}

function Results({ images }: Props) {
  return (
    <Container sx={{
      display: "flex",
      flexDirection: "column",
      backgroundColor: "white",
      height: "100%",
      width: "100%",
      textAlign: "center",
      borderRadius: "10px"
    }}>
      <h1>Gallery</h1>
      <DogInfo />
      <Images images={images} />
    </Container>
  );
}

export default Results;
