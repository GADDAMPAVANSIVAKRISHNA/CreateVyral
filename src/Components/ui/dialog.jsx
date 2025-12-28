import * as React from "react"

const Dialog = ({ children, open = true, onOpenChange }) => {
  return <div>{children}</div>
}

const DialogContent = ({ children, className, ...props }) => (
  <div className={className} {...props}>{children}</div>
)
const DialogHeader = ({ children, className, ...props }) => (
  <div className={className} {...props}>{children}</div>
)
const DialogTitle = ({ children, className, ...props }) => (
  <h3 className={className} {...props}>{children}</h3>
)
const DialogFooter = ({ children, className, ...props }) => (
  <div className={className} {...props}>{children}</div>
)

export { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter }
