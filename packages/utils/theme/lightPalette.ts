import { lighten, darken } from "polished";

const palette = {
  background: {
    default: "#EFEEEE",
  },
  neutrals: {
    "0": "#ffffff",
    "1": "#fafbfb",
    "2": "#f8f8f8",
    "3": "#f4f4f4",
    "4": "#ededed",
    "5": "#e8e9e9",
    "6": "#e4e4e4",
    "7": "#dbdbdc",
    "8": "#d2d2d3",
    "9": "#c9c9ca",
    "10": "#c4c5c6",
    "11": "#bbbcbd",
    "12": "#b0b1b2",
    "13": "#a4a5a7",
    "14": "#999a9c",
    "15": "#898b8c",
    "16": "#77797a",
    "17": "#606264",
    "18": "#494c4e",
    "19": "#333538",
    "20": "#1c1f22",
  },
  variants: {
    danger: {
      main: "rgb(255, 69,58)",
      light: lighten(0.2, "rgb(255, 69,58)"),
      dark: darken(0.2, "rgb(255, 69,58)"),
    },
    primary: {
      main: "rgb(10, 132, 255)",
      light: lighten(0.2, "rgb(10, 132, 255)"),
      dark: darken(0.2, "rgb(10, 132, 255)"),
    },
    secondary: {
      main: "rgb(100,210,255)",
      light: lighten(0.2, "rgb(100,210,255)"),
      dark: darken(0.2, "rgb(100,210,255)"),
    },
    tertiary: {
      main: "rgba(255, 255, 255, 0.87)",
      light: lighten(0.2, "rgba(255, 255, 255, 0.87)"),
      dark: darken(0.1, "rgba(255, 255, 255, 0.87)"),
    },
  },
  system: {
    blue: {
      main: "rgb(0, 122, 255)",
      light: lighten(0.2, "rgb(0, 122, 255)"),
      dark: darken(0.2, "rgb(0, 122, 255)"),
    },
    green: {
      main: "rgb(52,199,89",
      light: lighten(0.2, "rgb(52,199,89)"),
      dark: darken(0.2, "rgb(52,199,89)"),
    },
    indigo: {
      main: "rgb(88,86,214)",
      light: lighten(0.2, "rgb(88,86,214)"),
      dark: darken(0.2, "rgb(88,86,214)"),
    },
    orange: {
      main: "rgb(255,149,0)",
      light: lighten(0.2, "rgb(255,149,0)"),
      dark: darken(0.2, "rgb(255,149,0)"),
    },
    pink: {
      main: "rgb(255,45,85)",
      light: lighten(0.2, "rgb(255,45,85)"),
      dark: darken(0.2, "rgb(255,45,85)"),
    },
    purple: {
      main: "rgb(175,82,222)",
      light: lighten(0.2, "rgb(175,82,222)"),
      dark: darken(0.2, "rgb(175,82,222)"),
    },
    red: {
      main: "rgb(255, 59,48)",
      light: lighten(0.2, "rgb(255, 59,48)"),
      dark: darken(0.2, "rgb(255, 59,48)"),
    },
    teal: {
      main: "rgb(90,200,250)",
      light: lighten(0.2, "rgb(90,200,250)"),
      dark: darken(0.2, "rgb(90,200,250)"),
    },
    yellow: {
      main: "rgb(255,204,0)",
      light: lighten(0.2, "rgb(255,204,0)"),
      dark: darken(0.2, "rgb(255,204,0)"),
    },
    black: {
      main: "rgb(0,0,0)",
      light: lighten(0.2, "rgb(0,0,0)"),
      dark: darken(0.2, "rgb(0,0,0)"),
    },
  },
  common: {
    black: "#000",
    white: "#fff",
  },
  primary: {
    main: "rgb(255,149,0)",
  },
  secondary: {
    main: "rgb(90,200,250)",
  },
  shadow: [
    "2px 2px 6px 0 rgba(255, 255, 255, 0.93), 2px 2px 6px 0 rgba(217, 210, 200, 0.71)",
    "-4px -4px 8px 0 rgba(255, 255, 255, 0.93), 4px 4px 8px 0 rgba(217, 210, 200, 0.71)",
    "-6px -6px 12px 0 rgba(255, 255, 255, 0.93), 6px 6px 12px 0 rgba(217, 210, 200, 0.71)",
  ],
  insetShadow: [
    "inset 2px 2px 6px 0 rgba(255, 255, 255, 0.93), inset 2px 2px 6px 0 rgba(217, 210, 200, 0.71)",
    "inset -4px -4px 8px 0 rgba(255, 255, 255, 0.93), inset 4px 4px 8px 0 rgba(217, 210, 200, 0.71)",
    "inset -6px -6px 12px 0 rgba(255, 255, 255, 0.93), inset 6px 6px 12px 0 rgba(217, 210, 200, 0.71)",
  ],
  divider: "rgba(255,255,255,0.1)",
};
export default palette;
