import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import Auth from "./Auth";
const LogOut = (props) => {
  const history = useHistory();
  const handleRedirect = () => {
    history.push("/");
  };
  const { handleUserStatus } = props;

  useEffect(() => {
    fetch("http://localhost:9090/logout", {
      method: "post",
      async: true,
      crossDomain: true,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
    });
    Auth.logout(() => {
      history.replace("/");
    });
    handleUserStatus();
    handleRedirect();
    console.log("from logout");
  }, []);

  return null;
};
export default LogOut;
