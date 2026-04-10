import { useState } from "react"
import { auth } from "../../firebase"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

const API = import.meta.env.VITE_API_URL ?? 'http://localhost:5000'

export default function SignUp() {
  const [form, setForm]       = useState({ email: "", password: "" })
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState("")
  const navigate              = useNavigate()

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  async function handleSignUp(e) {
    e.preventDefault()
    try {
      setLoading(true)
      setError("")
      const userCredential = await createUserWithEmailAndPassword(auth, form.email, form.password)
      const token = await userCredential.user.getIdToken()
      await fetch(`${API}/users/register`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      })
      toast.success('Account created! Redirecting…')
      setTimeout(() => navigate('/login'), 1500)
    } catch (err) {
      if (err.code === 'auth/email-already-in-use') {
        setError('This email is already registered. Please log in instead.')
      } else if (err.code === 'auth/weak-password') {
        setError('Password should be at least 6 characters.')
      } else if (err.code === 'auth/invalid-email') {
        setError('Please enter a valid email address.')
      } else {
        setError('Something went wrong. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='min-h-screen bg-bg-page flex items-center justify-center p-6'>
      <div className='w-full max-w-md flex flex-col gap-6'>

        {/* Card */}
        <div className='bg-bg-primary border border-border-primary rounded-3xl p-7 flex flex-col gap-4'>

          {/* Header */}
          <div className='text-center mb-5'>
            <div className='w-11 h-11 rounded-xl bg-button-primary flex items-center justify-center mx-auto mb-4'>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 2a4 4 0 100 8 4 4 0 000-8zM4 14c0-2.5 2.686-4 6-4s6 1.5 6 4v1H4v-1z" fill="#ffffff"/>
              </svg>
            </div>
            <p className='text-xs font-semibold tracking-widest uppercase text-text-gray mb-1'>
              Get started
            </p>
            <h1 className='text-2xl font-bold text-text-blue'>
              Create your account
            </h1>
            <p className='text-sm text-text-gray mt-1.5'>
              Join the team and start managing tasks
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className='bg-bg-page border border-border-primary border-l-4 border-l-danger rounded-xl p-3 flex items-center gap-2'>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <circle cx="7" cy="7" r="6" stroke="#FF4D4D" strokeWidth="1.5"/>
                <path d="M7 4v3M7 9.5v.5" stroke="#FF4D4D" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <p className='text-xs text-text-primary'>{error}</p>
            </div>
          )}

          <form onSubmit={handleSignUp} className='flex flex-col gap-4'>

            {/* Email */}
            <div className='flex flex-col gap-1.5'>
              <label className='text-xs font-semibold text-text-primary'>Email address</label>
              <input
                type="email" name="email" value={form.email}
                onChange={handleChange} placeholder="you@example.com" required
                className='w-full px-3.5 py-2.5 text-sm rounded-xl border border-border-primary bg-bg-page text-text-primary outline-none transition-colors focus:border-text-blue'
              />
            </div>

            {/* Password */}
            <div className='flex flex-col gap-1.5'>
              <label className='text-xs font-semibold text-text-primary'>Password</label>
              <input
                type="password" name="password" value={form.password}
                onChange={handleChange} placeholder="Min. 8 characters" required
                className='w-full px-3.5 py-2.5 text-sm rounded-xl border border-border-primary bg-bg-page text-text-primary outline-none transition-colors focus:border-text-blue'
              />
            </div>

            {/* Submit */}
            <button
              type="submit" disabled={loading}
              className='w-full py-3 mt-1 text-sm font-bold rounded-xl border-none bg-button-primary text-text-secondary hover:opacity-90 transition-opacity disabled:bg-border-primary disabled:text-text-gray disabled:cursor-not-allowed flex items-center justify-center gap-2'
            >
              {loading ? (
                <>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className='animate-spin'>
                    <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.5" strokeDasharray="20 14"/>
                  </svg>
                  Creating account…
                </>
              ) : 'Create account'}
            </button>
          </form>
        </div>

        {/* Footer */}
        <p className='text-center text-xs text-text-gray'>
          Already have an account?{" "}
          <a href="/login" className='text-text-blue font-semibold no-underline hover:opacity-80'>
            Sign in
          </a>
        </p>
      </div>
    </div>
  )
}