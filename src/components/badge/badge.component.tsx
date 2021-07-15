import React, { FC, HTMLAttributes } from 'react';
import { Box } from 'components/box';
import styled from 'styled-components';
import './badge.style.scss';
import { getColor } from 'helper/theme.helper';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
    color?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
    className?: string;
}

const getThemeColor = (props: BadgeProps) => getColor(props);

const BadgeStyled = styled(Box)`
    background: ${getThemeColor};
    color: ${(props) => props.color !== 'default' && 'white'};
`;

const Badge: FC<BadgeProps> = ({ children, ...rest }) => (
    <BadgeStyled
        as="span"
        className={`pehra__badge-default badge-${rest.color} ${rest.className || ''}`}
        {...rest}
    >
        {children}
    </BadgeStyled>
);

Badge.defaultProps = {
    color: 'default',
};

export { Badge };
