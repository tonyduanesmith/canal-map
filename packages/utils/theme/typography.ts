const typography = {
  fontSize: {
    sm: "0.75rem",
    md: "1rem",
    lg: "1.25rem",
    h1: "2rem",
    h2: "1.5rem",
    h3: "1.25rem",
    h4: "1rem",
    h5: "0.875rem",
    h6: "0.75rem",
    subtitle: "1rem",
  },
  fontFamily: {
    primary: "Roboto",
    secondary: "Arial",
  },
  fontWeight: {
    light: 300,
    regular: 400,
    medium: 500,
    bold: 700,
  },
};

export default typography;
type FontSizeType = typeof typography.fontSize;
type FontFamilyType = typeof typography.fontFamily;
type FontWeightType = typeof typography.fontWeight;
export type TypographyType = {
  fontSize: FontSizeType;
  fontFamily: FontFamilyType;
  fontWeight: FontWeightType;
};
