'use client'
import { useState } from 'react'

const ejerciciosIniciales = [
  { id: 1, nombre: 'Press de banca', rutina: 'Pecho y Tríceps', series: 4, repeticiones: 12 },
  { id: 2, nombre: 'Sentadillas', rutina: 'Piernas', series: 3, repeticiones: 15 },
  { id: 3, nombre: 'Peso muerto', rutina: 'Espalda y Bíceps', series: 3, repeticiones: 10 },
  { id: 4, nombre: 'Curl de bíceps', rutina: 'Espalda y Bíceps', series: 4, repeticiones: 12 },
  { id: 5, nombre: 'Prensa de piernas', rutina: 'Piernas', series: 4, repeticiones: 15 },
]

export default function Ejercicios() {
  const [ejercicios, setEjercicios] = useState(ejerciciosIniciales)
  const [mostrarForm, setMostrarForm] = useState(false)
  const [editandoId, setEditandoId] = useState<number | null>(null)
  const [nombre, setNombre] = useState('')
  const [rutina, setRutina] = useState('')
  const [series, setSeries] = useState('')
  const [repeticiones, setRepeticiones] = useState('')
  const [filtro, setFiltro] = useState('Todos')

  const rutinas = ['Todos', ...Array.from(new Set(ejercicios.map(e => e.rutina)))]

  const ejerciciosFiltrados = filtro === 'Todos' ? ejercicios : ejercicios.filter(e => e.rutina === filtro)

  const guardar = () => {
    if (!nombre || !rutina || !series || !repeticiones) return
    if (editandoId !== null) {
      setEjercicios(ejercicios.map(e => e.id === editandoId
        ? { ...e, nombre, rutina, series: parseInt(series), repeticiones: parseInt(repeticiones) }
        : e
      ))
      setEditandoId(null)
    } else {
      setEjercicios([...ejercicios, {
        id: Date.now(), nombre, rutina,
        series: parseInt(series), repeticiones: parseInt(repeticiones)
      }])
    }
    resetForm()
  }

  const editar = (e: typeof ejerciciosIniciales[0]) => {
    setEditandoId(e.id)
    setNombre(e.nombre)
    setRutina(e.rutina)
    setSeries(String(e.series))
    setRepeticiones(String(e.repeticiones))
    setMostrarForm(true)
  }

  const eliminar = (id: number) => {
    setEjercicios(ejercicios.filter(e => e.id !== id))
  }

  const resetForm = () => {
    setNombre(''); setRutina(''); setSeries(''); setRepeticiones('')
    setMostrarForm(false); setEditandoId(null)
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0a0a0a', color: '#fff', padding: '2rem 3rem', fontFamily: 'Inter, sans-serif' }}>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#00aaff', margin: 0 }}>⚡ Ejercicios</h1>
          <p style={{ color: '#71717a', marginTop: '0.25rem' }}>{ejercicios.length} ejercicios registrados</p>
        </div>
        <button onClick={() => { resetForm(); setMostrarForm(!mostrarForm) }}
          style={{ backgroundColor: '#00aaff', color: '#fff', fontWeight: 700, padding: '0.6rem 1.4rem', borderRadius: '9999px', border: 'none', cursor: 'pointer', fontSize: '0.95rem' }}>
          + Nuevo ejercicio
        </button>
      </div>

      {/* Formulario */}
      {mostrarForm && (
        <div style={{ backgroundColor: '#111', border: '1px solid #00aaff40', borderRadius: '1rem', padding: '1.5rem', marginBottom: '2rem' }}>
          <h3 style={{ color: '#00aaff', fontWeight: 700, marginBottom: '1rem' }}>
            {editandoId ? 'Editar ejercicio' : 'Nuevo ejercicio'}
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={{ color: '#a1a1aa', fontSize: '0.85rem', display: 'block', marginBottom: '0.4rem' }}>Nombre</label>
              <input placeholder="Ej: Press de banca" value={nombre} onChange={e => setNombre(e.target.value)}
                style={{ width: '100%', backgroundColor: '#1a1a1a', border: '1px solid #333', borderRadius: '0.75rem', padding: '0.75rem 1rem', color: '#fff', fontSize: '0.95rem', outline: 'none', boxSizing: 'border-box' }} />
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={{ color: '#a1a1aa', fontSize: '0.85rem', display: 'block', marginBottom: '0.4rem' }}>Rutina</label>
              <input placeholder="Ej: Pecho y Tríceps" value={rutina} onChange={e => setRutina(e.target.value)}
                style={{ width: '100%', backgroundColor: '#1a1a1a', border: '1px solid #333', borderRadius: '0.75rem', padding: '0.75rem 1rem', color: '#fff', fontSize: '0.95rem', outline: 'none', boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ color: '#a1a1aa', fontSize: '0.85rem', display: 'block', marginBottom: '0.4rem' }}>Series</label>
              <input type="number" placeholder="4" value={series} onChange={e => setSeries(e.target.value)}
                style={{ width: '100%', backgroundColor: '#1a1a1a', border: '1px solid #333', borderRadius: '0.75rem', padding: '0.75rem 1rem', color: '#fff', fontSize: '0.95rem', outline: 'none', boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ color: '#a1a1aa', fontSize: '0.85rem', display: 'block', marginBottom: '0.4rem' }}>Repeticiones</label>
              <input type="number" placeholder="12" value={repeticiones} onChange={e => setRepeticiones(e.target.value)}
                style={{ width: '100%', backgroundColor: '#1a1a1a', border: '1px solid #333', borderRadius: '0.75rem', padding: '0.75rem 1rem', color: '#fff', fontSize: '0.95rem', outline: 'none', boxSizing: 'border-box' }} />
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
            <button onClick={guardar}
              style={{ backgroundColor: '#00aaff', color: '#fff', fontWeight: 700, padding: '0.75rem 1.5rem', borderRadius: '0.75rem', border: 'none', cursor: 'pointer' }}>
              {editandoId ? 'Actualizar' : 'Guardar'}
            </button>
            <button onClick={resetForm}
              style={{ backgroundColor: '#1a1a1a', color: '#71717a', fontWeight: 600, padding: '0.75rem 1.5rem', borderRadius: '0.75rem', border: '1px solid #333', cursor: 'pointer' }}>
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* Filtros por rutina */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        {rutinas.map((r, i) => (
          <button key={i} onClick={() => setFiltro(r)}
            style={{
              padding: '0.4rem 1rem', borderRadius: '9999px', border: 'none', cursor: 'pointer',
              fontWeight: 600, fontSize: '0.85rem',
              backgroundColor: filtro === r ? '#00aaff' : '#1a1a1a',
              color: filtro === r ? '#fff' : '#71717a',
            }}>
            {r}
          </button>
        ))}
      </div>

      {/* Lista de ejercicios */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {ejerciciosFiltrados.map((e) => (
          <div key={e.id} style={{ backgroundColor: '#111', border: '1px solid #222', borderRadius: '1rem', padding: '1.2rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h3 style={{ fontWeight: 700, fontSize: '1rem', margin: 0, marginBottom: '0.3rem' }}>{e.nombre}</h3>
              <span style={{ backgroundColor: '#00aaff20', color: '#00aaff', fontSize: '0.75rem', fontWeight: 600, padding: '0.2rem 0.6rem', borderRadius: '9999px' }}>
                {e.rutina}
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              <div style={{ textAlign: 'center' }}>
                <p style={{ color: '#71717a', fontSize: '0.75rem', margin: 0 }}>Series</p>
                <p style={{ color: '#00ff88', fontWeight: 800, fontSize: '1.3rem', margin: 0 }}>{e.series}</p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <p style={{ color: '#71717a', fontSize: '0.75rem', margin: 0 }}>Reps</p>
                <p style={{ color: '#00aaff', fontWeight: 800, fontSize: '1.3rem', margin: 0 }}>{e.repeticiones}</p>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button onClick={() => editar(e)}
                  style={{ backgroundColor: '#1a1a1a', color: '#00aaff', fontWeight: 600, padding: '0.5rem 1rem', borderRadius: '0.75rem', border: '1px solid #00aaff40', cursor: 'pointer', fontSize: '0.85rem' }}>
                  ✏️
                </button>
                <button onClick={() => eliminar(e.id)}
                  style={{ backgroundColor: '#1a1a1a', color: '#ff4444', fontWeight: 600, padding: '0.5rem 1rem', borderRadius: '0.75rem', border: '1px solid #ff444440', cursor: 'pointer', fontSize: '0.85rem' }}>
                  🗑️
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}