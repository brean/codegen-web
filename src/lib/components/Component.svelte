<script lang="ts">
  import { type NodeProps } from '@xyflow/svelte';
  import type IComponent from "$lib/model/IComponent";
  import { Handle, Position } from '@xyflow/svelte';
    import type DiagramNode from '$lib/diagram/DiagramNode';
  
  type $$Props = NodeProps;

  export let data: { node: DiagramNode };
  let component = data.node.compData;
</script>

<div class="node" style:width={`${data.node.width}px`} style:height={`${data.node.height}px`}>
  <Handle type="target" position={Position.Top} />
  <div class="header">
    <b>{component.name}</b>
  </div>
  {#if component.functions}
  <div class="bar" style:width={`${data.node.width + 24}px`} />
  <div class="funcs">
    
  </div>
  {/if}
  {#if component.attributes}
  <div class="bar" style:width={`${data.node.width + 24}px`} />
  <div class="attributes">
    {#each component.attributes as attr}
      {#if Object.hasOwn(attr, 'attr_type')}
        <div>
          {attr.prefix || ''} {attr.name}: {attr.attr_type}
        </div>
      {/if}
    {/each}
  </div>
  {#each component.attributes as attr}
    {#if Object.hasOwn(attr, 'attr_type')}
        <Handle type="source" position={Position.Right} />
    {/if}
  {/each}
  {/if}
  
</div>

<style>
  .bar {
    width: 100%;
    background-color: #b1b1b1;
    height: 2px;
    margin-top: 2px;
    margin-left: -12px;
    margin-bottom: 2px;
  }

  .node {
    position: relative;
    padding: 12px;
    border: 2px solid #b1b1b1;
    border-radius: 6px;
  }

  .header, .funcs, .attributes {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>