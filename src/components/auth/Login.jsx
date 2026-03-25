// import { useState, useEffect } from "react";
// import { auth } from '../../firebase';
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";

// export default function Login() {
//     const [form, setForm] = useState({ email: "", password: "" });
//     const [error, setError] = useState("");
//     const [loading, setLoading] = useState(false);
//     const navigate = useNavigate();
//     const { currentUser } = useAuth();

//     const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

//     async function Login(e) {
//         e.preventDefault();
//         try {
//             setLoading(true);
//             setError("");
//             await signInWithEmailAndPassword(auth, form.email, form.password);
            
//             //im check role para sa kanilang protected routes.
//             if (currentUser?.role === 'admin') {
//                 navigate('/admin');
//             } else if (currentUser?.role === 'employee') {
//                 navigate('/dashboard');
//             }
//         } catch (err) {
//             setError(err.message);
//         } finally {
//             setLoading(false);
//         }
//     }

//     return (
//         <div>
//             <h1>Login Here</h1>
//             {error && <p style={{ color:"red" }}>{error}</p>}
//             <form onSubmit={Login}>
//                 <input
//                     type="email"
//                     name="email"
//                     value={form.email}
//                     onChange={handleChange}
//                     placeholder="Enter your email"/>
//                 <input
//                     type="password"
//                     name="password"
//                     value={form.password}
//                     onChange={handleChange}/>
//                 <button type="submit" disabled={loading}>
//                     {loading ? "Signing In..." : "Sign In"}
//                 </button>
//             </form>
//         </div>
//     )
// }


import { useState } from "react";
import { auth } from '../../firebase';
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  async function handleLogin(e) {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");
      await signInWithEmailAndPassword(auth, form.email, form.password);
      if (currentUser?.role === 'admin') {
        navigate('/admin');
      } else if (currentUser?.role === 'employee') {
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "var(--tt-bg)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "1.5rem",
    }}>
      <div style={{
        width: "100%",
        maxWidth: "400px",
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
      }}>

        {/* Header */}
        <div style={{ textAlign: "center" }}>
          <div style={{
            width: "44px",
            height: "44px",
            borderRadius: "12px",
            background: "var(--tt-primary)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 1rem",
          }}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <rect x="3" y="9" width="14" height="10" rx="2" stroke="#ffffff" strokeWidth="1.5"/>
              <path d="M7 9V6a3 3 0 016 0v3" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
          <p style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", color: "var(--tt-text-hint)", marginBottom: "4px", textTransform: "uppercase" }}>
            Welcome back
          </p>
          <h1 style={{ fontSize: "22px", fontWeight: 700, color: "var(--tt-primary)", margin: 0 }}>
            Sign in to your account
          </h1>
          <p style={{ fontSize: "13px", color: "var(--tt-text-muted)", marginTop: "6px" }}>
            Enter your credentials to continue
          </p>
        </div>

        {/* Card */}
        <div style={{
          background: "var(--tt-bg-card)",
          border: "1px solid var(--tt-border)",
          borderRadius: "20px",
          padding: "1.75rem",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}>

          {/* Error */}
          {error && (
            <div style={{
              background: "#fff0f0",
              border: "1px solid #fcc",
              borderRadius: "10px",
              padding: "10px 14px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <circle cx="7" cy="7" r="6" stroke="#e05" strokeWidth="1.5"/>
                <path d="M7 4v3M7 9.5v.5" stroke="#e05" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <p style={{ fontSize: "12px", color: "#cc0033", margin: 0 }}>{error}</p>
            </div>
          )}

          <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>

            {/* Email */}
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label style={{ fontSize: "12px", fontWeight: 600, color: "var(--tt-text)", letterSpacing: "0.02em" }}>
                Email address
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
                style={{
                  width: "100%",
                  padding: "10px 14px",
                  fontSize: "13px",
                  borderRadius: "10px",
                  border: "1px solid var(--tt-border)",
                  background: "var(--tt-bg-muted)",
                  color: "var(--tt-text)",
                  outline: "none",
                  boxSizing: "border-box",
                  transition: "border-color 0.15s",
                }}
                onFocus={e => e.target.style.borderColor = "var(--tt-secondary)"}
                onBlur={e => e.target.style.borderColor = "var(--tt-border)"}
              />
            </div>

            {/* Password */}
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <label style={{ fontSize: "12px", fontWeight: 600, color: "var(--tt-text)", letterSpacing: "0.02em" }}>
                  Password
                </label>
                <a href="/forgot-password" style={{ fontSize: "11px", color: "var(--tt-primary)", textDecoration: "none", fontWeight: 500 }}>
                  Forgot password?
                </a>
              </div>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
                style={{
                  width: "100%",
                  padding: "10px 14px",
                  fontSize: "13px",
                  borderRadius: "10px",
                  border: "1px solid var(--tt-border)",
                  background: "var(--tt-bg-muted)",
                  color: "var(--tt-text)",
                  outline: "none",
                  boxSizing: "border-box",
                  transition: "border-color 0.15s",
                }}
                onFocus={e => e.target.style.borderColor = "var(--tt-secondary)"}
                onBlur={e => e.target.style.borderColor = "var(--tt-border)"}
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                padding: "11px",
                marginTop: "4px",
                fontSize: "13px",
                fontWeight: 700,
                borderRadius: "10px",
                border: "none",
                background: loading ? "var(--tt-border)" : "var(--tt-primary)",
                color: loading ? "var(--tt-text-muted)" : "#ffffff",
                cursor: loading ? "not-allowed" : "pointer",
                transition: "opacity 0.15s, background 0.15s",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
              }}
              onMouseEnter={e => { if (!loading) e.target.style.opacity = "0.9" }}
              onMouseLeave={e => { e.target.style.opacity = "1" }}
            >
              {loading ? (
                <>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ animation: "spin 0.8s linear infinite" }}>
                    <circle cx="7" cy="7" r="5.5" stroke="var(--tt-text-muted)" strokeWidth="1.5" strokeDasharray="20 14"/>
                  </svg>
                  Signing in…
                </>
              ) : "Sign in"}
            </button>
          </form>
        </div>

        {/* Footer */}
        <p style={{ textAlign: "center", fontSize: "12px", color: "var(--tt-text-muted)", margin: 0 }}>
          Don't have an account?{" "}
          <a href="/signup" style={{ color: "var(--tt-primary)", fontWeight: 600, textDecoration: "none" }}>
            Sign up
          </a>
        </p>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
