<script lang="ts">
    import { writable } from 'svelte/store';
    import data from "$lib/store/data";
    import {
      SvelteFlow,
      Controls,
      Background,
      BackgroundVariant,
      MiniMap
    } from '@xyflow/svelte';
   
    // import styles for Svelte Flow
    import '@xyflow/svelte/dist/style.css';

    // Create nodes from components
    const nodes = writable([
      {
        id: '1',
        type: 'input',
        data: { label: 'Input Node' },
        position: { x: 0, y: 0 }
      },
      {
        id: '2',
        type: 'default',
        data: { label: 'Node' },
        position: { x: 0, y: 150 }
      }
    ]);
   
    // same for edges
    const edges = writable([
      {
        id: '1-2',
        type: 'default',
        source: '1',
        target: '2',
        label: 'Edge Text'
      }
    ]);
   
    const snapGrid: [width: number, height: number] = [25, 25];
    let innerHeight = 500;
  </script>
   
  <svelte:window bind:innerHeight={innerHeight} />

  <div style:height={innerHeight + 'px'}>
    <SvelteFlow
      {nodes}
      {edges}
      {snapGrid}
      fitView
      on:nodeclick={(event) => console.log('on node click', event.detail.node)}
    >
      <Controls />
      <Background variant={BackgroundVariant.Dots} />
      <MiniMap />
    </SvelteFlow>
  </div>