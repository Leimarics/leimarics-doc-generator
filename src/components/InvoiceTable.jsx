import Field from './Field.jsx'

let lineIdCounter = 3000

function fmt(n) {
  return n.toLocaleString('en-CA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

export default function InvoiceTable({ lines, setLines, taxRate, setTaxRate, currency, setCurrency }) {
  const updateLine = (id, key, val) => {
    setLines((ls) => ls.map((l) => (l.id === id ? { ...l, [key]: val } : l)))
  }
  const addLine = () => {
    lineIdCounter += 1
    setLines((ls) => [...ls, { id: lineIdCounter, desc: 'New line item', qty: 1, rate: 0 }])
  }
  const removeLine = (id) => {
    setLines((ls) => ls.filter((l) => l.id !== id))
  }

  const subtotal = lines.reduce((sum, l) => sum + (parseFloat(l.qty) || 0) * (parseFloat(l.rate) || 0), 0)
  const tax = subtotal * ((parseFloat(taxRate) || 0) / 100)
  const total = subtotal + tax

  return (
    <>
      <div className="currency-row no-print">
        Currency:{' '}
        <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
          <option value="CAD">CAD</option>
          <option value="INR">INR</option>
          <option value="USD">USD</option>
        </select>
      </div>
      <table>
        <thead>
          <tr>
            <th>Description</th>
            <th className="num" style={{ width: 60 }}>Qty</th>
            <th className="num" style={{ width: 110 }}>Rate ({currency})</th>
            <th className="num" style={{ width: 120 }}>Amount ({currency})</th>
            <th className="no-print row-actions"></th>
          </tr>
        </thead>
        <tbody>
          {lines.map((l) => (
            <tr key={l.id}>
              <td><Field className="cell-field" value={l.desc} onChange={(v) => updateLine(l.id, 'desc', v)} /></td>
              <td className="num">
                <input
                  type="number"
                  className="num-input"
                  value={l.qty}
                  min="0"
                  step="1"
                  onChange={(e) => updateLine(l.id, 'qty', e.target.value)}
                />
              </td>
              <td className="num">
                <input
                  type="number"
                  className="num-input"
                  value={l.rate}
                  min="0"
                  step="1"
                  onChange={(e) => updateLine(l.id, 'rate', e.target.value)}
                />
              </td>
              <td className="num amount">{fmt((parseFloat(l.qty) || 0) * (parseFloat(l.rate) || 0))}</td>
              <td className="row-actions no-print">
                <button onClick={() => removeLine(l.id)}>×</button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={3} style={{ textAlign: 'right', fontWeight: 500 }}>Subtotal</td>
            <td className="num">{fmt(subtotal)}</td>
            <td className="no-print"></td>
          </tr>
          <tr>
            <td colSpan={3} style={{ textAlign: 'right', fontWeight: 500 }}>
              Tax{' '}
              <input
                type="number"
                className="tax-input"
                value={taxRate}
                min="0"
                step="0.1"
                onChange={(e) => setTaxRate(e.target.value)}
              />{' '}
              %
            </td>
            <td className="num">{fmt(tax)}</td>
            <td className="no-print"></td>
          </tr>
          <tr className="total-row">
            <td colSpan={3} style={{ textAlign: 'right' }}>Total Due ({currency})</td>
            <td className="num">{fmt(total)}</td>
            <td className="no-print"></td>
          </tr>
        </tfoot>
      </table>
      <button className="add-row-btn no-print" onClick={addLine}>
        ⊕ Add line item
      </button>
    </>
  )
}
