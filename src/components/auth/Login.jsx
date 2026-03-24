import { useState, useEffect } from "react";
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

    async function Login(e) {
        e.preventDefault();
        try {
            setLoading(true);
            setError("");
            await signInWithEmailAndPassword(auth, form.email, form.password);
            
            //im check role para sa kanilang protected routes.
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
        <div>
            <h1>Login Here</h1>
            {error && <p style={{ color:"red" }}>{error}</p>}
            <form onSubmit={Login}>
                <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Enter your email"/>
                <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}/>
                <button type="submit" disabled={loading}>
                    {loading ? "Signing In..." : "Sign In"}
                </button>
            </form>
        </div>
    )
}