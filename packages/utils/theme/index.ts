import lightPalette from "./lightPalette";
import darkPalette from "./darkPalette";
import spacing from "./spacing";
import size from "./size";
import shape from "./shape";
import typography from "./typography";

const dark = {
  palette: darkPalette,
  spacing,
  size,
  shape,
  typography,
};

const light = {
  palette: lightPalette,
  spacing,
  size,
  shape,
  typography,
};

const theme = {
  light,
  dark,
};

export default theme;
