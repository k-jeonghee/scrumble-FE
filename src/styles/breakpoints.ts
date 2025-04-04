import { css, SerializedStyles } from '@emotion/react';

export const breakpoints = {
  mobile: '375px',
  pc: '600px',
};

export const mobileMediaQuery = (styles: SerializedStyles) => css`
  @media (max-width: ${breakpoints.mobile}) {
    ${styles}
  }
`;

export const pcMediaQuery = (styles: SerializedStyles) => css`
  @media (min-width: ${breakpoints.pc}) {
    ${styles}
  }
`;
