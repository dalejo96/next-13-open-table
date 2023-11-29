import axios from "axios";
import { deleteCookie } from "cookies-next";
import { useAuthContext } from "../app/context/AuthContext";

interface SignIn {
  email: string;
  password: string;
  handleClose: () => void;
}

interface SignUp {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  city: string;
  phone: string;
  handleClose: () => void;
}

const useAuth = () => {
  const { data, loading, error, setAuthState } = useAuthContext();
  const signIn = async ({ email, password, handleClose }: SignIn) => {
    setAuthState({ data: null, error: null, loading: true });
    try {
      const response = await axios.post("http://localhost:3000/api/auth/signin", { email, password });
      setAuthState({ data: response.data, error: null, loading: false });
      console.log(response)
      //handleClose();
    } catch (error: any) {
      setAuthState({ data: null, error: error.response.data.errorMessage, loading: false });
    }
  };

  const signUp = async ({ email, password, firstName, lastName, city, phone, handleClose }: SignUp) => {
    setAuthState({ data: null, error: null, loading: true });
    try {
      const response = await axios.post("http://localhost:3000/api/auth/signup", {
        email,
        password,
        firstName,
        lastName,
        city,
        phone,
      });
      setAuthState({ data: response.data, error: null, loading: false });
      handleClose();
    } catch (error: any) {
      setAuthState({ data: null, error: error.response.data.errorMessage, loading: false });
    }
  };

  const signOut = () => {
    deleteCookie("jwt");
    setAuthState({ data: null, error: null, loading: false });
  };

  return { signIn, signUp, signOut };
};

export default useAuth;
