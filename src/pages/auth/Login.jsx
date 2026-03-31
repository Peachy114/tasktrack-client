import { useState, useEffect } from "react"
import { auth } from '../../firebase'
import { signInWithEmailAndPassword } from "firebase/auth"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"

export default function Login() {
  const [form, setForm]       = useState({ email: "", password: "" })
  const [error, setError]     = useState("")
  const [loading, setLoading] = useState(false)
  const navigate              = useNavigate()
  const { currentUser }       = useAuth()

  useEffect(() => {
    if (currentUser?.role === 'admin')         navigate('/admin')
    else if (currentUser?.role === 'employee') navigate('/dashboard')
  }, [currentUser, navigate])

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  async function handleLogin(e) {
    e.preventDefault()
    try {
      setLoading(true)
      setError("")
      await signInWithEmailAndPassword(auth, form.email, form.password)
    } catch (err) {
      if (err.code === 'auth/user-not-found' || err.code === 'auth/invalid-credential') {
        setError('No account found with this email.')
      } else if (err.code === 'auth/wrong-password') {
        setError('Incorrect password. Please try again.')
      } else if (err.code === 'auth/invalid-email') {
        setError('Please enter a valid email address.')
      } else if (err.code === 'auth/too-many-requests') {
        setError('Too many attempts. Please try again later.')
      } else {
        setError('Something went wrong. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='min-h-screen bg-tt-bg flex items-center justify-center p-6'>
      <div className='w-full max-w-md flex flex-col gap-6'>

        {/* Card */}
        <div className='bg-tt-bg-card border border-tt-border rounded-3xl p-7 flex flex-col gap-4'>

          {/* Header */}
          <div className='text-center mb-5'>
            <div className='w-11 h-11 rounded-xl bg-tt-primary flex items-center justify-center mx-auto mb-4'>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <rect x="3" y="9" width="14" height="10" rx="2" stroke="#ffffff" strokeWidth="1.5"/>
                <path d="M7 9V6a3 3 0 016 0v3" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            <p className='text-xs font-semibold tracking-widest uppercase text-tt-text-hint mb-1'>
              Welcome back
            </p>
            <h1 className='text-2xl font-bold text-tt-primary'>
              Sign in to your account
            </h1>
            <p className='text-sm text-tt-text-muted mt-1.5'>
              Enter your credentials to continue
            </p>
        </div>

          {/* Error */}
          {error && (
            <div className='bg-tt-bg-muted border border-tt-border border-l-4 border-l-red-500 rounded-xl p-3 flex items-center gap-2'>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <circle cx="7" cy="7" r="6" stroke="#ef4444" strokeWidth="1.5"/>
                <path d="M7 4v3M7 9.5v.5" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <p className='text-xs text-tt-text'>{error}</p>
            </div>
          )}

          <form onSubmit={handleLogin} className='flex flex-col gap-4'>

            {/* Email */}
            <div className='flex flex-col gap-1.5'>
              <label className='text-xs font-semibold text-tt-text'>Email address</label>
              <input
                type="email" name="email" value={form.email}
                onChange={handleChange} placeholder="you@example.com" required
                className='w-full px-3.5 py-2.5 text-sm rounded-xl border border-tt-border bg-tt-bg-muted text-tt-text outline-none transition-colors focus:border-tt-primary'
              />
            </div>

            {/* Password */}
            <div className='flex flex-col gap-1.5'>
              <div className='flex items-center justify-between'>
                <label className='text-xs font-semibold text-tt-text'>Password</label>
                <a href="/forgot-password" className='text-xs text-tt-primary font-medium no-underline hover:opacity-80'>
                  Forgot password?
                </a>
              </div>
              <input
                type="password" name="password" value={form.password}
                onChange={handleChange} placeholder="Enter your password" required
                className='w-full px-3.5 py-2.5 text-sm rounded-xl border border-tt-border bg-tt-bg-muted text-tt-text outline-none transition-colors focus:border-tt-primary'
              />
            </div>

            {/* Submit */}
            <button
              type="submit" disabled={loading}
              className='w-full py-3 mt-1 text-sm font-bold rounded-xl border-none bg-tt-primary text-white hover:opacity-90 transition-opacity disabled:bg-tt-border disabled:text-tt-text-muted disabled:cursor-not-allowed flex items-center justify-center gap-2'
            >
              {loading ? (
                <>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className='animate-spin'>
                    <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.5" strokeDasharray="20 14"/>
                  </svg>
                  Signing in…
                </>
              ) : 'Sign in'}
            </button>
          </form>
        </div>

        {/* Footer */}
        <p className='text-center text-xs text-tt-text-muted'>
          Don't have an account?{" "}
          <a href="/signup" className='text-tt-primary font-semibold no-underline hover:opacity-80'>
            Sign up
          </a>
        </p>
      </div>
    </div>
  )
}