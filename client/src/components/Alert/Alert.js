import React from "react";
import { useSelector } from "react-redux";

const Alert = () => {
  const alert = useSelector((state) => state.alert.alert);
  return <div className="alert">{alert}</div>;
};

export default Alert;
