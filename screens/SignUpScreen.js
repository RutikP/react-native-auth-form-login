import { useContext, useState } from "react";
import AuthContent from "../components/Auth/AuthContent";
import { createUser } from "../util/Auth";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import { AuthContext } from "../store/auth-context";

function SignUpScreen() {
  const [isAuthenticating, setisAuthenticating] = useState(false);

  const authCtx = useContext(AuthContext);

  async function signupHandler({ email, password }) {
    setisAuthenticating(true);
    try {
      const token = await createUser(email, password);
      // Handle successful signup (e.g., navigate to a different screen)
      authCtx.authenticate(token);
    } catch (error) {
      alert(
        "Sign up failed: " +
          (error.response ? error.response.data.error.message : error.message)
      );
    } finally {
      setisAuthenticating(false);
    }
  }
  if (isAuthenticating) {
    return <LoadingOverlay message="Creating User..." />;
  }
  return <AuthContent onAuthenticate={signupHandler} />;
}

export default SignUpScreen;
