import Field from './Field.jsx'

let rowIdCounter = 1000

export default function DataTable({ columns, rows, setRows, colWidths = [] }) {
  const updateCell = (rowId, colIdx, val) => {
    setRows((rs) =>
      rs.map((r) => {
        if (r.id !== rowId) return r
        const cells = [...r.cells]
        cells[colIdx] = val
        return { ...r, cells }
      })
    )
  }
  const addRow = () => {
    rowIdCounter += 1
    setRows((rs) => [...rs, { id: rowIdCounter, cells: columns.map(() => 'New value') }])
  }
  const removeRow = (rowId) => {
    setRows((rs) => rs.filter((r) => r.id !== rowId))
  }

  return (
    <>
      <table>
        <thead>
          <tr>
            {columns.map((c, i) => (
              <th key={i} style={colWidths[i] ? { width: colWidths[i] } : undefined}>
                {c}
              </th>
            ))}
            <th className="no-print row-actions"></th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              {row.cells.map((cell, idx) => (
                <td key={idx}>
                  <Field className="cell-field" value={cell} onChange={(v) => updateCell(row.id, idx, v)} />
                </td>
              ))}
              <td className="row-actions no-print">
                <button onClick={() => removeRow(row.id)}>×</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="add-row-btn no-print" onClick={addRow}>
        ⊕ Add row
      </button>
    </>
  )
}
