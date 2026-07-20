import Field from './Field.jsx'

let featIdCounter = 4000

export default function FeatureGrid({ features, setFeatures }) {
  const update = (id, key, val) => {
    setFeatures((fs) => fs.map((f) => (f.id === id ? { ...f, [key]: val } : f)))
  }
  const addFeature = () => {
    featIdCounter += 1
    setFeatures((fs) => [...fs, { id: featIdCounter, title: 'New Strength', desc: 'Short supporting line.' }])
  }
  const removeFeature = (id) => {
    setFeatures((fs) => fs.filter((f) => f.id !== id))
  }

  return (
    <>
      <div className="feature-grid">
        {features.map((f) => (
          <div className="feat" key={f.id}>
            <div className="feat-head">
              <Field className="feat-title" value={f.title} onChange={(v) => update(f.id, 'title', v)} />
              <button className="no-print inline-remove" onClick={() => removeFeature(f.id)}>×</button>
            </div>
            <Field multiline className="feat-desc" value={f.desc} onChange={(v) => update(f.id, 'desc', v)} />
          </div>
        ))}
      </div>
      <button className="add-row-btn no-print" onClick={addFeature}>⊕ Add strength</button>
    </>
  )
}
