import Field from './Field.jsx'

let cardIdCounter = 100

export default function PricingCards({ cards, setCards }) {
  const updateCard = (id, key, val) => {
    setCards((cs) => cs.map((c) => (c.id === id ? { ...c, [key]: val } : c)))
  }
  const updateFeature = (id, idx, val) => {
    setCards((cs) =>
      cs.map((c) => {
        if (c.id !== id) return c
        const features = [...c.features]
        features[idx] = val
        return { ...c, features }
      })
    )
  }
  const addFeature = (id) => {
    setCards((cs) => cs.map((c) => (c.id === id ? { ...c, features: [...c.features, 'New feature'] } : c)))
  }
  const removeFeature = (id, idx) => {
    setCards((cs) =>
      cs.map((c) => (c.id === id ? { ...c, features: c.features.filter((_, i) => i !== idx) } : c))
    )
  }
  const addCard = () => {
    cardIdCounter += 1
    setCards((cs) => [
      ...cs,
      {
        id: cardIdCounter,
        ribbon: 'New Option',
        name: 'Option',
        priceCad: 'CAD 0',
        priceInr: '₹ 0',
        featured: false,
        features: ['Feature one', 'Feature two'],
      },
    ])
  }
  const removeCard = (id) => {
    setCards((cs) => cs.filter((c) => c.id !== id))
  }
  const toggleFeatured = (id) => {
    setCards((cs) => cs.map((c) => (c.id === id ? { ...c, featured: !c.featured } : c)))
  }

  return (
    <>
      <div className="cards-grid">
        {cards.map((card) => (
          <div key={card.id} className={`pkg-card ${card.featured ? 'featured' : ''}`}>
            <button className="card-remove no-print" onClick={() => removeCard(card.id)} title="Remove card">
              ×
            </button>
            <div className="price-block" onDoubleClick={() => toggleFeatured(card.id)} title="Double-click to toggle highlight">
              <Field className="ribbon" value={card.ribbon} onChange={(v) => updateCard(card.id, 'ribbon', v)} />
              <Field className="name" value={card.name} onChange={(v) => updateCard(card.id, 'name', v)} />
              <Field className="price-cad" value={card.priceCad} onChange={(v) => updateCard(card.id, 'priceCad', v)} />
              <Field className="price-inr" value={card.priceInr} onChange={(v) => updateCard(card.id, 'priceInr', v)} />
            </div>
            <ul className="features">
              {card.features.map((f, idx) => (
                <li key={idx}>
                  <Field className="feature-field" value={f} onChange={(v) => updateFeature(card.id, idx, v)} />
                  <button className="no-print inline-remove" onClick={() => removeFeature(card.id, idx)}>
                    ×
                  </button>
                </li>
              ))}
            </ul>
            <button className="add-row-btn no-print feature-add" onClick={() => addFeature(card.id)}>
              ⊕ Add feature line
            </button>
          </div>
        ))}
      </div>
      <button className="add-row-btn no-print add-card-btn" onClick={addCard}>
        ⊕ Add package card
      </button>
    </>
  )
}
