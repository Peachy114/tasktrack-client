import { useState } from "react";
import { auth } from 'firebase/firestore';
import { signInWithEmailAndPassword } from "firebase/auth";


export default function Login() {
    const [form, setForm ] = useState({
        email: "",
        password: ""
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess ] = useState(false);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value});
    async function Login(e) {
        e.preventDefault();
        try {
            setLoading(true);
            await signInWithEmailAndPassword(auth, form.email, form.password);
            setSuccess(true);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <h1>Login Here</h1>
            {error & <p style={{ color:red }}>{error.message}</p>}
            {success & <p style={{ color: green}}>Welcome Back!</p>}

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
                onChange={handleChange}
                />

                <button
                type="submit"
                disabled={loading}>
                    {loading ? "creating account" : "Sign Up"}
                </button>
            </form>
        </div>
    )
}