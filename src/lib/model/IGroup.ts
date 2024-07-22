import type IComment from "./IComment"
import type IComponent from "./IComponent"

// a python module, a ros package, ...
export default interface IGroup {
  // a text for humans to help understanding the group.
  name: string
  comment?: IComment
  subgroup?: IGroup[]
  components: IComponent[]
}