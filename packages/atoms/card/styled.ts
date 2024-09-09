import styled from "styled-components";

import Box from "../box";

export const StyledCard = styled(Box)`
  border-radius: ${p => p.theme.shape.borderRadius.lg};
  background-color: ${p => p.theme.palette.neutrals[9]};
  backdrop-filter: blur(10.5px);
  -webkit-backdrop-filter: blur(10.5px);
`;
