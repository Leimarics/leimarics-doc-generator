import { useState, useEffect } from 'react'
import Toolbar from './components/Toolbar.jsx'
import BrandHeader from './components/BrandHeader.jsx'
import Field from './components/Field.jsx'
import PricingCards from './components/PricingCards.jsx'
import DataTable from './components/DataTable.jsx'
import ListSection from './components/ListSection.jsx'
import InvoiceTable from './components/InvoiceTable.jsx'
import FeatureGrid from './components/FeatureGrid.jsx'

const STORAGE_PREFIX = 'leimarics_doc__'

function defaultDoc() {
  return {
    theme: 'dark',
    meta: {
      tagline: 'Cloud-Native Web & Infrastructure Agency\nwww.leimarics.com · leofrancis6988@gmail.com · Goa, India',
      docNo: 'QT-CLIENT-2026-001',
      dateIssued: 'July 7, 2026',
      validOrDue: 'July 21, 2026',
      clientName: 'Client Company Inc.',
      clientAddress: 'Attn: Client Contact Name\nCity, Country',
    },
    title: {
      main: 'Project Proposal',
      subtitle: 'One-line description of the engagement',
      intro:
        "This document outlines the scope, deliverables, and cost structure for the requested engineering services. All work is built to production standards, backed by the same DevOps practices used across Leimarics' enterprise projects.",
    },
    cards: [
      {
        id: 1,
        ribbon: 'Starter',
        name: 'Option A',
        priceCad: 'CAD 900',
        priceInr: '₹ 61,317',
        featured: false,
        features: ['Feature one goes here', 'Feature two goes here', '7 working days delivery', '30 days post-launch support'],
      },
      {
        id: 2,
        ribbon: 'Recommended',
        name: 'Option B',
        priceCad: 'CAD 1,400',
        priceInr: '₹ 95,382',
        featured: true,
        features: ['Feature one goes here', 'Feature two goes here', '14–18 working days delivery', '30 days post-launch support'],
      },
    ],
    recommendation:
      'Leimarics Recommendation: Short note on which option suits this client and why, and what upgrading later would involve.',
    includedRows: [
      { id: 1, cells: ['Platform', 'Shopify', 'Next.js + Supabase'] },
      { id: 2, cells: ['Delivery Timeline', '7 working days', '14–18 working days'] },
    ],
    exclusions: [
      { id: 1, text: 'Product photography / content — client provides all images and copy' },
      { id: 2, text: 'Paid advertising or social media management' },
    ],
    paymentRows: [
      { id: 1, cells: ['50% Advance', 'CAD 450', 'Before work commences'] },
      { id: 2, cells: ['50% Balance', 'CAD 450', 'On delivery, before handover'] },
    ],
    paymentNote: 'Payment via International Bank Transfer (SWIFT/Wise/PayPal) or UPI / bank transfer (India).',
    timelineRows: [
      { id: 1, cells: ['Day 1', 'Advance confirmed · setup begins'] },
      { id: 2, cells: ['Final Day', 'Client review · handover training · goes live'] },
    ],
    features: [
      { id: 1, title: 'Engineering-First', desc: 'Every project built to production standards — not templates.' },
      { id: 2, title: 'DevOps-Native', desc: 'The only Goa agency with a DevOps engineer building your infrastructure.' },
      { id: 3, title: 'Full-Stack Capability', desc: 'From UI design to AWS cloud infrastructure, with no outsourcing.' },
      { id: 4, title: 'Result-Driven', desc: 'Your site stays live, fast, and secure — always.' },
    ],
    steps: [
      { id: 1, text: 'Select your preferred option and confirm by reply or WhatsApp.' },
      { id: 2, text: 'Advance payment processed — Leimarics issues a formal invoice.' },
      { id: 3, text: 'Live delivery within the agreed timeline.' },
    ],
    invoiceLines: [{ id: 1, desc: 'Web application build', qty: 1, rate: 1400 }],
    invoiceTaxRate: 0,
    invoiceCurrency: 'CAD',
    invoicePaymentDetails:
      'Bank Transfer (International): SWIFT/Wise — details on request.\nUPI / India: leofrancis6988@okhdfcbank (example — replace with real UPI ID).\nTerms: Payment due within 14 days of invoice date. A late fee of 2% per month applies to overdue balances.',
    closingNote: 'This document is valid for 14 days from the date issued above. Available for a quick call to answer any questions.',
    footerText:
      'Leimarics — Cloud-Native Web & Infrastructure Agency · Leo Francis, Founder · leofrancis6988@gmail.com · +91-7499216988 · www.leimarics.com · Goa, India',
  }
}

