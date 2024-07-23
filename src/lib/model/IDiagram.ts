import type IComponent from "./IComponent"
import type IGroup from "./IGroup"

// The overall Diagram
export default interface IDiagram {
  // a text for humans to help understanding the group.
  name: string
  // description
  desc: string
  // Type of the diagram
  type: string
  // all groups
  groups: IGroup[]
  // components outside of any groups
  components: IComponent[]
}