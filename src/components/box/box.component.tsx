import styled from 'styled-components';
import {
    space,
    color,
    typography,
    layout,
    border,
    ColorProps,
    SpaceProps,
    TypographyProps,
    LayoutProps,
    BorderProps,
} from 'styled-system';

type DivProps = ColorProps & SpaceProps & TypographyProps & LayoutProps & BorderProps;

const Box = styled.div<DivProps>`
    ${space}
    ${color}
  ${typography}
  ${layout}
  ${border}
`;

export { Box };
