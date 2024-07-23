// base node that has x/y position and width/height
import dagre from '@dagrejs/dagre';
import type { Edge, Node } from '@xyflow/svelte';
import { v4 as uuid } from 'uuid';

export default class DiagramNode {
  id: string;
  width: number = 250.0;
  height: number = 50.0;
  dagreWidth: number = 250;
  dagreHeight: number = 20;
  x: number = 0.0;
  y: number = 0.0;

  constructor(id?: string) {
    this.id = id || uuid();
  }

  calcX(dagreNode: { x: number }): number {
    return dagreNode.x - (this.dagreWidth / 2);
  }

  calcY(dagreNode: {y: number}): number {
    return dagreNode.y - (this.dagreHeight / 2);
  }

  createFlowNode(g: dagre.graphlib.Graph): Node | undefined {
    let dagreNode = g.node(this.id);
    if (dagreNode) {
      this.x = this.calcX(dagreNode);
      this.y = this.calcY(dagreNode);
    } else {
      console.log("dagre node does not exist!")
      return;
    }
    let node: Node = {
      id: this.id,
      data: { label: this.id },
      position: { x: this.x, y: this.y }
    };
    return node;
  }
  
}