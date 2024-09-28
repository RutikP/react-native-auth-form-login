import AuthContent from "../components/Auth/AuthContent";
import { useContext, useState } from "react";
import { login } from "../util/Auth";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import { AuthContext } from "../store/auth-context";

function LoginScreen() {
  const [isAuthenticating, setisAuthenticating] = useState(false);

    const authCtx = useContext(AuthContext);

  async function loginHandler({ email, password }) {
    setisAuthenticating(true);
    try {
      const token = await login(email, password);
      // Handle successful login (e.g., navigate to a different screen)
    //   console.log("Token  "+token);
      authCtx.authenticate(token);
    } catch (error) {
      alert(
        "Login failed: " +
          (error.response ? error.response.data.error.message : error.message)
      );
    } finally {
      setisAuthenticating(false);
    }
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Logging you in..." />;
  }

  return <AuthContent isLogin onAuthenticate={loginHandler} />;
}

export default LoginScreen;
