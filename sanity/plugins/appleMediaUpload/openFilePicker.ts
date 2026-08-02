type OpenFilePickerOptions = {
  accept?: string
  capture?: string
  multiple?: boolean
  onSelect: (files: File[]) => void
  onCancel?: () => void
}

/** Opens a native file picker (supports Shift/Ctrl multi-select when `multiple` is true). */
export function openFilePicker(options: OpenFilePickerOptions) {
  const {accept, capture, multiple, onSelect, onCancel} = options
  const input = document.createElement('input')

  input.type = 'file'
  input.accept = accept ?? ''
  input.multiple = multiple ?? false
  if (capture) input.capture = capture
  input.style.display = 'none'
  input.setAttribute('data-testid', 'open-file-picker-input')

  let handled = false

  const cleanup = () => {
    if (input.isConnected) input.remove()
  }

  const handleChange = () => {
    handled = true
    window.removeEventListener('focus', handleCancel)
    if (input.files && input.files.length > 0) {
      onSelect(Array.from(input.files))
    }
    cleanup()
  }

  const handleCancel = () => {
    if (!handled) {
      onCancel?.()
      cleanup()
    }
  }

  input.addEventListener('change', handleChange, {once: true})
  window.addEventListener('focus', handleCancel, {once: true})
  document.body.appendChild(input)
  input.click()
}
