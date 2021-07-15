/* eslint-disable @typescript-eslint/no-explicit-any */
export const getColor = (props: any) => {
    switch (props.color) {
        case 'primary':
            return (themeProps: any) => themeProps.theme.color.primaryColor;
        case 'success':
            return (themeProps: any) => themeProps.theme.color.successColor;
        case 'warning':
            return (themeProps: any) => themeProps.theme.color.warningColor;
        case 'danger':
            return (themeProps: any) => themeProps.theme.color.dangerColor;
        default:
            return (themeProps: any) => themeProps.theme.color.defaultColor;
    }
};
