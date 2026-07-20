# Leimarics Document Generator

A live, editable Proposal / Quotation / Invoice generator for Leimarics, built with the
same stack you already use for the Alphavatar poster tool (Vite + React), so it deploys
to Vercel the exact same way.

Brand colors, fonts, and logo are locked into `src/styles.css` and `src/Logos.jsx` —
you never have to touch those. Everything else on the page is a real editable field.

---

## 1. Run it locally

You need Node.js installed (you already have this from your DevOps work).

```bash
cd leimarics-doc-generator
npm install
npm run dev
```

Open the URL it prints (usually `http://localhost:5173`). Edit, refresh, whatever —
it's just a local dev server.

## 2. Using the generator

- **Document type dropdown** (top left) — switches between Proposal, Quotation, and
  Invoice. Same header/footer/brand, different sections show/hide.
- **Theme dropdown** — Dark or Light. Your own brand guidelines say invoices and
  printed documents should use the **light** wordmark — worth using that for anything
  you're sending as a final PDF.
- **Client name field** — type the client's name here *before* you hit Save draft.
  Save/Load/Clear are all scoped to `clientName + document type`, so Anthony's
  proposal draft and Floyd's invoice draft never collide. Leave it blank to use a
  single "default" slot.
- **Save draft** — saves everything on screen to this browser's local storage.
- **Load draft** — loads it back. (Per browser/device — see note below.)
- **New blank document** — resets the visible page to the starting template without
  touching any saved drafts.
- **⊕ / ×** buttons — add or remove pricing cards, table rows, checklist items, steps,
  and "Why Leimarics" blocks. They never show up in the printed PDF.
- **Save as PDF** — opens the browser print dialog. In the dialog:
  - Destination: Save as PDF
  - Margins: Default
  - **Background graphics: ON** (critical — without this the dark theme prints white)

Everything you see is a normal text field — click it and type, the same as editing
text in any form. No more fighting a canvas.

> **Note on drafts:** local storage is per-browser, per-device — it does **not** sync
> between your laptop and phone. For now, treat "Save draft" as a same-device safety
> net, and export the PDF as the actual deliverable you send to a client. If you want
> real cross-device sync (e.g. so you can start a quote on your phone and finish it on
> your laptop), the next step would be wiring this up to a Supabase table instead of
> localStorage — happy to build that next if you want it.

## 3. Deploy to Vercel (same as the Alphavatar poster tool)

```bash
npm install -g vercel   # only needed once
vercel login            # only needed once
vercel                  # deploys a preview
vercel --prod           # deploys to your production URL
```

Or, just as easily:
1. Push this folder to a GitHub repo.
2. Go to vercel.com → New Project → Import the repo.
3. Framework preset: **Vite** (auto-detected). No config needed — leave build command
   as `npm run build` and output directory as `dist`.
4. Deploy.

You'll get a URL like `leimarics-docs.vercel.app` that works from any device —
phone, laptop, at a client's office, wherever.

## 4. Project structure

```
leimarics-doc-generator/
├── index.html              entry HTML (loads Outfit + DM Mono fonts)
├── src/
│   ├── main.jsx             React root
│   ├── App.jsx              all document state lives here
│   ├── styles.css           brand system — colors, fonts, print rules
│   ├── Logos.jsx            dark/light logo as React components
│   └── components/
│       ├── Toolbar.jsx          doc type / theme / save-load controls
│       ├── BrandHeader.jsx      logo + quote/invoice meta block
│       ├── Field.jsx             the reusable "invisible input" used everywhere
│       ├── PricingCards.jsx     Option A/B/C pricing cards
│       ├── DataTable.jsx        generic editable table (included/payment/timeline)
│       ├── ListSection.jsx      exclusions list + next-steps list
│       ├── FeatureGrid.jsx      "Why Leimarics" 2x2 block
│       └── InvoiceTable.jsx     line items with live qty × rate math
```

## 5. Extending it later

- **Add a new section**: copy the pattern of any existing `<div className="section">`
  block in `App.jsx` — a `.section-bar` header plus whatever component you need.
- **Add a new document type**: add an option to the `<select>` in `Toolbar.jsx`, then
  gate any type-specific sections in `App.jsx` with a condition like `docType === 'yourtype'`.
- **Client database instead of localStorage**: swap the `handleSave`/`handleLoad`
  functions in `App.jsx` for Supabase calls (`supabase.from('drafts').upsert(...)` /
  `.select(...)`) — the rest of the app doesn't need to change.
