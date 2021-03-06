import styled from "styled-components";

import { whiteSmoke } from "styles/colors";

export const Hr = styled.hr`
  margin: 20px 0;
  border: none;
  border-top: solid 2px ${whiteSmoke};
`;

export const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`;
