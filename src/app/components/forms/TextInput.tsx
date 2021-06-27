import React from 'react';
import {
  Box,
  Typography,
  OutlinedTextFieldProps,
  TextField,
} from '@material-ui/core';
import useStyle from '../../hooks/use-style';
import theme from 'theme';
const styles = {
  root: {
    '&>*': {
      minWidth: '100%',
    },
  },
  label: {
    textTransform: 'capitalize',
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: theme.palette.grey[200],
    '&>div>input::placeholder': {
      color: theme.palette.grey[700],
      opacity: '1',
    },
    '&>.MuiFormHelperText-root': {
      backgroundColor: 'white',
      width: '100%',
      position: 'relative',
      left: '-14px',
      paddingLeft: '14px',
    },
  },
};
interface TextInputProps extends Partial<OutlinedTextFieldProps> {
  label: string;
  name: string;
  example?: string;
}
const TextInput: React.FC<TextInputProps> = ({ example, label, ...rest }) => {
  const classes = useStyle(styles);
  return (
    <Box className={classes.root}>
      <TextField
        className={classes.input}
        placeholder={example || label}
        variant="outlined"
        size="small"
        {...rest}
      />
    </Box>
  );
};

export default TextInput;