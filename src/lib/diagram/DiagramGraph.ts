import dagre from '@dagrejs/dagre';
import type IDiagram from '$lib/model/IDiagram';
import type { Edge, Node } from '@xyflow/svelte';

export default class DiagramGraph {
  // svelteflow graph - generated from mission data after degre is done.
  flowNodes: Node[] = [];
  flowEdges: Edge[] = [];

  // dagre graph
  g: dagre.graphlib.Graph;

  constructor() {
    this.g = new dagre.graphlib.Graph();
    this.g.setDefaultEdgeLabel(function () { return {}; });
  }

  // --- rendering / create nodes and edges for dagre and svelteflow ---

  reset() {
    // empty the graph represenations for dagre and svelteflow
    this.flowNodes = [];
    this.flowEdges = [];
    this.g.setGraph({});
  }

  setDiagram(diagram: IDiagram) {
    dagre.layout(this.g);
  }
}