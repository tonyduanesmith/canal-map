import { lighten, darken } from "polished";

export default {
  background: {
    default: "#282C34",
  },
  neutrals: {
    "0": "#1c1f22",
    "1": "#212326",
    "2": "#232629",
    "3": "#272a2d",
    "4": "#2e3134",
    "5": "#333538",
    "6": "#373a3d",
    "7": "#404345",
    "8": "#494c4e",
    "9": "#525557",
    "10": "#57595b",
    "11": "#606264",
    "12": "#6b6d6f",
    "13": "#77797a",
    "14": "#828485",
    "15": "#929395",
    "16": "#a4a5a7",
    "17": "#bbbcbd",
    "18": "#d2d2d3",
    "19": "#e8e9e9",
    "20": "#ffffff",
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
      main: "rgb(10, 132, 255)",
      light: lighten(0.2, "rgb(10, 132, 255)"),
      dark: darken(0.2, "rgb(10, 132, 255)"),
    },
    green: {
      main: "rgb(48,209,88)",
      light: lighten(0.2, "rgb(48,209,88)"),
      dark: darken(0.2, "rgb(48,209,88)"),
    },
    indigo: {
      main: "rgb(94,92,230)",
      light: lighten(0.2, "rgb(94,92,230)"),
      dark: darken(0.2, "rgb(94,92,230)"),
    },
    orange: {
      main: "rgb(255,159,10)",
      light: lighten(0.2, "rgb(255,159,10)"),
      dark: darken(0.2, "rgb(255,159,10)"),
    },
    pink: {
      main: "rgb(255,55,95)",
      light: lighten(0.2, "rgb(255,55,95)"),
      dark: darken(0.2, "rgb(255,55,95)"),
    },
    purple: {
      main: "rgb(191,90,242)",
      light: lighten(0.2, "rgb(191,90,242)"),
      dark: darken(0.2, "rgb(191,90,242)"),
    },
    red: {
      main: "rgb(255, 69,58)",
      light: lighten(0.2, "rgb(255, 69,58)"),
      dark: darken(0.2, "rgb(255, 69,58)"),
    },
    teal: {
      main: "rgb(100,210,255)",
      light: lighten(0.2, "rgb(100,210,255)"),
      dark: darken(0.2, "rgb(100,210,255)"),
    },
    yellow: {
      main: "rgb(255,214,10)",
      light: lighten(0.2, "rgb(255,214,10)"),
      dark: darken(0.2, "rgb(255,214,10)"),
    },
  },
  common: {
    black: "#000",
    white: "#fff",
  },
  shadow: [
    "2px 2px 6px 0 rgba(255, 255, 255, 0.06), 2px 2px 6px 0 rgba(18, 25, 35, 0.93)",
    "-4px -4px 8px 0 rgba(255, 255, 255, 0.06), 4px 4px 8px 0 rgba(18, 25, 35, 0.93)",
    "-6px -6px 12px 0 rgba(255, 255, 255, 0.06), 6px 6px 12px 0 rgba(18, 25, 35, 0.93)",
  ],
  insetShadow: [
    "inset 2px 2px 6px 0 rgba(18, 25, 35, 0.93),inset 2px 2px 6px 0 rgba(255, 255, 255, 0.06)",
    "inset 4px 4px 8px 0 rgba(18, 25, 35, 0.93), inset -4px -4px 8px 0 rgba(255, 255, 255, 0.06)",
    "inset 6px 6px 12px 0 rgba(18, 25, 35, 0.93), inset -6px -6px 12px 0 rgba(255, 255, 255, 0.06)",
  ],
  divider: "rgba(0, 0, 0, 0.1)",
};
