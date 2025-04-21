/** TAC SERVICE BOOKING APP - CUSTOM REACT HOOK FOR CREATING USER ACCOUNT **/

import { useNavigate } from "react-router-dom";
import { useAuthContext } from "./useAuthContext";

export const useCreateAcc = () => {
  const navigate = useNavigate();
  const { dispatch } = useAuthContext();

  const createAcc = async (createAccCredentials) => {
    const { rememberMe, ...createAccCredentialsToSend } = createAccCredentials;

    try {
      const response = await fetch("http://localhost:8080/api/create-acc", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(createAccCredentialsToSend),
      });

      const json = await response.json();
      console.log(json);

      if (response.ok) {
        navigate("/");
        if (rememberMe) {
          // If "rememberMe" is checked - save the relevant user details to local storage when the user creates account successfully.
          localStorage.setItem("user", JSON.stringify(json));
        } else {
          // If "Remember Me" is not checked, remove the preference from localStorage
          localStorage.removeItem("user");
        }

        // update the auth context global state.
        dispatch({ type: "LOGIN", payload: json });
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  return { createAcc };
};
