<script lang="ts">
  import { type NodeProps } from '@xyflow/svelte';
  import type IComponent from "$lib/model/IComponent";
  import { Handle, Position } from '@xyflow/svelte';
  
  type $$Props = NodeProps;

  export let data: { node: IComponent };
</script>

<div class="node">
  <Handle type="target" position={Position.Top} />
  <div class="pi_text">
    {data.node.pkg}/{data.node.name}
  </div>
  <Handle type="source" position={Position.Right} />
</div>

<style>
  .node {
    position: relative;
    padding: 12px;
    border: 2px solid #b1b1b1;
    border-radius: 36px;
    height: 16px;
  }
</style>