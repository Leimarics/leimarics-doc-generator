import { useRef, useEffect } from 'react'

/**
 * A text field that looks like plain document text but is a real
 * <input>/<textarea> underneath — reliable editing, no contentEditable
 * cursor bugs. Auto-grows to fit content when multiline.
 */
export default function Field({ value, onChange, multiline = false, className = '', placeholder = '', style = {} }) {
  const ref = useRef(null)

  useEffect(() => {
    if (multiline && ref.current) {
      ref.current.style.height = 'auto'
      ref.current.style.height = ref.current.scrollHeight + 'px'
    }
  }, [value, multiline])

  if (multiline) {
    return (
      <textarea
        ref={ref}
        className={`field field-multiline ${className}`}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        rows={1}
        style={style}
      />
    )
  }

  return (
    <input
      ref={ref}
      type="text"
      className={`field ${className}`}
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      style={style}
    />
  )
}
