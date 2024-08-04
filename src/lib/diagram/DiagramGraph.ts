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
    const node = new DiagramNode(this, item as IComponent, undefined, parent)
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
    const children: (DiagramGroup | DiagramNode)[] = [];
    // create our own graph structure form diagram data 
    // (DiagramGroup and DiagramNode instances)
    for (const group of diagram.groups) {
      // create all groups, subgroups and nodes
      const node = this.createNode(group, undefined)
      children.push(node);
    }

    // after all children have been created and all its positions and dimensions
    // have been calculated we can forward the data to dagree
    for (const child of children) {
      child.dagreNode(this.g);
    }

    // let dagre layout calculate the final layout
    dagre.layout(this.g);

    // create nodes for svelteflow
    for (const child of children) {
      child.flowNode(this.g, this.flowNodes);
    }
  }
}