export default function App() {
  const [docType, setDocType] = useState('proposal')
  const [clientKey, setClientKey] = useState('')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [doc, setDoc] = useState(defaultDoc())

  const isInvoice = docType === 'invoice'
  const showProposalSections = docType === 'proposal' || docType === 'quotation'

  const updateField = (section, key) => (val) =>
    setDoc((d) => ({ ...d, [section]: { ...d[section], [key]: val } }))

  const setCards = (updater) => setDoc((d) => ({ ...d, cards: typeof updater === 'function' ? updater(d.cards) : updater }))
  const setIncludedRows = (updater) => setDoc((d) => ({ ...d, includedRows: typeof updater === 'function' ? updater(d.includedRows) : updater }))
  const setPaymentRows = (updater) => setDoc((d) => ({ ...d, paymentRows: typeof updater === 'function' ? updater(d.paymentRows) : updater }))
  const setTimelineRows = (updater) => setDoc((d) => ({ ...d, timelineRows: typeof updater === 'function' ? updater(d.timelineRows) : updater }))
  const setExclusions = (updater) => setDoc((d) => ({ ...d, exclusions: typeof updater === 'function' ? updater(d.exclusions) : updater }))
  const setSteps = (updater) => setDoc((d) => ({ ...d, steps: typeof updater === 'function' ? updater(d.steps) : updater }))
  const setFeatures = (updater) => setDoc((d) => ({ ...d, features: typeof updater === 'function' ? updater(d.features) : updater }))
  const setInvoiceLines = (updater) => setDoc((d) => ({ ...d, invoiceLines: typeof updater === 'function' ? updater(d.invoiceLines) : updater }))
  const setInvoiceTaxRate = (val) => setDoc((d) => ({ ...d, invoiceTaxRate: val }))
  const setInvoiceCurrency = (val) => setDoc((d) => ({ ...d, invoiceCurrency: val }))

  const setMeta = (updater) => setDoc((d) => ({ ...d, meta: typeof updater === 'function' ? updater(d.meta) : updater }))

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', doc.theme)
  }, [doc.theme])

  const setTheme = (theme) => setDoc((d) => ({ ...d, theme }))

  const storageKeyFor = (key, type) => `${STORAGE_PREFIX}${(key || 'default').trim().toLowerCase().replace(/\s+/g, '_')}__${type}`

  const handleSave = () => {
    const key = storageKeyFor(clientKey, docType)
    localStorage.setItem(key, JSON.stringify(doc))
    alert(`Saved draft for "${clientKey || 'default'}" (${docType}).`)
  }

  const handleLoad = () => {
    const key = storageKeyFor(clientKey, docType)
    const saved = localStorage.getItem(key)
    if (saved) {
      setDoc(JSON.parse(saved))
    } else {
      alert(`No saved draft found for "${clientKey || 'default'}" (${docType}).`)
    }
  }

  const handleClear = () => {
    const key = storageKeyFor(clientKey, docType)
    if (confirm(`Clear the saved draft for "${clientKey || 'default'}" (${docType})? This cannot be undone.`)) {
      localStorage.removeItem(key)
      alert('Draft cleared.')
    }
  }

  const handleNew = () => {
    if (confirm('Start a new blank document? Unsaved changes on screen will be lost (saved drafts are unaffected).')) {
      setDoc(defaultDoc())
      setClientKey('')
    }
  }

  const handleSetDocType = (type) => {
    setDocType(type)
    const titles = { proposal: 'Project Proposal', quotation: 'Quotation', invoice: 'Invoice' }
    setDoc((d) => {
      const knownTitles = Object.values(titles)
      if (knownTitles.includes(d.title.main)) {
        return { ...d, title: { ...d.title, main: titles[type] } }
      }
      return d
    })
  }

  return (
    <div className="app-layout">
      <button className="no-print menu-toggle" onClick={() => setSidebarOpen(true)}>☰ Menu</button>
      <Toolbar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        docType={docType}
        setDocType={handleSetDocType}
        theme={doc.theme}
        setTheme={setTheme}
        clientKey={clientKey}
        setClientKey={setClientKey}
        onSave={handleSave}
        onLoad={handleLoad}
        onClear={handleClear}
        onNew={handleNew}
      />

      <main className="main-workspace">
        <div className="sheet" id="sheet">
          <BrandHeader theme={doc.theme} docType={docType} meta={doc.meta} setMeta={setMeta} />

          <div className="doc-title">
            <Field className="doc-h1" value={doc.title.main} onChange={updateField('title', 'main')} />
            <Field className="doc-subtitle" value={doc.title.subtitle} onChange={updateField('title', 'subtitle')} />
            <Field multiline className="doc-intro" value={doc.title.intro} onChange={updateField('title', 'intro')} />
          </div>

          {showProposalSections && (
            <>
              <div className="section">
                <div className="section-bar">01 — Package Options</div>
                <PricingCards cards={doc.cards} setCards={setCards} />
              </div>

              <div className="callout">
                <Field multiline className="callout-field" value={doc.recommendation} onChange={(v) => setDoc((d) => ({ ...d, recommendation: v }))} />
              </div>

              <div className="section">
                <div className="section-bar">02 — What's Included</div>
                <DataTable
                  columns={['Deliverable', 'Option A', 'Option B']}
                  rows={doc.includedRows}
                  setRows={setIncludedRows}
                />
              </div>

              <div className="section">
                <div className="section-bar">03 — Exclusions (Not Included)</div>
                <ListSection items={doc.exclusions} setItems={setExclusions} />
              </div>

              <div className="section">
                <div className="section-bar">04 — Payment Terms</div>
                <DataTable
                  columns={['Milestone', 'Amount', 'Trigger']}
                  rows={doc.paymentRows}
                  setRows={setPaymentRows}
                />
                <Field
                  multiline
                  className="small-note"
                  value={doc.paymentNote}
                  onChange={(v) => setDoc((d) => ({ ...d, paymentNote: v }))}
                />
              </div>

              <div className="section">
                <div className="section-bar">05 — Delivery Timeline</div>
                <DataTable
                  columns={['Day', 'Milestone']}
                  colWidths={['70px']}
                  rows={doc.timelineRows}
                  setRows={setTimelineRows}
                />
              </div>

              <div className="section">
                <div className="section-bar">06 — Why Leimarics</div>
                <FeatureGrid features={doc.features} setFeatures={setFeatures} />
              </div>

              <div className="section">
                <div className="section-bar">07 — Next Steps</div>
                <ListSection items={doc.steps} setItems={setSteps} ordered />
              </div>
            </>
          )}

          {isInvoice && (
            <>
              <div className="section">
                <div className="section-bar">Line Items</div>
                <InvoiceTable
                  lines={doc.invoiceLines}
                  setLines={setInvoiceLines}
                  taxRate={doc.invoiceTaxRate}
                  setTaxRate={setInvoiceTaxRate}
                  currency={doc.invoiceCurrency}
                  setCurrency={setInvoiceCurrency}
                />
              </div>
              <div className="section">
                <div className="section-bar">Payment Details</div>
                <Field
                  multiline
                  className="small-note"
                  value={doc.invoicePaymentDetails}
                  onChange={(v) => setDoc((d) => ({ ...d, invoicePaymentDetails: v }))}
                />
              </div>
            </>
          )}

          <div className="callout">
            <Field multiline className="callout-field" value={doc.closingNote} onChange={(v) => setDoc((d) => ({ ...d, closingNote: v }))} />
          </div>

          <div className="footer">
            <Field multiline className="footer-field" value={doc.footerText} onChange={(v) => setDoc((d) => ({ ...d, footerText: v }))} />
          </div>
        </div>
      </main>
    </div>
  )
}
