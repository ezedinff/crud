import React from 'react';
import Typography from '@material-ui/core/Typography';
import useStyle from '../../hooks/use-style';
const styles = {
  label: {
    textTransform: 'capitalize',
    fontWeight: 'bold',
  },
};
const FormElement: React.FC<{ label: string }> = ({ label, children }) => {
  const classes = useStyle(styles);
  return (
    <>
      <Typography
        className={classes.label}
        variant="subtitle1"
        component={'label'}
      >
        {label}
      </Typography>
      {children}
    </>
  );
};

export default FormElement;
