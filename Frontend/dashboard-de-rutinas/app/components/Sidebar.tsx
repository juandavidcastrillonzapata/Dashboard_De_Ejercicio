'use client'
import { useRouter, usePathname } from 'next/navigation'
import { useTheme } from '../context/ThemeContext'

const links = [
  { icon: '🏠', label: 'Dashboard', ruta: '/' },
  { icon: '🏋️', label: 'Rutinas', ruta: '/rutinas' },
  { icon: '⚡', label: 'Ejercicios', ruta: '/ejercicios' },
  { icon: '🥗', label: 'Alimentación', ruta: '/alimentacion' },
  { icon: '📊', label: 'Estadísticas', ruta: '/estadisticas' },
]

export default function Sidebar() {
  const router = useRouter()
  const pathname = usePathname()
  const { isDark, toggle } = useTheme()

  const bg = isDark ? '#111' : '#f5f5f5'
  const border = isDark ? '#222' : '#e0e0e0'
  const textMuted = isDark ? '#71717a' : '#888'

  return (
    <div style={{ width: '220px', minHeight: '100vh', backgroundColor: bg, borderRight: `1px solid ${border}`, padding: '2rem 1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontFamily: 'Inter, sans-serif', transition: 'all 0.3s' }}>

      {/* Logo con brillo */}
      <div style={{ marginBottom: '2rem', paddingLeft: '0.75rem' }}>
        <h2 style={{
          color: '#00ff88', fontWeight: 800, fontSize: '1.3rem', margin: 0,
          textShadow: '0 0 10px #00ff88, 0 0 20px #00ff8880',
        }}>💪 FitDashboard</h2>
      </div>

      {/* Links */}
      {links.map((link, i) => {
        const active = pathname === link.ruta
        return (
          <button key={i} onClick={() => router.push(link.ruta)}
            style={{
              display: 'flex', alignItems: 'center', gap: '0.75rem',
              backgroundColor: active ? (isDark ? '#00ff8820' : '#00ff8815') : 'transparent',
              border: active ? '1px solid #00ff8840' : '1px solid transparent',
              borderRadius: '0.75rem', padding: '0.75rem', cursor: 'pointer',
              color: active ? '#00ff88' : textMuted,
              fontWeight: active ? 700 : 500,
              fontSize: '0.95rem', textAlign: 'left', width: '100%',
              textShadow: active ? '0 0 8px #00ff88' : 'none',
              transition: 'all 0.2s',
            }}>
            <span>{link.icon}</span>
            <span>{link.label}</span>
          </button>
        )
      })}

      {/* Toggle tema */}
      <div style={{ marginTop: '1rem' }}>
        <button onClick={toggle}
          style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', backgroundColor: 'transparent', border: `1px solid ${border}`, borderRadius: '0.75rem', padding: '0.75rem', cursor: 'pointer', color: textMuted, fontWeight: 600, fontSize: '0.95rem', width: '100%' }}>
          <span>{isDark ? '☀️' : '🌙'}</span>
          <span>{isDark ? 'Modo claro' : 'Modo oscuro'}</span>
        </button>
      </div>

      {/* Cerrar sesión */}
      <div style={{ marginTop: 'auto' }}>
        <button onClick={() => router.push('/login')}
          style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', backgroundColor: 'transparent', border: '1px solid #ff444440', borderRadius: '0.75rem', padding: '0.75rem', cursor: 'pointer', color: '#ff4444', fontWeight: 600, fontSize: '0.95rem', width: '100%',
            textShadow: '0 0 8px #ff4444',
          }}>
          <span>🚪</span>
          <span>Cerrar sesión</span>
        </button>
      </div>

    </div>
  )
}