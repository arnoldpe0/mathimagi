import React from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import MuiLink from "@material-ui/core/Link";
import ProTip from "../src/ProTip";
import Link from "../src/Link";

import { FirebaseContext } from "../src/components/Firebase";

function Hot() {
  return (
    <FirebaseContext.Consumer>
      {firebase => {
        return <div>I've access to Firebase and render something.</div>;
      }}
    </FirebaseContext.Consumer>
  );
}

export default function Index() {
  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Next.js example
        </Typography>
        <Link href="/about" color="secondary">
          Go to the about page
        </Link>
        <ProTip />
        <Hot />
      </Box>
    </Container>
  );
}
