import * as React from "react"

const SelectContext = React.createContext(null)

const Select = ({ value, onValueChange, children }) => {
  return (
    <SelectContext.Provider value={{ value, onValueChange }}>
      <div>{children}</div>
    </SelectContext.Provider>
  )
}

const SelectTrigger = ({ children, className, ...props }) => (
  <div className={className} {...props}>
    {children}
  </div>
)

const SelectValue = ({ placeholder }) => {
  const ctx = React.useContext(SelectContext)
  const display = ctx && ctx.value ? ctx.value : placeholder
  return <span>{display}</span>
}

const SelectContent = ({ children, className, ...props }) => (
  <div className={className} {...props}>
    {children}
  </div>
)

const SelectItem = ({ value, children, className, ...props }) => {
  const ctx = React.useContext(SelectContext)
  return (
    <div
      role="option"
      className={className}
      onClick={() => ctx && ctx.onValueChange && ctx.onValueChange(value)}
      {...props}
    >
      {children}
    </div>
  )
}

export { Select, SelectTrigger, SelectValue, SelectContent, SelectItem }
