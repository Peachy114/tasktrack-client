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
    <div className='min-h-screen bg-bg-page flex items-center justify-center p-6'>
      <div className='w-full max-w-md flex flex-col gap-6'>

        {/* Card */}
        <div className='bg-bg-primary border border-border-primary rounded-3xl p-7 flex flex-col gap-4'>

          {/* Header */}
          <div className='text-center mb-5'>
            <div className='w-11 h-11 rounded-xl bg-button-primary flex items-center justify-center mx-auto mb-4'>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <rect x="3" y="9" width="14" height="10" rx="2" stroke="#ffffff" strokeWidth="1.5"/>
                <path d="M7 9V6a3 3 0 016 0v3" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            <p className='text-xs font-semibold tracking-widest uppercase text-text-gray mb-1'>
              Welcome back
            </p>
            <h1 className='text-2xl font-bold text-text-blue'>
              Sign in to your account
            </h1>
            <p className='text-sm text-text-gray mt-1.5'>
              Enter your credentials to continue
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

          <form onSubmit={handleLogin} className='flex flex-col gap-4'>

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
              <div className='flex items-center justify-between'>
                <label className='text-xs font-semibold text-text-primary'>Password</label>
                <a href="/forgot-password" className='text-xs text-text-blue font-medium no-underline hover:opacity-80'>
                  Forgot password?
                </a>
              </div>
              <input
                type="password" name="password" value={form.password}
                onChange={handleChange} placeholder="Enter your password" required
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
                  Signing in…
                </>
              ) : 'Sign in'}
            </button>
          </form>
        </div>

        {/* Footer */}
        <p className='text-center text-xs text-text-gray'>
          Don't have an account?{" "}
          <a href="/signup" className='text-text-blue font-semibold no-underline hover:opacity-80'>
            Sign up
          </a>
        </p>
      </div>
    </div>
  )
}