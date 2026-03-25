// import { useState } from "react";
// import { auth } from "../../firebase";
// import { createUserWithEmailAndPassword } from "firebase/auth";

// export default function SignUp() {
//     const [form, setForm] = useState({
//         email: "",
//         password: ""
//     });
//     const [ loading, setLoading] = useState(false);
//     const [ error, setError ] = useState("");
//     const [ success, setSuccess ] =useState(false)

//     const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value});
//     async function SignUp(e) {
//         e.preventDefault();
//         try {
//             setLoading(true);
//             setError("");

//             const userCredential = await createUserWithEmailAndPassword(
//                 auth, form.email, form.password
//             );
//             const token = await userCredential.user.getIdToken(); 
//             await fetch('http://localhost:5000/users/register', {
//                 method: 'POST',
//                 headers: {
//                     Authorization: `Bearer ${token}` 
//                 }
//             });

//             setSuccess(true);
//         } catch (err) {
//             setError(err.message);
//         } finally {
//             setLoading(false);
//         }
// }

//     return (
//         <div>
//             <h1>Sign Up</h1>
//             {/* Notif */}
//             {error && <p style={{ color: "red" }}>{error}</p>}
//             {success && <p>Account created successfully</p>}

//             <form onSubmit={SignUp}>
//                 <input
//                 type="email"
//                 name="email"
//                 value={form.email}
//                 onChange={handleChange} 
//                 placeholder="Enter your email"/>

//                 <input 
//                 type="password"
//                 name="password"
//                 value={form.password}
//                 onChange={handleChange}
//                 />

//                 <button
//                 type="submit"
//                 disabled={loading}>
//                     {loading ? "creating account" : "Sign Up"}
//                 </button>
//             </form>

//         </div>
//     )
// }


import { useState } from "react";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function SignUp() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  async function handleSignUp(e) {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");
      const userCredential = await createUserWithEmailAndPassword(auth, form.email, form.password);
      const token = await userCredential.user.getIdToken();
      await fetch("http://localhost:5000/users/register", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      setSuccess(true);
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
              <path d="M10 2a4 4 0 100 8 4 4 0 000-8zM4 14c0-2.5 2.686-4 6-4s6 1.5 6 4v1H4v-1z"
                fill="#ffffff" />
            </svg>
          </div>
          <p style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", color: "var(--tt-text-hint)", marginBottom: "4px", textTransform: "uppercase" }}>
            Get started
          </p>
          <h1 style={{ fontSize: "22px", fontWeight: 700, color: "var(--tt-primary)", margin: 0 }}>
            Create your account
          </h1>
          <p style={{ fontSize: "13px", color: "var(--tt-text-muted)", marginTop: "6px" }}>
            Join the team and start managing tasks
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

          {/* Notifications */}
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
          {success && (
            <div style={{
              background: "var(--tt-done-bg)",
              border: "1px solid #b6e4c8",
              borderRadius: "10px",
              padding: "10px 14px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <circle cx="7" cy="7" r="6" stroke="#1a5c35" strokeWidth="1.5"/>
                <path d="M4 7l2 2 4-4" stroke="#1a5c35" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <p style={{ fontSize: "12px", color: "var(--tt-done-text)", margin: 0 }}>Account created successfully!</p>
            </div>
          )}

          <form onSubmit={handleSignUp} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>

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
              <label style={{ fontSize: "12px", fontWeight: 600, color: "var(--tt-text)", letterSpacing: "0.02em" }}>
                Password
              </label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Min. 8 characters"
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
                  Creating account…
                </>
              ) : "Create account"}
            </button>
          </form>
        </div>

        {/* Footer */}
        <p style={{ textAlign: "center", fontSize: "12px", color: "var(--tt-text-muted)", margin: 0 }}>
          Already have an account?{" "}
          <a href="/login" style={{ color: "var(--tt-primary)", fontWeight: 600, textDecoration: "none" }}>
            Sign in
          </a>
        </p>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}