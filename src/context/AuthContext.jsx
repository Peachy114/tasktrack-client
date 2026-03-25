import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

const AuthContext = createContext();

//get currentUser
export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser ] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const token = await user.getIdToken();
                const res = await fetch('http://localhost:5000/users/me', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const profile = await res.json();
                setCurrentUser({
                    uid: user.uid,
                    email: user.email,
                    role: profile.role
                });
            } else {
                setCurrentUser(null);
            }
            setLoading(false);
        });
        return unsub;
    }, []);

    const value = { currentUser };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}