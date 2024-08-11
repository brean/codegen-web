// base node that has x/y position and width/height
import dagre from '@dagrejs/dagre';
import type { Edge, Node } from '@xyflow/svelte';
import { v4 as uuid } from 'uuid';
import type DiagramGraph from './DiagramGraph';
import type IComponent from '$lib/model/IComponent';
import type DiagramGroup from './DiagramGroup';

// TODO: rename to DiagramComponent?
export default class DiagramNode {
  id: string
  graph: DiagramGraph;
  compData?: IComponent;

  initialHeight: number = 0;
  initialWidth: number = 150;
  width: number = 0;
  height: number = 0;

  cellHeight: number = 20;

  x: number = 0.0;
  y: number = 0.0;

  parent?: DiagramGroup;

  constructor(graph: DiagramGraph, data?: IComponent, id?: string, parent?: DiagramGroup) {
    this.graph = graph;
    this.compData = data
    this.id = id || uuid();
    this.parent = parent;
  }

  calcWidth(): number {
    return this.initialWidth;
  }

  calcHeight(): number {
    const attributes = this.compData?.attributes.length || 0;
    const functions = this.compData?.functions?.length || 0;
    return this.initialHeight + 20 +
      (attributes > 0 ? 6 : 0) + 
      (functions > 0 ? 6 : 0) + 
      this.cellHeight * (attributes + functions);
  }

  calcX(dagreNode: { x: number }): number {
    return dagreNode.x - (this.width / 2);
  }

  calcY(dagreNode: {y: number}): number {
    return dagreNode.y - (this.height / 2);
  }

  maxChildrenElements(): number {
    return 0;
  }

  subChildSum(): number {
    return 1;
  }


  updatePosition() {
    // add additional distances to x/y coordinates AFTER calling dagre
  }

  calculateDimension() {
    // set width/height BEFORE (and in case of a group also AFTER) calling dagre
    this.width = this.calcWidth();
    this.height = this.calcHeight();
    console.log(this.parent, this.id, this.width, this.height);
  }

  dagreNode(g: dagre.graphlib.Graph) {
    g.setNode(this.id, { width: this.width, height: this.height });
    // TODO: setEdge for dagre connection between attributes
  }

  flowNode(g: dagre.graphlib.Graph, nodeList: Node[]) {
    const node = this.createFlowNode(g)
    nodeList.push(node);
  }

  createFlowNode(g: dagre.graphlib.Graph): Node {
    const dagreNode = g.node(this.id);
    if (dagreNode) {
      this.x = this.calcX(dagreNode);
      this.y = this.calcY(dagreNode);
    }
    const node: Node = {
      id: this.id,
      type: 'component',
      data: { label: this.id, node: this },
      position: { x: this.x, y: this.y },
      width: this.width,
      height: this.height
    };
    if (this.parent) {
      node.parentId = this.parent.id;
    }

    return node;
  }
}