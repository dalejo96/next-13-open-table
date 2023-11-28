import axios from "axios";

interface SignIn {
  email: string;
  password: string;
}

const useAuth = () => {
  const signIn = async ({ email, password }: SignIn) => {
    try {
      const response = await axios.post("http://localhost:3000/api/auth/signin", { email, password });
    } catch (error) {}
  };

  const signUp = async () => {
    
  };

  return { signIn, signUp };
};

export default useAuth;
