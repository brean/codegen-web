<script lang="ts">
  import type IComponent from "$lib/model/IComponent";
  import { Handle, Position } from '@xyflow/svelte';

  // a component is a Class/Message/...
  export let component:IComponent
</script>

<div class="node">
  <Handle type="target" position={Position.Top} />
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