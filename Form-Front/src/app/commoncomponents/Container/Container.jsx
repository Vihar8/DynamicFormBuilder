import React from "react";
import classes from "./Container.module.scss";

const Container = ({ children, classname }) => (
  <div className={`${classes.Container} ${classname || undefined}`}>{children}</div>
);

export default Container;