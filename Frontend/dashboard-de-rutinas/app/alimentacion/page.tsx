'use client'
import { useState } from 'react'

const alimentosIniciales = [
  { id: 1, desayuno: 'Avena con frutas y proteína', almuerzo: 'Arroz, pollo y ensalada', cena: 'Huevos revueltos y aguacate' },
]

export default function Alimentacion() {
  const [alimentos, setAlimentos] = useState(alimentosIniciales)
  const [mostrarForm, setMostrarForm] = useState(false)
  const [editandoId, setEditandoId] = useState<number | null>(null)
  const [desayuno, setDesayuno] = useState('')
  const [almuerzo, setAlmuerzo] = useState('')
  const [cena, setCena] = useState('')

  const guardar = () => {
    if (!desayuno || !almuerzo || !cena) return
    if (editandoId !== null) {
      setAlimentos(alimentos.map(a => a.id === editandoId ? { ...a, desayuno, almuerzo, cena } : a))
      setEditandoId(null)
    } else {
      setAlimentos([...alimentos, { id: Date.now(), desayuno, almuerzo, cena }])
    }
    setDesayuno('')
    setAlmuerzo('')
    setCena('')
    setMostrarForm(false)
  }

  const editar = (a: typeof alimentosIniciales[0]) => {
    setEditandoId(a.id)
    setDesayuno(a.desayuno)
    setAlmuerzo(a.almuerzo)
    setCena(a.cena)
    setMostrarForm(true)
  }

  const eliminar = (id: number) => {
    setAlimentos(alimentos.filter(a => a.id !== id))
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0a0a0a', color: '#fff', padding: '2rem 3rem', fontFamily: 'Inter, sans-serif' }}>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#ff00aa', margin: 0 }}>🥗 Alimentación</h1>
          <p style={{ color: '#71717a', marginTop: '0.25rem' }}>{alimentos.length} planes registrados</p>
        </div>
        <button onClick={() => { setMostrarForm(!mostrarForm); setEditandoId(null); setDesayuno(''); setAlmuerzo(''); setCena('') }}
          style={{ backgroundColor: '#ff00aa', color: '#fff', fontWeight: 700, padding: '0.6rem 1.4rem', borderRadius: '9999px', border: 'none', cursor: 'pointer', fontSize: '0.95rem' }}>
          + Nuevo plan
        </button>
      </div>

      {/* Formulario */}
      {mostrarForm && (
        <div style={{ backgroundColor: '#111', border: '1px solid #ff00aa40', borderRadius: '1rem', padding: '1.5rem', marginBottom: '2rem' }}>
          <h3 style={{ color: '#ff00aa', fontWeight: 700, marginBottom: '1rem' }}>
            {editandoId ? 'Editar plan' : 'Nuevo plan de alimentación'}
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {[
              { label: '🌅 Desayuno', value: desayuno, set: setDesayuno, placeholder: 'Ej: Avena con frutas' },
              { label: '☀️ Almuerzo', value: almuerzo, set: setAlmuerzo, placeholder: 'Ej: Arroz, pollo y ensalada' },
              { label: '🌙 Cena', value: cena, set: setCena, placeholder: 'Ej: Huevos y aguacate' },
            ].map((campo, i) => (
              <div key={i}>
                <label style={{ color: '#a1a1aa', fontSize: '0.85rem', display: 'block', marginBottom: '0.4rem' }}>{campo.label}</label>
                <input
                  placeholder={campo.placeholder}
                  value={campo.value}
                  onChange={e => campo.set(e.target.value)}
                  style={{ width: '100%', backgroundColor: '#1a1a1a', border: '1px solid #333', borderRadius: '0.75rem', padding: '0.75rem 1rem', color: '#fff', fontSize: '0.95rem', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>
            ))}
            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.25rem' }}>
              <button onClick={guardar}
                style={{ backgroundColor: '#ff00aa', color: '#fff', fontWeight: 700, padding: '0.75rem 1.5rem', borderRadius: '0.75rem', border: 'none', cursor: 'pointer' }}>
                {editandoId ? 'Actualizar' : 'Guardar'}
              </button>
              <button onClick={() => setMostrarForm(false)}
                style={{ backgroundColor: '#1a1a1a', color: '#71717a', fontWeight: 600, padding: '0.75rem 1.5rem', borderRadius: '0.75rem', border: '1px solid #333', cursor: 'pointer' }}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Lista de planes */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {alimentos.map((a, i) => (
          <div key={a.id} style={{ backgroundColor: '#111', border: '1px solid #222', borderRadius: '1rem', padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ color: '#fff', fontWeight: 700, margin: 0 }}>Plan #{i + 1}</h3>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button onClick={() => editar(a)}
                  style={{ backgroundColor: '#1a1a1a', color: '#00aaff', fontWeight: 600, padding: '0.5rem 1rem', borderRadius: '0.75rem', border: '1px solid #00aaff40', cursor: 'pointer', fontSize: '0.85rem' }}>
                  ✏️ Editar
                </button>
                <button onClick={() => eliminar(a.id)}
                  style={{ backgroundColor: '#1a1a1a', color: '#ff4444', fontWeight: 600, padding: '0.5rem 1rem', borderRadius: '0.75rem', border: '1px solid #ff444440', cursor: 'pointer', fontSize: '0.85rem' }}>
                  🗑️ Eliminar
                </button>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
              {[
                { label: '🌅 Desayuno', value: a.desayuno, color: '#00ff88' },
                { label: '☀️ Almuerzo', value: a.almuerzo, color: '#00aaff' },
                { label: '🌙 Cena', value: a.cena, color: '#ff00aa' },
              ].map((comida, j) => (
                <div key={j} style={{ backgroundColor: '#1a1a1a', borderRadius: '0.75rem', padding: '1rem' }}>
                  <p style={{ color: comida.color, fontWeight: 700, marginBottom: '0.4rem', fontSize: '0.85rem' }}>{comida.label}</p>
                  <p style={{ color: '#a1a1aa', fontSize: '0.9rem', margin: 0 }}>{comida.value}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}