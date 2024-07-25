import dagre from '@dagrejs/dagre';
import type IDiagram from '$lib/model/IDiagram';
import type { Edge, Node } from '@xyflow/svelte';
import DiagramNode from './DiagramNode';
import type IComponent from '$lib/model/IComponent';
import type IGroup from '$lib/model/IGroup';
import DiagramGroup from './DiagramGroup';

export default class DiagramGraph {
  // svelteflow graph - generated from mission data after degre is done.
  flowNodes: Node[] = [];
  flowEdges: Edge[] = [];

  diagram?: IDiagram;

  // dagre graph
  g: dagre.graphlib.Graph;

  constructor() {
    this.g = new dagre.graphlib.Graph();
    this.g.setDefaultEdgeLabel(function () { return {}; });
  }

  // --- rendering / create nodes and edges for dagre and svelteflow ---

  createNode(item: IComponent | IGroup, parent?: DiagramGroup): DiagramNode {
    if (Object.hasOwn(item, 'components')) {
      return new DiagramGroup(this, item as IGroup, parent);
    }
    return new DiagramNode(this, item as IComponent, undefined, parent)
  }

  reset() {
    // empty the graph represenations for dagre and svelteflow
    this.flowNodes = [];
    this.flowEdges = [];
    this.g.setGraph({});
  }

  setDiagram(diagram: IDiagram) {
    this.reset();

    this.diagram = diagram;
    const children: (DiagramGroup | DiagramNode)[] = [];
    // create our own graph structure form diagram data 
    // (DiagramGroup and DiagramNode instances)
    for (const group of diagram.groups) {
      children.push(this.createNode(group, undefined));
    }
    // after all children have been created and all its positions and dimensions
    // have been calculated we can forward the data to dagree
    for (const child of children) {
      child.dagreNode(this.g);
    }

    // let dagre layout calculate the layout
    dagre.layout(this.g);

    // create nodes for svelteflow
    for (const child of children) {
      child.flowNode(this.g, this.flowNodes);
    }
    console.log(this.flowNodes);
  }
}