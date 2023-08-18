import {ComponentProps} from "react"

export const Button = (props: ComponentProps<'button'>) => {
  return <button className="bg-gray-200 hover:bg-gray-300 py-2 px-4 rounded" {...props} />
}