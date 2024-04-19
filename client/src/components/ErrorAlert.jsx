import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "./ui/alert"



export function AlertDestructive({description,variant,title}) {
  return (
    <Alert variant={variant} className={`mt-4 ${variant==='success'&&'text-green-400 bg-green-500/20'} ${variant==='error'&&'text-red-400 bg-red-500/20'}`}>
      <AlertCircle style={{color:"green"}} className="h-4 w-4 text-green-400" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>
        {description}
      </AlertDescription>
    </Alert>
  )
}
