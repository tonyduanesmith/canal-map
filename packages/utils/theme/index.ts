import lightPalette from "./lightPalette";
import darkPalette, { PaletteType } from "./darkPalette";
import spacing, { SpacingType } from "./spacing";
import size, { SizingType } from "./size";
import shape, { ShapeType } from "./shape";
import typography, { TypographyType } from "./typography";

export type ThemeSelectionType = {
  light: ThemeType;
  dark: ThemeType;
};

export type ThemeType = {
  size: SizingType;
  spacing: SpacingType;
  shape: ShapeType;
  typography: TypographyType;
  palette: PaletteType;
};

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
