import lightPalette from "./lightPalette";
import darkPalette from "./darkPalette";
import spacing from "./spacing";
import size from "./size";
import shape from "./shape";
import typography from "./typography";
import font from "./font";

const dark = {
  palette: darkPalette,
  spacing,
  size,
  shape,
  typography,
  font,
};

const light = {
  palette: lightPalette,
  spacing,
  size,
  shape,
  typography,
  font,
};

const theme = {
  light,
  dark,
};

export default theme;
