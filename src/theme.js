import { createMuiTheme } from "@material-ui/core/styles";

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#2EC4B6"
    },
    secondary: {
      main: "#FF9F1C"
    },
    error: {
      main: "#E71D36"
    },
    background: {
      default: "#FDFFFC"
    }
  }
});

export default theme;
