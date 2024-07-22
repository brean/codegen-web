// Attribute of the component
export default interface IAttribute {
  // the data type of the attribute
  attr_type: string
  // the name or id of the attribute
  name: string
  // a prefix, for example "+" for a normal property or "-" for a subsystem
  prefix?: string
}