import Field from './Field.jsx'

let itemIdCounter = 2000

export default function ListSection({ items, setItems, ordered = false }) {
  const updateItem = (id, val) => {
    setItems((its) => its.map((it) => (it.id === id ? { ...it, text: val } : it)))
  }
  const addItem = () => {
    itemIdCounter += 1
    setItems((its) => [...its, { id: itemIdCounter, text: 'New item' }])
  }
  const removeItem = (id) => {
    setItems((its) => its.filter((it) => it.id !== id))
  }

  const Tag = ordered ? 'ol' : 'ul'

  return (
    <>
      <Tag className={ordered ? 'steps' : 'checklist'}>
        {items.map((it, idx) => (
          <li key={it.id}>
            {ordered && <span className="step-num">{idx + 1}</span>}
            <Field multiline className="txt" value={it.text} onChange={(v) => updateItem(it.id, v)} />
            <button className="no-print inline-remove" onClick={() => removeItem(it.id)}>
              ×
            </button>
          </li>
        ))}
      </Tag>
      <button className="add-row-btn no-print" onClick={addItem}>
        ⊕ Add {ordered ? 'step' : 'item'}
      </button>
    </>
  )
}
