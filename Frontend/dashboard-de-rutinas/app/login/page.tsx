'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Login() {
  const [esLogin, setEsLogin] = useState(true)
  const router = useRouter()

  const handleSubmit = () => {
    router.push('/')
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0a0a0a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ backgroundColor: '#111', border: '1px solid #222', borderRadius: '1.5rem', padding: '2.5rem', width: '100%', maxWidth: '420px' }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#00ff88', margin: 0 }}>💪 FitDashboard</h1>
          <p style={{ color: '#71717a', marginTop: '0.4rem', fontSize: '0.9rem' }}>
            {esLogin ? 'Inicia sesión en tu cuenta' : 'Crea tu cuenta gratis'}
          </p>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', backgroundColor: '#1a1a1a', borderRadius: '0.75rem', padding: '0.3rem', marginBottom: '1.8rem' }}>
          {['Iniciar sesión', 'Registrarse'].map((tab, i) => (
            <button key={i} onClick={() => setEsLogin(i === 0)}
              style={{ flex: 1, padding: '0.6rem', borderRadius: '0.6rem', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: '0.9rem', transition: 'all 0.2s',
                backgroundColor: (i === 0) === esLogin ? '#00ff88' : 'transparent',
                color: (i === 0) === esLogin ? '#000' : '#71717a',
              }}>
              {tab}
            </button>
          ))}
        </div>

        {/* Formulario */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {!esLogin && (
            <div>
              <label style={{ color: '#a1a1aa', fontSize: '0.85rem', display: 'block', marginBottom: '0.4rem' }}>Nombre</label>
              <input placeholder="Tu nombre" style={{ width: '100%', backgroundColor: '#1a1a1a', border: '1px solid #333', borderRadius: '0.75rem', padding: '0.75rem 1rem', color: '#fff', fontSize: '0.95rem', outline: 'none', boxSizing: 'border-box' }} />
            </div>
          )}
          <div>
            <label style={{ color: '#a1a1aa', fontSize: '0.85rem', display: 'block', marginBottom: '0.4rem' }}>Correo</label>
            <input type="email" placeholder="tu@correo.com" style={{ width: '100%', backgroundColor: '#1a1a1a', border: '1px solid #333', borderRadius: '0.75rem', padding: '0.75rem 1rem', color: '#fff', fontSize: '0.95rem', outline: 'none', boxSizing: 'border-box' }} />
          </div>
          <div>
            <label style={{ color: '#a1a1aa', fontSize: '0.85rem', display: 'block', marginBottom: '0.4rem' }}>Contraseña</label>
            <input type="password" placeholder="••••••••" style={{ width: '100%', backgroundColor: '#1a1a1a', border: '1px solid #333', borderRadius: '0.75rem', padding: '0.75rem 1rem', color: '#fff', fontSize: '0.95rem', outline: 'none', boxSizing: 'border-box' }} />
          </div>

          <button
            onClick={handleSubmit}
            style={{ backgroundColor: '#00ff88', color: '#000', fontWeight: 700, padding: '0.85rem', borderRadius: '0.75rem', border: 'none', cursor: 'pointer', fontSize: '1rem', marginTop: '0.5rem', width: '100%' }}>
            {esLogin ? 'Iniciar sesión' : 'Crear cuenta'}
          </button>
        </div>

      </div>
    </div>
  )
}