import { useState } from "react";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function SignUp() {
    const [form, setForm] = useState({
        email: "",
        password: ""
    });
    const [ loading, setLoading] = useState(false);
    const [ error, setError ] = useState("");
    const [ success, setSuccess ] =useState(false)

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value});
    async function SignUp(e) {
        e.preventDefault();
        try {
            setLoading(true);
            setError("");

            const userCredential = await createUserWithEmailAndPassword(
                auth, form.email, form.password
            );
            const token = await userCredential.user.getIdToken(); 
            await fetch('http://localhost:5000/users/register', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}` 
                }
            });

            setSuccess(true);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
}

    return (
        <div>
            <h1>Sign Up</h1>
            {/* Notif */}
            {error && <p style={{ color: "red" }}>{error}</p>}
            {success && <p>Account created successfully</p>}

            <form onSubmit={SignUp}>
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