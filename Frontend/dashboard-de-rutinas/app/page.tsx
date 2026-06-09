'use client'

export default function Home() {
  const ejercicios = [
    { nombre: 'Press de banca', series: 4, reps: 12 },
    { nombre: 'Sentadillas', series: 3, reps: 15 },
    { nombre: 'Peso muerto', series: 3, reps: 10 },
  ]

  const comidas = [
    { icon: '🌅', comida: 'Desayuno', detalle: 'Avena con frutas y proteína' },
    { icon: '☀️', comida: 'Almuerzo', detalle: 'Arroz, pollo y ensalada' },
    { icon: '🌙', comida: 'Cena', detalle: 'Huevos revueltos y aguacate' },
  ]

  const tarjetas = [
    { label: 'Rutinas activas', value: '3', color: '#00ff88' },
    { label: 'Ejercicios hoy', value: '8', color: '#00aaff' },
    { label: 'Calorías del día', value: '1,840', color: '#ff00aa' },
  ]

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0a0a0a', color: '#fff', padding: '2rem 3rem', fontFamily: 'Inter, sans-serif' }}>

      {/* Header */}
      <div style={{ marginBottom: '2.5rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#fff', margin: 0 }}>Dashboard</h1>
        <p style={{ color: '#71717a', marginTop: '0.25rem' }}>Bienvenido de nuevo, <strong style={{ color: '#fff' }}>Usuario</strong></p>
      </div>

      {/* Tarjetas */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
        {tarjetas.map((card, i) => (
          <div key={i}
            style={{
              backgroundColor: '#111',
              border: `1px solid ${card.color}40`,
              borderRadius: '1rem',
              padding: '1.5rem',
            }}>
            <p style={{ color: '#71717a', fontSize: '0.85rem', marginBottom: '0.5rem' }}>{card.label}</p>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: card.color, margin: 0 }}>{card.value}</h2>
          </div>
        ))}
      </div>

      {/* Rutina del día */}
      <div style={{ backgroundColor: '#111', border: '1px solid #222', borderRadius: '1rem', padding: '1.5rem', marginBottom: '1.5rem' }}>
        <h3 style={{ color: '#00ff88', fontWeight: 700, fontSize: '1.1rem', marginBottom: '1rem' }}>🏋️ Rutina de hoy</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {ejercicios.map((e, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#1a1a1a', borderRadius: '0.75rem', padding: '0.85rem 1.2rem' }}>
              <span style={{ fontWeight: 500 }}>{e.nombre}</span>
              <span style={{ color: '#71717a', fontSize: '0.9rem' }}>
                <span style={{ color: '#00ff88', fontWeight: 700 }}>{e.series}</span> series × <span style={{ color: '#00aaff', fontWeight: 700 }}>{e.reps}</span> reps
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Alimentación */}
      <div style={{ backgroundColor: '#111', border: '1px solid #222', borderRadius: '1rem', padding: '1.5rem' }}>
        <h3 style={{ color: '#ff00aa', fontWeight: 700, fontSize: '1.1rem', marginBottom: '1rem' }}>🥗 Plan de alimentación</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
          {comidas.map((item, i) => (
            <div key={i} style={{ backgroundColor: '#1a1a1a', borderRadius: '0.75rem', padding: '1rem' }}>
              <p style={{ color: '#ff00aa', fontWeight: 700, marginBottom: '0.4rem' }}>{item.icon} {item.comida}</p>
              <p style={{ color: '#a1a1aa', fontSize: '0.9rem', margin: 0 }}>{item.detalle}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}