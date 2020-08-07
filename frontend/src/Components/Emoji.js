/**
 * This component makes it easier for emojis to be used in React
 * src: https://medium.com/@seanmcp/%EF%B8%8F-how-to-use-emojis-in-react-d23bbf608bf7
 * props:
 *  - symbol: The emoji to be displayed
 *  - label: What the emoji is
 */
import React from "react";
import PropTypes from "prop-types";

function Emoji(props) {
  return (
    <span
      className="emoji"
      role="img"
      aria-label={props.label ? props.label : ""}
      aria-hidden={props.label ? "false" : "true"}
    >
      {props.symbol}
    </span>
  );
}

Emoji.propTypes = {
  label: PropTypes.string,
  symbol: PropTypes.string.isRequired,
};

export default Emoji;
