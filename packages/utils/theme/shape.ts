const shape = {
  borderRadius: {
    sm: "4px",
    md: "8px",
    lg: "12px",
  },
};

export default shape;
export type BorderRadiusType = typeof shape.borderRadius;
export type ShapeType = {
  borderRadius: BorderRadiusType;
};
