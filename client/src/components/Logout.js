import React, { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../App";

const Logout = () => {
  // promises
  const { state, dispatch } = useContext(UserContext);
  const history = useHistory();

  useEffect(async () => {
    try {
      const res = await fetch("/logout", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (res.ok) {
        dispatch({ type: "USER", payload: false });
        history.push("/login", { replace: true });
      } else {
        const error = new Error(res.statusText);
        throw error;
      }
    } catch (error) {
      console.error("Logout error:", error.message);
    }
  }, []);

  return (
    <>
      <h1>Logout Page</h1>
    </>
  );
};

export default Logout;
