<script lang="ts">
  import YAML from 'yaml'
  import BaseFlow from "$lib/components/BaseFlow.svelte";
  // smui
  import LayoutGrid, { Cell } from '@smui/layout-grid';
  import Card, {
    Content as CardContent,
    PrimaryAction,
    Media,
    Actions
  } from '@smui/card';
  import Button from '@smui/button';
  import diagram from "$lib/store/diagram";
  import type IDiagram from "$lib/model/IDiagram";
  import NewDiagramDialog from "$lib/dialogs/NewDiagramDialog.svelte";
  import { onMount } from "svelte";
  import { writable } from 'svelte/store';

  let showNewDiagDialog = false;
  let graphs = writable([]);

  onMount(async () => {
    const files = ['diaggen', 'turtlebot_msgs']
    for (const file of files) {
      const response = await fetch(`/codegen-web/data/${file}.yml`);
      const text = await response.text();
      const data = YAML.parse(text)
      $graphs.push(data);
    }
    $graphs = $graphs;
  })


</script>
{#if $diagram}
<BaseFlow />
{:else}
<div>
  <main class="main-content">
    {#if $graphs && $graphs.length > 0}
      <LayoutGrid>
        {#each $graphs as graph}
          <Cell span={2}>
            <div class="card-display">
              <div class="card-container">
                <Card>
                  <PrimaryAction on:click={() => {
                    console.log(graph)
                    diagram.set(graph);
                  }}>
                    <CardContent class="mdc-typography--body2">
                      <h2 class="mdc-typography--headline6" style="margin: 0;">
                        {graph.name} 
                      </h2>
                      {graph.desc}
                    </CardContent>
                  </PrimaryAction>

                  <Actions>
                    { graph.type }
                    
                    <!-- <ActionIcons>
                      <IconButton
                        aria-label="Shutdown Agent"
                        title="Shotdown Agent"
                        style="color: orange;"
                        class="material-icons">power_off</IconButton>
                    </ActionIcons> -->
                  </Actions>

                </Card>

              </div>
            </div>
          </Cell>
        {/each}
        <Cell span={2}>
          <div class="card-display">
            <div class="card-container" style:height={"200px"}>
              <Card>
                <PrimaryAction on:click={() => {
                  showNewDiagDialog = true;
                }}>
                  <Button>New diagram</Button>
                </PrimaryAction>
              </Card>
            </div>
          </div>
        </Cell>
      </LayoutGrid>
    {/if}
  </main>
</div>
{/if}
<NewDiagramDialog bind:open={showNewDiagDialog}></NewDiagramDialog>