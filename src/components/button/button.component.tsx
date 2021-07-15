import React, { FC, ButtonHTMLAttributes } from 'react';
import styled, { DefaultTheme } from 'styled-components';
import { Box } from '../box';
import './button.style.scss';
import { getColor } from 'helper/theme.helper';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    color?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
    theme?: DefaultTheme;
    className?: string;
}

const getThemeColor = (props: ButtonProps) => getColor(props);
const ButtonStyled = styled(Box)`
    background: ${getThemeColor};
    color: ${(props) => props.color !== 'default' && 'white'};
`;

const Button: FC<ButtonProps> = ({ children, className, ...rest }) => (
    <ButtonStyled
        as="button"
        className={`pehra__btn btn-${rest.color} ${className || ''}`}
        {...rest}
    >
        {children}
    </ButtonStyled>
);

Button.defaultProps = {
    color: 'default',
};
export { Button };
