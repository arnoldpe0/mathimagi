import React from "react";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Readings from "../src/Readings";


export default function Index() {

  return (
    <Container maxWidth="md">
      <Box my={4}><Readings /></Box>
    </Container>
  );
}
