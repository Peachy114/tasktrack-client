// import { createContext, useContext, useEffect, useState } from "react";
// import { auth } from "../firebase";
// import { onAuthStateChanged, signOut} from "firebase/auth";
// import { userService } from "../services/userService";
// import LoadingPage from "@/components/shared/Loading";

// const AuthContext = createContext();

// export function useAuth() {
//   return useContext(AuthContext);
// }

// async function fetchUserProfile(user) {
//   const token = await user.getIdToken(true);
//   return await userService.getMe(token);     
// }

// export function AuthProvider({ children }) {
//   const [currentUser, setCurrentUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const unsub = onAuthStateChanged(auth, async (user) => {
//       setError(null);

//       if (user) {
//         try {
//           const profile = await fetchUserProfile(user);

//           setCurrentUser({
//             uid: user.uid,
//             email: user.email,
//             role: profile.role,
//           });
//         } catch (err) {
//           console.error("Auth profile fetch failed:", err);
//           setError(err.message);
//           setCurrentUser(null);
//         }
//       } else {
//         setCurrentUser(null);
//       }
//       setLoading(false); 
//     });

//     return unsub; 
//   }, []);

//   const logOut = () => signOut(auth);
  
//   const value = {
//     currentUser,
//     loading,
//     error,
//     logOut
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {loading ?  <LoadingPage /> : children}
//     </AuthContext.Provider>
//   );
// }


import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { userService } from "../services/userService";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

async function fetchUserProfile(user) {
  const cached = localStorage.getItem('user_profile')
  if (cached) return JSON.parse(cached)

  const token = await user.getIdToken()
  const profile = await userService.getMe(token)
  localStorage.setItem('user_profile', JSON.stringify(profile))
  return profile
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading,     setLoading]     = useState(true)
  const [error,       setError]       = useState(null)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      setError(null)

      if (user) {
        try {
          const profile = await fetchUserProfile(user)
          setCurrentUser({
            uid:   user.uid,
            email: user.email,
            role:  profile.role,
          })
        } catch (err) {
          console.error('Auth profile fetch failed:', err)
          setError(err.message)
          setCurrentUser(null)
          localStorage.removeItem('user_profile')
        }
      } else {
        setCurrentUser(null)
      }

      setLoading(false)
    })

    return unsub
  }, [])

  const logOut = async () => {
    localStorage.removeItem('user_profile')
    await signOut(auth)
  }

  const value = { currentUser, loading, error, logOut }

  return (
    <AuthContext.Provider value={value}>
      {loading ? (
        <div className='min-h-screen flex items-center justify-center bg-bg-page'>
          <div className='flex flex-col items-center gap-3'>
            <div className='w-8 h-8 rounded-xl bg-button-primary animate-pulse' />
            <p className='text-xs text-text-gray'>Loading…</p>
          </div>
        </div>
      ) : children}
    </AuthContext.Provider>
  )
}