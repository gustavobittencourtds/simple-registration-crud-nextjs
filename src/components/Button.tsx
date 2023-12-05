interface ButtonProps {
  children: any
  color?: 'green' | 'blue' | 'gray'
  className?: string
  onClick?: () => void
  disabled?: boolean
  buttonType?: string
}

export default function Button(props: ButtonProps) {
  const color = props.color ?? 'gray'

  return (
    <button
      data-testid={props.buttonType + '-button'}
      className={`
      bg-gradient-to-r from-${color}-400 to-${color}-700
      text-white px-4 py-2 rounded-md
      ${props.disabled ? 'opacity-50' : ''}
      ${props.className}`}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  )
}