import axios from "axios";
import { useAuthContext } from "../app/context/AuthContext";

interface SignIn {
  email: string;
  password: string;
}

const useAuth = () => {
  const [data, loading, error, setAuthState] = useAuthContext();
  const signIn = async ({ email, password }: SignIn) => {
    setAuthState({ data: null, error: null, loading: true });
    try {
      const response = await axios.post("http://localhost:3000/api/auth/signin", { email, password });
      setAuthState({ data: response.data, error: null, loading: false });
    } catch (error: any) {
      setAuthState({ data: null, error: error.response.data.errorMessage, loading: false });
    }
  };

  const signUp = async () => {};

  return { signIn, signUp };
};

export default useAuth;
