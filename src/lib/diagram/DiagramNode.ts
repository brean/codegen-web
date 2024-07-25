// base node that has x/y position and width/height
import dagre from '@dagrejs/dagre';
import type { Edge, Node } from '@xyflow/svelte';
import { v4 as uuid } from 'uuid';
import type DiagramGraph from './DiagramGraph';
import type IComponent from '$lib/model/IComponent';
import type DiagramGroup from './DiagramGroup';

export default class DiagramNode {
  id: string
  graph: DiagramGraph;
  nodeData?: IComponent;

  width: number = 200.0;
  height: number = 50.0;
  dagreWidth: number = 200;
  dagreHeight: number = 20;
  x: number = 0.0;
  y: number = 0.0;

  parent?: DiagramGroup;

  constructor(graph: DiagramGraph, data?: IComponent, id?: string, parent?: DiagramGroup) {
    this.graph = graph;
    this.nodeData = data
    this.id = id || uuid();
    this.parent = parent;
  }

  calcWidth(): number {
    return this.width + 20;
  }

  calcHeight(): number {
    return this.height + 20;
  }

  calcX(dagreNode: { x: number }): number {
    return dagreNode.x - (this.dagreWidth / 2);
  }

  calcY(dagreNode: {y: number}): number {
    return dagreNode.y - (this.dagreHeight / 2);
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
    // set width/height BEFORE calling dagre
  }

  flowNode(g: dagre.graphlib.Graph, nodeList: Node[]) {
    const node = this.createFlowNode(g)
    if (node) {
      nodeList.push(node);
    }
  }

  dagreNode(g: dagre.graphlib.Graph) {
    g.setNode(this.id, { width: this.dagreWidth, height: this.dagreHeight });
    // TODO: setEdge for dagre connection between attributes
  }

  createFlowNode(g: dagre.graphlib.Graph): Node | undefined {
    const dagreNode = g.node(this.id);
    if (dagreNode) {
      this.x = this.calcX(dagreNode);
      this.y = this.calcY(dagreNode);
    } else {
      console.error(`dagre node ${this.id} does not exist!`)
      return;
    }
    const node: Node = {
      id: this.id,
      type: 'component',
      data: { label: this.id, node: this.nodeData },
      position: { x: this.x, y: this.y }
    };
    if (this.parent) {
      node.parentId = this.parent.id;
    }

    return node;
  }
}