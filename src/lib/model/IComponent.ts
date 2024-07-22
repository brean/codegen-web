import type IAttribute from "./IAttribute"
import type IComment from "./IComment"

// A component, can be a class, a ros message, ...
export default interface IComponent {
  // name of the component (ROS Message name/Python class name)
  name: string
  pkg: string
  content: (IComment | IAttribute)[]
}