export default function Toolbar({
  sidebarOpen, setSidebarOpen,
  docType, setDocType,
  theme, setTheme,
  clientKey, setClientKey,
  onSave, onLoad, onClear, onNew,
}) {
  return (
    <aside className={`sidebar no-print ${sidebarOpen ? 'open' : ''}`}>
      <button className="close-btn" onClick={() => setSidebarOpen(false)}>✕ Close Menu</button>

      <strong>LEIMARICS</strong> Document Generator

      <select value={docType} onChange={(e) => setDocType(e.target.value)}>
        <option value="proposal">Proposal</option>
        <option value="quotation">Quotation</option>
        <option value="invoice">Invoice</option>
      </select>

      <select value={theme} onChange={(e) => setTheme(e.target.value)}>
        <option value="dark">Dark theme</option>
        <option value="light">Light theme (recommended for invoices/print)</option>
      </select>

      <input
        className="client-key-input"
        type="text"
        placeholder="Client name (used to save/load this client's draft)"
        value={clientKey}
        onChange={(e) => setClientKey(e.target.value)}
      />

      <button onClick={onSave}>💾 Save draft</button>
      <button onClick={onLoad}>📂 Load draft</button>
      <button className="warn" onClick={onClear}>🗑 Clear this client</button>
      <button onClick={onNew}>✚ New blank document</button>

      <button className="primary" onClick={() => window.print()}>⬇ Save as PDF</button>

      <div className="hint">
        Type a client name above, then Save/Load to keep separate drafts per client. Everything on the page is a real
        editable field — click and type. Use the ⊕ / × buttons to add or remove pricing cards, table rows, and list items.
      </div>
    </aside>
  )
}
