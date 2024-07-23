import dagre from '@dagrejs/dagre';
import type IDiagram from '$lib/model/IDiagram';
import type { Edge, Node } from '@xyflow/svelte';

export default class DiagramGraph {
  // svelteflow graph - generated from mission data after degre is done.
  flowNodes: Node[] = [];
  flowEdges: Edge[] = [];

  setDiagram(diagram: IDiagram) {
    
  }
}