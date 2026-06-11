'use client'
import { useState, useEffect } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { useTheme } from '../context/ThemeContext'

const diasSemana = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom']

const datosIniciales = diasSemana.map(dia => ({ dia, calorias: 0 }))

export default function Estadisticas() {
  const { isDark } = useTheme()
  const [datos, setDatos] = useState(datosIniciales)
  const [diaSeleccionado, setDiaSeleccionado] = useState(0)
  const [valor, setValor] = useState('')

  const bg = isDark ? '#0a0a0a' : '#f9f9f9'
  const cardBg = isDark ? '#111' : '#fff'
  const cardBorder = isDark ? '#222' : '#e5e5e5'
  const textMuted = isDark ? '#71717a' : '#888'
  const textColor = isDark ? '#fff' : '#111'
  const glow = (color: string) => `0 0 8px ${color}, 0 0 16px ${color}80`

  // Cargar datos guardados
  useEffect(() => {
    const guardado = localStorage.getItem('caloriasSemana')
    if (guardado) setDatos(JSON.parse(guardado))
  }, [])

  // Guardar cada vez que cambian
  useEffect(() => {
    localStorage.setItem('caloriasSemana', JSON.stringify(datos))
  }, [datos])

  const guardarCalorias = () => {
    const num = parseInt(valor)
    if (isNaN(num) || num < 0) return
    const nuevos = [...datos]
    nuevos[diaSeleccionado] = { ...nuevos[diaSeleccionado], calorias: num }
    setDatos(nuevos)
    setValor('')
  }

  const reiniciarGrafica = () => {
    if (confirm('¿Seguro que quieres reiniciar la gráfica de la semana?')) {
      setDatos(datosIniciales)
    }
  }

  const total = datos.reduce((acc, d) => acc + d.calorias, 0)
  const promedio = Math.round(total / 7)
  const maximo = Math.max(...datos.map(d => d.calorias), 0)

  return (
    <div style={{ minHeight: '100vh', backgroundColor: bg, color: textColor, padding: '2rem 3rem', fontFamily: 'Inter, sans-serif', transition: 'all 0.3s' }}>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#ff00aa', margin: 0, textShadow: glow('#ff00aa') }}>📊 Estadísticas</h1>
          <p style={{ color: textMuted, marginTop: '0.25rem' }}>Calorías consumidas esta semana</p>
        </div>
        <button onClick={reiniciarGrafica}
          style={{ backgroundColor: 'transparent', color: '#ff4444', fontWeight: 700, padding: '0.6rem 1.4rem', borderRadius: '9999px', border: '1px solid #ff444440', cursor: 'pointer', fontSize: '0.95rem', textShadow: glow('#ff4444') }}>
          🔄 Reiniciar semana
        </button>
      </div>

      {/* Tarjetas resumen */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
        {[
          { label: 'Total semana', value: total.toLocaleString(), color: '#00ff88' },
          { label: 'Promedio diario', value: promedio.toLocaleString(), color: '#00aaff' },
          { label: 'Día más alto', value: maximo.toLocaleString(), color: '#ff00aa' },
        ].map((card, i) => (
          <div key={i} style={{ backgroundColor: cardBg, border: `1px solid ${card.color}40`, borderRadius: '1rem', padding: '1.5rem' }}>
            <p style={{ color: textMuted, fontSize: '0.85rem', marginBottom: '0.5rem' }}>{card.label}</p>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: card.color, margin: 0, textShadow: glow(card.color) }}>{card.value}</h2>
            <p style={{ color: textMuted, fontSize: '0.75rem', margin: 0 }}>kcal</p>
          </div>
        ))}
      </div>

      {/* Gráfica */}
      <div style={{ backgroundColor: cardBg, border: `1px solid ${cardBorder}`, borderRadius: '1rem', padding: '1.5rem', marginBottom: '1.5rem' }}>
        <h3 style={{ color: '#00ff88', fontWeight: 700, fontSize: '1.1rem', marginBottom: '1.5rem', textShadow: glow('#00ff88') }}>📈 Calorías por día</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={datos}>
            <CartesianGrid strokeDasharray="3 3" stroke={cardBorder} />
            <XAxis dataKey="dia" stroke={textMuted} />
            <YAxis stroke={textMuted} />
            <Tooltip
              contentStyle={{ backgroundColor: cardBg, border: `1px solid ${cardBorder}`, borderRadius: '0.5rem', color: textColor }}
            />
            <Bar dataKey="calorias" radius={[8, 8, 0, 0]}>
              {datos.map((_, i) => (
                <Cell key={i} fill={i === diaSeleccionado ? '#00ff88' : '#00aaff'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Formulario para registrar calorías */}
      <div style={{ backgroundColor: cardBg, border: `1px solid ${cardBorder}`, borderRadius: '1rem', padding: '1.5rem' }}>
        <h3 style={{ color: '#00aaff', fontWeight: 700, fontSize: '1.1rem', marginBottom: '1rem', textShadow: glow('#00aaff') }}>✏️ Registrar calorías</h3>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'flex-end' }}>
          <div>
            <label style={{ color: textMuted, fontSize: '0.85rem', display: 'block', marginBottom: '0.4rem' }}>Día</label>
            <select value={diaSeleccionado} onChange={e => setDiaSeleccionado(Number(e.target.value))}
              style={{ backgroundColor: isDark ? '#1a1a1a' : '#f3f3f3', border: `1px solid ${cardBorder}`, borderRadius: '0.75rem', padding: '0.75rem 1rem', color: textColor, fontSize: '0.95rem', outline: 'none' }}>
              {diasSemana.map((d, i) => <option key={i} value={i}>{d}</option>)}
            </select>
          </div>
          <div>
            <label style={{ color: textMuted, fontSize: '0.85rem', display: 'block', marginBottom: '0.4rem' }}>Calorías</label>
            <input type="number" placeholder="Ej: 2000" value={valor} onChange={e => setValor(e.target.value)}
              style={{ backgroundColor: isDark ? '#1a1a1a' : '#f3f3f3', border: `1px solid ${cardBorder}`, borderRadius: '0.75rem', padding: '0.75rem 1rem', color: textColor, fontSize: '0.95rem', outline: 'none', width: '150px' }} />
          </div>
          <button onClick={guardarCalorias}
            style={{ backgroundColor: '#00ff88', color: '#000', fontWeight: 700, padding: '0.78rem 1.5rem', borderRadius: '0.75rem', border: 'none', cursor: 'pointer' }}>
            Guardar
          </button>
        </div>
      </div>

    </div>
  )
}