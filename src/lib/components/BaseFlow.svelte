<script lang="ts">
    import { writable } from 'svelte/store';
    import diagram from "$lib/store/diagram";
    import {
      SvelteFlow,
      Controls,
      Background,
      BackgroundVariant,
      MiniMap,
      type ColorMode,
      type Node,
      type Edge

    } from '@xyflow/svelte';
   
    // import styles for Svelte Flow
    import '@xyflow/svelte/dist/style.css';
    import { onMount } from 'svelte';
    import DiagramGraph from '$lib/diagram/DiagramGraph';
    import Component from './Component.svelte';

    let colorMode: ColorMode = 'dark';

    // Create nodes from components
    const nodes = writable<Node[]>([]);
    const edges = writable<Edge[]>([]);

    // const snapGrid: [width: number, height: number] = [25, 25];
    let innerHeight = 500;
    let graph: DiagramGraph;

    const nodeTypes = {
      component: Component
    }

    onMount(async () => {
      if (!$diagram) {
        return;
      }
      graph = new DiagramGraph()
      graph.setDiagram($diagram);
      $nodes = graph.flowNodes;
      $edges = graph.flowEdges;
    })
  </script>

  <svelte:window bind:innerHeight={innerHeight} />

  <div style:height={innerHeight + 'px'} style:margin={0} style:padding={0}>
    <SvelteFlow
      {nodes}
      {edges}
      {nodeTypes}
      {colorMode}
      proOptions={{hideAttribution: true}}
      fitView
      on:nodeclick={(event) => console.log('on node click', event.detail.node)}
    >
      <Controls />
      <Background variant={BackgroundVariant.Dots} />
      <MiniMap />
    </SvelteFlow>
  </div>