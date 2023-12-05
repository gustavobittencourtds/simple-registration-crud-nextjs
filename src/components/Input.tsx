interface InputProps {
  text: string
  type?: 'text' | 'number'
  value: string | number
  readOnly?: boolean
  onValueChange?: (value: any) => void
  className?: string
}

export default function Input(props: InputProps) {
  return (
    <div className={`flex flex-col ${props.className}`}>
      <label className="mb-2" htmlFor={props.text}>
        {props.text}
      </label>
      <input
        id={props.text}
        data-testid={props.text.toLowerCase()}
        type={props.type ?? 'text'}
        value={props.value}
        readOnly={props.readOnly}
        onChange={e => props.onValueChange?.(e.target.value)}
        className={`
          border border-purple-500 rounded-lg
          focus:outline-none bg-gray-100 px-4 py-2
          ${props.readOnly ? '' : 'focus:bg-white'} 
        `}
      />
    </div>
  )
}