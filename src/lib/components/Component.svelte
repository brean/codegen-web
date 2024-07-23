<script lang="ts">
  import { type NodeProps } from '@xyflow/svelte';
  import type IComponent from "$lib/model/IComponent";
  import { Handle, Position } from '@xyflow/svelte';
  
  type $$Props = NodeProps;

  export let data: any;
</script>

<div class="node">
  <Handle type="target" position={Position.Top} />
  <div>
    {data}
  </div>
  <Handle type="source" position={Position.Right} />
</div>

<style>
  .node {
    position: relative;
    padding: 12px;
    border: 2px solid #b1b1b1;
    border-radius: 6px;
    height: 16px;
  }
</style>