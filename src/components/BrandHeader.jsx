import { LogoDark, LogoLight } from '../Logos.jsx'
import Field from './Field.jsx'

export default function BrandHeader({ theme, docType, meta, setMeta }) {
  const isInvoice = docType === 'invoice'

  const update = (key) => (val) => setMeta((m) => ({ ...m, [key]: val }))

  return (
    <div className="brand-header">
      <div className="logo-block">
        {theme === 'dark' ? <LogoDark /> : <LogoLight />}
        <Field
          multiline
          className="tagline"
          value={meta.tagline}
          onChange={update('tagline')}
        />
      </div>

      <div className="meta-box">
        <div className="row">
          <span className="label">{isInvoice ? 'Invoice No.' : 'Quote No.'}</span>
          <br />
          <Field className="val mono" value={meta.docNo} onChange={update('docNo')} />
        </div>
        <div className="row">
          <span className="label">Date Issued</span>
          <br />
          <Field className="val" value={meta.dateIssued} onChange={update('dateIssued')} />
        </div>
        <div className="row">
          <span className="label">{isInvoice ? 'Due Date' : 'Valid Until'}</span>
          <br />
          <Field className="val" value={meta.validOrDue} onChange={update('validOrDue')} />
        </div>
        <div className="prepared">
          <span className="label">{isInvoice ? 'Bill To' : 'Prepared For'}</span>
          <Field className="val name" value={meta.clientName} onChange={update('clientName')} />
          <Field multiline className="val" value={meta.clientAddress} onChange={update('clientAddress')} />
        </div>
      </div>
    </div>
  )
}
