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
    this.g = new dagre.graphlib.Graph({ compound: true })
      .setGraph({})
      .setDefaultEdgeLabel(() => ({}));
  }

  // --- rendering / create nodes and edges for dagre and svelteflow ---

  createNode(item: IComponent | IGroup, parent?: DiagramGroup): DiagramNode | DiagramGroup {
    if (Object.hasOwn(item, 'components')) {
      return new DiagramGroup(this, item as IGroup, parent);
    }
    const node = new DiagramNode(this, item as IComponent, undefined, parent);
    // if its a simple node we directly calculate the dimensions to get its width/height for positioning.
    node.calculateDimension();
    return node;
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
    // children are only top-level children,
    // children of groups are not in this list
    const children: (DiagramGroup | DiagramNode)[] = [];
    // create our own graph structure form diagram data 
    // (DiagramGroup and DiagramNode instances)
    // dimensions of nodes are calculated directly, 
    // we have to calculate positions of nodes and 
    // positions and dimensions of groups later
    for (const group of diagram.groups) {
      // create all groups, subgroups and nodes
      const node = this.createNode(group, undefined)
      children.push(node);
    }

    // create dagre structure, layout children
    for (const child of children) {
      child.dagreNode(this.g);
    }

    // let dagre layout calculate the final layout
    // (for positions of groups)
    console.log("run dagre")
    dagre.layout(this.g);

    // create nodes for svelteflow
    for (const child of children) {
      child.flowNode(this.flowNodes);
    }
  }
}