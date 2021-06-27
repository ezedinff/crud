import React from "react";
import { Button, ButtonProps, makeStyles, withStyles } from "@material-ui/core";
import { Theme } from '@material-ui/core';
const useStyles = makeStyles((theme: Theme) => ({
    default: {
        backgroundColor: theme.palette.primary.main,
    },
    add: {
        backgroundColor: theme.palette.success.main,
        color: theme.palette.error.contrastText,
        "&:hover":{
            backgroundColor: theme.palette.success.dark
        },
        "&:disabled":{
            backgroundColor: theme.palette.success.light
        }
    },
    edit: {
        backgroundColor: theme.palette.warning.main,
        color: theme.palette.error.contrastText,
        "&:hover":{
            backgroundColor: theme.palette.warning.dark
        },
        "&:disabled":{
            backgroundColor: theme.palette.warning.light
        }
    },
    delete: {
        backgroundColor: theme.palette.error.main,
        color: theme.palette.error.contrastText,
        "&:hover":{
            backgroundColor: theme.palette.error.dark
        },
        "&:disabled":{
            backgroundColor: theme.palette.error.light
        }
    }
  }));
interface CustomButtonProps extends Partial<ButtonProps> {
    buttonType: "add" | "default" | "edit" | "delete"
}
const CustomButton: React.FC<CustomButtonProps> = ({buttonType, ...rest}) => {
    const classes = useStyles();
    return <Button {...rest} variant="contained" className={classes[buttonType]}></Button>
}
export default CustomButton;