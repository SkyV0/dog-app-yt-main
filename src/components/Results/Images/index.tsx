import React from "react";
import { ImageList,ImageListItem } from "@mui/material";

interface Props {
  images: string[];
}

function Images({ images }: Props) {
  return (
    <ImageList role="Images" sx={{
      overflow: "auto",
      justifyContent: "center",
      display: "flex",
      flexWrap: "wrap",
      objectFit: "cover",
      cursor: "pointer"
    }} cols={ 
      images.length > 3 ? 3 : images.length
    }>
      {images?.map((image, index) => (
        <ImageListItem key={index}>
          <img src={image} alt="Dog" loading="lazy" />
        </ImageListItem>
      ))}
    </ImageList>
  );
}

export default Images;
