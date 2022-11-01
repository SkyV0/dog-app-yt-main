import React from "react";
import { Container, Typography, AppBar } from "@mui/material";
import orange from "@mui/material/colors/orange";

function Header() {
  return (
    <AppBar role="Header" sx={{
      display: "flex",
      backgroundColor: orange[800]
    }}>
      <Container sx={{
        display: "flex",
        justifyContent: "left",
        alignItems: "center",
        gap: 10,
        height: "100%",
        width: "100%"
      }}>
        <img src="https://dog.ceo/img/dog-api-logo.svg" alt="Dog Poster Generator" />
        <Typography variant="h1" sx={{
          color: "black",
          fontWeight: "bold",
          fontSize: "3rem"
        }}>Dog Poster Generator</Typography>
      </Container>
    </AppBar>
  );
}

export default Header;
