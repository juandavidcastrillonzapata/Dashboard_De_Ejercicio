'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const rutinasIniciales = [
  { id: 1, nombre: 'Pecho y Tríceps', descripcion: 'Enfocada en la parte superior del cuerpo', ejercicios: 5 },
  { id: 2, nombre: 'Piernas', descripcion: 'Sentadillas, prensa y extensiones', ejercicios: 6 },
  { id: 3, nombre: 'Espalda y Bíceps', descripcion: 'Dominadas, remo y curl', ejercicios: 4 },
]

export default function Rutinas() {
  const router = useRouter()
  const [rutinas, setRutinas] = useState(rutinasIniciales)
  const [mostrarForm, setMostrarForm] = useState(false)
  const [nombre, setNombre] = useState('')
  const [descripcion, setDescripcion] = useState('')

  const crearRutina = () => {
    if (!nombre || !descripcion) return
    const nueva = { id: Date.now(), nombre, descripcion, ejercicios: 0 }
    setRutinas([...rutinas, nueva])
    setNombre('')
    setDescripcion('')
    setMostrarForm(false)
  }

  const eliminarRutina = (id: number) => {
    setRutinas(rutinas.filter(r => r.id !== id))
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0a0a0a', color: '#fff', padding: '2rem 3rem', fontFamily: 'Inter, sans-serif' }}>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
        <div>
          <button onClick={() => router.push('/')} style={{ backgroundColor: 'transparent', border: 'none', color: '#71717a', cursor: 'pointer', fontSize: '0.9rem', marginBottom: '0.5rem', padding: 0 }}>
            ← Volver al dashboard
          </button>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#00ff88', margin: 0 }}>🏋️ Mis Rutinas</h1>
          <p style={{ color: '#71717a', marginTop: '0.25rem' }}>{rutinas.length} rutinas registradas</p>
        </div>
        <button onClick={() => setMostrarForm(!mostrarForm)}
          style={{ backgroundColor: '#00ff88', color: '#000', fontWeight: 700, padding: '0.6rem 1.4rem', borderRadius: '9999px', border: 'none', cursor: 'pointer', fontSize: '0.95rem' }}>
          + Nueva rutina
        </button>
      </div>

      {/* Formulario crear */}
      {mostrarForm && (
        <div style={{ backgroundColor: '#111', border: '1px solid #00ff8840', borderRadius: '1rem', padding: '1.5rem', marginBottom: '2rem' }}>
          <h3 style={{ color: '#00ff88', fontWeight: 700, marginBottom: '1rem' }}>Nueva rutina</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <input
              placeholder="Nombre de la rutina"
              value={nombre}
              onChange={e => setNombre(e.target.value)}
              style={{ backgroundColor: '#1a1a1a', border: '1px solid #333', borderRadius: '0.75rem', padding: '0.75rem 1rem', color: '#fff', fontSize: '0.95rem', outline: 'none' }}
            />
            <input
              placeholder="Descripción"
              value={descripcion}
              onChange={e => setDescripcion(e.target.value)}
              style={{ backgroundColor: '#1a1a1a', border: '1px solid #333', borderRadius: '0.75rem', padding: '0.75rem 1rem', color: '#fff', fontSize: '0.95rem', outline: 'none' }}
            />
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button onClick={crearRutina}
                style={{ backgroundColor: '#00ff88', color: '#000', fontWeight: 700, padding: '0.75rem 1.5rem', borderRadius: '0.75rem', border: 'none', cursor: 'pointer' }}>
                Guardar
              </button>
              <button onClick={() => setMostrarForm(false)}
                style={{ backgroundColor: '#1a1a1a', color: '#71717a', fontWeight: 600, padding: '0.75rem 1.5rem', borderRadius: '0.75rem', border: '1px solid #333', cursor: 'pointer' }}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Lista de rutinas */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {rutinas.map(rutina => (
          <div key={rutina.id} style={{ backgroundColor: '#111', border: '1px solid #222', borderRadius: '1rem', padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h3 style={{ fontWeight: 700, fontSize: '1.1rem', margin: 0, marginBottom: '0.3rem' }}>{rutina.nombre}</h3>
              <p style={{ color: '#71717a', fontSize: '0.9rem', margin: 0 }}>{rutina.descripcion}</p>
              <span style={{ color: '#00aaff', fontSize: '0.8rem', marginTop: '0.4rem', display: 'block' }}>
                {rutina.ejercicios} ejercicios
              </span>
            </div>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button
                style={{ backgroundColor: '#1a1a1a', color: '#00aaff', fontWeight: 600, padding: '0.5rem 1rem', borderRadius: '0.75rem', border: '1px solid #00aaff40', cursor: 'pointer', fontSize: '0.85rem' }}>
                ✏️ Editar
              </button>
              <button onClick={() => eliminarRutina(rutina.id)}
                style={{ backgroundColor: '#1a1a1a', color: '#ff4444', fontWeight: 600, padding: '0.5rem 1rem', borderRadius: '0.75rem', border: '1px solid #ff444440', cursor: 'pointer', fontSize: '0.85rem' }}>
                🗑️ Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}