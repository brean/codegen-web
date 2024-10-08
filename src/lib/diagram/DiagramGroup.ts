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
    if (this.children) {
      for (const child of this.children) {
        child.dagreNode(g);
        g.setParent(child.id, this.id);
      }
    }
    // position children
    console.log("run dagre to pos children")
    dagre.layout(g);
    if (this.children) {
      for (const child of this.children) {
        child.setPosition(g);
      }
    }
    // now we can calculate the group width/height
    this.calculateDimension();
    this.setPosition(g)
  }

  subChildSum(): number {
    // returns the amount of all children and childrens children
    let sum = 0;
    for (const child of this.children) {
      sum += child.subChildSum()
    }
    return sum;
  }

  calcWidth(): number {
    let maxX = 0;
    for (const child of this.children) {
      maxX = Math.max(maxX, child.x + (child.width/2));
      // TODO: x is 0, as its not calculated by dagree yet
      console.log("maxX:", child.id, child.x, child.width);
    }
    console.log("final maxX:", maxX);
    return maxX + 40;
  }

  calcHeight(): number {
    let maxY = 0;
    for (const child of this.children) {
      maxY = Math.max(maxY, child.y + (child.height/2));
    }
    return maxY + 40;
  }

  // create svelteflow Node
  createFlowNode(): Node {
    const node = super.createFlowNode();
    node.type = 'group';
    return node;
  }

  flowNode(nodeList: Node[]) {
    // recalculate dimensions, now that 
    const node = this.createFlowNode()
    if (node) {
      nodeList.push(node)
    }
    for (const child of this.children) {
      child.flowNode(nodeList);
    }
  }
}