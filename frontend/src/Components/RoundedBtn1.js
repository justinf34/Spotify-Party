import React from "react";

import Button from "@material-ui/core/Button";
import { styled } from "@material-ui/core/styles";

import PropTypes from "prop-types";

const StyledButton = styled(Button)({
  background: "#1ED761",
  border: 0,
  borderRadius: 25,
  color: "white",
  height: 48,
  padding: "0 50px",
});

export default function RoundedBtn1(props) {
  return (
    <StyledButton
      {...(props.href ? { href: props.href } : {})}
      {...(props.onClick ? { onClick: props.onClick } : {})}
      variant="contained"
    >
      {props.label}
    </StyledButton>
  );
}

RoundedBtn1.propTypes = {
  label: PropTypes.string.isRequired,
  href: PropTypes.string,
  onClick: PropTypes.func,
};

RoundedBtn1.defaultPropts = {
  href: null,
  onClick: null,
};
