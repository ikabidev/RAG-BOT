import { useState } from 'react'
import './Login.css'
import axios from 'axios';

function Login() {
  const [mode, setMode] = useState('login')   // 'login' | 'register'
  const [showPassword, setShowPassword] = useState(false)
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    remember: false,
  })

  const isRegister = mode === 'register'

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (mode === 'register') {
      const registerResponse = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/register`, {
        username: form.name,
        password: form.password,
        email: form.email
      })


    }
    else{
      const loginResponse = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/login`, {
        email: form.email,
        password: form.password
      })

      if (loginResponse.data.status === 200) {
        sessionStorage.setItem('is_logged_in', loginResponse.data.data.email);
        window.location.reload();
      }
      else{
        window.alert(loginResponse.data.message);
      }
    }
  }

  return (
    <div className="nb-auth">
      <div className="nb-auth-box">

        <div className="nb-auth-header">
          <h1 className="nb-auth-title">{isRegister ? 'Sign Up' : 'Log In'}</h1>
          <p className="nb-auth-sub">
            {isRegister ? 'Create an account to start querying your documents.' : 'Welcome back. Pick up where you left off.'}
          </p>
        </div>

        <div className="nb-auth-card">

          <div className="nb-tabs">
            <button
              type="button"
              className={`nb-tab ${!isRegister ? 'nb-tab-active' : ''}`}
              onClick={() => setMode('login')}
            >
              Login
            </button>
            <button
              type="button"
              className={`nb-tab ${isRegister ? 'nb-tab-active' : ''}`}
              onClick={() => setMode('register')}
            >
              Register
            </button>
          </div>

          <form className="nb-auth-form" onSubmit={handleSubmit}>

            {isRegister && (
              <div className="nb-field">
                <label className="nb-field-label" htmlFor="name">Full Name</label>
                <input
                  id="name"
                  className="nb-field-input"
                  type="text"
                  name="name"
                  placeholder="Ada Lovelace"
                  autoComplete="name"
                  value={form.name}
                  onChange={handleChange}
                />
              </div>
            )}

            <div className="nb-field">
              <label className="nb-field-label" htmlFor="email">Email</label>
              <input
                id="email"
                className="nb-field-input"
                type="email"
                name="email"
                placeholder="you@example.com"
                autoComplete="email"
                value={form.email}
                onChange={handleChange}
              />
            </div>

            <div className="nb-field">
              <label className="nb-field-label" htmlFor="password">Password</label>
              <div className="nb-password">
                <input
                  id="password"
                  className="nb-field-input"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="••••••••"
                  autoComplete={isRegister ? 'new-password' : 'current-password'}
                  value={form.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="nb-reveal"
                  onClick={() => setShowPassword((v) => !v)}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            {isRegister && (
              <div className="nb-field">
                <label className="nb-field-label" htmlFor="confirmPassword">Confirm Password</label>
                <input
                  id="confirmPassword"
                  className="nb-field-input"
                  type={showPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  placeholder="••••••••"
                  autoComplete="new-password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                />
              </div>
            )}

            {!isRegister && (
              <div className="nb-options">
                <label className="nb-check">
                  <input
                    type="checkbox"
                    name="remember"
                    checked={form.remember}
                    onChange={handleChange}
                  />
                  Remember me
                </label>
                <a className="nb-link" href="#forgot">Forgot password?</a>
              </div>
            )}

            <button className="nb-submit" type="submit">
              {isRegister ? 'Create Account' : 'Sign In'}
            </button>
          </form>
        </div>

        <p className="nb-auth-footer">
          {isRegister ? 'Already have an account? ' : "Don't have an account? "}
          <button
            type="button"
            className="nb-switch"
            onClick={() => setMode(isRegister ? 'login' : 'register')}
          >
            {isRegister ? 'Log in' : 'Sign up'}
          </button>
        </p>

      </div>
    </div>
  )
}

export default Login
