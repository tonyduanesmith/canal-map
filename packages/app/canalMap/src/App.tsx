import { ThemeProvider } from "styled-components";

import Main from "../../../pages/main";
import "./App.css";
import theme from "../../../utils/theme";
import { useIsMapkitLoaded } from "../../../utils/helpers/hooks";
import Box from "../../../atoms/box";
import Spinner from "../../../atoms/spinner";

function App() {
  const isLoaded = useIsMapkitLoaded({ token: import.meta.env.VITE_TOKEN });

  console.log(isLoaded);

  return (
    <ThemeProvider theme={theme.dark}>
      {isLoaded ? (
        <Main isLoaded={isLoaded} />
      ) : (
        <Box height="100%" width="100%" display="flex" alignItems="center" justifyContent="center">
          <Spinner />
        </Box>
      )}
    </ThemeProvider>
  );
}

export default App;
