import React from "react";
import PropTypes from "prop-types";
import classes from "./BadgeStatus.module.scss";

const BadgeStatus = ({ variant, children }) => (
  <span className={`${classes.badgedefault} ${classes[variant || "info"]}`}>
    {children}
  </span>
);

BadgeStatus.propTypes = {
  variant: PropTypes.oneOf(["info", "warning", "active", "deactive"]),
  children: PropTypes.node.isRequired,
};

export default BadgeStatus;
