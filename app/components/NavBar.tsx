"use client";

import Link from "next/link";
import useAuth from "../../hooks/useAuth";
import { useAuthContext } from "../context/AuthContext";
import AuthModal from "./AuthModal";

export default function NavBar() {
  const { data, loading } = useAuthContext();
  const { signOut } = useAuth();
  return (
    <nav className="bg-white p-2 flex justify-between">
      <Link href="/" className="font-bold text-gray-700 text-2xl">
        OpenTable
      </Link>
      <div>
        {loading ? null : (
          <div className="flex">
            {data ? (
              <button onClick={signOut} className="border p-1 px-4 rounded mr-3 bg-blue-400 text-white">
                Sign out
              </button>
            ) : (
              <>
                <AuthModal isSignin />
                <AuthModal isSignin={false} />
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
