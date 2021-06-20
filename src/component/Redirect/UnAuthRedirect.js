import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";

const UnAuthRedirect = () => {
  const [redirect, setRedirect] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setRedirect(true);
    }, 1000);
    setRedirect(false);
  }, []);
  return <>{redirect ? <Redirect to="/login" /> : null}</>;
};

export default UnAuthRedirect;
