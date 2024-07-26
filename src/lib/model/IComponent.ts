import type IAttribute from "./IAttribute"
import type IComment from "./IComment"

// A simple node (leaf), can be a class, a ros message, ...
export default interface IComponent {
  // name of the component (ROS Message name/Python class name)
  name: string
  pkg: string
  attributes: (IComment | IAttribute)[]
  // member functions are only used for class diagrams, not ROS
  functions?: (IComment | IAttribute)[]
}