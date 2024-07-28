import dagre from '@dagrejs/dagre';
import type { Edge, Node } from '@xyflow/svelte';
import DiagramNode from './DiagramNode';
import type DiagramGraph from './DiagramGraph';
import type IGroup from '$lib/model/IGroup';


export default class DiagramGroup extends DiagramNode {
  groupData: IGroup;
  children: (DiagramGroup | DiagramNode)[];

  constructor(graph: DiagramGraph, data: IGroup, parent?: DiagramGroup) {
    super(graph, undefined, undefined, parent);
    this.groupData = data;
    this.children = [];
    this.createChildren();
  }

  createChildren() {
    // TODO: create children
    if (this.groupData.subgroup) {
      for (const group of this.groupData.subgroup) {
        this.children.push(this.graph.createNode(group, this));
      }
    }
    if (this.groupData.components) {
      for (const comp of this.groupData.components) {
        this.children.push(this.graph.createNode(comp, this));
      }
    }
  }

  dagreNode(g: dagre.graphlib.Graph) {
    super.dagreNode(g)
    for (const child of this.children) {
      child.dagreNode(g);
    }
  }

  subChildSum(): number {
    // returns the amount of all children and childrens children
    let sum = 0;
    for (const child of this.children) {
      sum += child.subChildSum()
    }
    return sum;
  }

  // create svelteflow Node
  createFlowNode(g: dagre.graphlib.Graph): Node {
    const node = super.createFlowNode(g);
    node.type = 'group';
    return node;
  }

  calcWidth(): number {
    let maxX = 0;
    for (const child of this.children) {
      maxX = Math.max(maxX, child.x + child.calcWidth());
    }
    return maxX + 40;
  }

  calcHeight(): number {
    let maxY = 0;
    for (const child of this.children) {
      maxY = Math.max(maxY, child.y + child.calcHeight());
    }
    return maxY;
  }

  flowNode(g: dagre.graphlib.Graph, nodeList: Node[]) {
    const node = this.createFlowNode(g)
    if (node) {
      nodeList.push(node)
    }
    console.log(this.children)
    for (const child of this.children) {
      child.flowNode(g, nodeList);
    }
  }
}