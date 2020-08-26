import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    // margin: theme.spacing(2),
    "&:hover": {
      color: "#1ED761",
    },
  },
}));

export default function Button1(props) {
  const classes = useStyles();
  return (
    <Button {...props} className={classes.root}>
      {props.label}
    </Button>
  );
}
