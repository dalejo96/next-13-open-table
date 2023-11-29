"use client";

import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import AuthModalInputs from "./AuthModalInputs";
import useAuth from "../../hooks/useAuth";
import { useAuthContext } from "../context/AuthContext";
import { Alert, CircularProgress } from "@mui/material";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

interface AuthModalProps {
  isSignin: boolean;
}

export default function AuthModal({ isSignin }: AuthModalProps) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { signIn, signUp } = useAuth();
  const { loading, error } = useAuthContext();

  const [inputs, setInputs] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "",
    password: "",
  });
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (isSignin) {
      if (inputs.password && inputs.email) {
        return setDisabled(false);
      }
    } else {
      if (inputs.firstName && inputs.lastName && inputs.email && inputs.password && inputs.city && inputs.phone) {
        return setDisabled(false);
      }
    }
    setDisabled(true);
  }, [inputs]);

  const handleClick = () => {
    if (isSignin) {
      signIn({ email: inputs.email, password: inputs.password, handleClose });
    } else {
      signUp({ ...inputs, handleClose });
    }
  };

  const handleChangeInputs = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <button className={`border p-1 px-4 rounded mr-3 ${isSignin && "bg-blue-400 text-white"}`} onClick={handleOpen}>
        {isSignin ? "Sign in" : "Sign up"}
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {loading ? (
            <div className="py-24 px-2 flex justify-center">
              <CircularProgress />
            </div>
          ) : (
            <div className="p-2">
              {error && (
                <Alert severity="error" className="mb-4">
                  {error}
                </Alert>
              )}
              <div className="uppercase font-bold text-center pb-2 border-b mb-2">
                <p className="text-sm">{isSignin ? "Sign in" : "Create account"}</p>
              </div>
              <div className="m-auto" />
              <h2 className="text-2xl font-light text-center">
                {isSignin ? "Log Into Your Account" : "Create your OpenTable account"}
              </h2>
              <AuthModalInputs inputs={inputs} handleChangeInputs={handleChangeInputs} isSignin={isSignin} />
              <button
                disabled={disabled}
                onClick={handleClick}
                className="uppercase bg-red-600 w-full text-white p-3 rounded text-sm mb-5 disabled:bg-gray-400"
              >
                {isSignin ? "Sign in" : "Create account"}
              </button>
            </div>
          )}
        </Box>
      </Modal>
    </div>
  );
}
