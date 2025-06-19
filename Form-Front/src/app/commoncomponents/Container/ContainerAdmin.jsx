import React from "react";
import classes from "./Container.module.scss";

const ContainerAdmin = ({ children, classname }) => (
  <div className={`${classes.ContainerAdmin} ${classname || undefined}`}>{children}</div>
);

export default ContainerAdmin;