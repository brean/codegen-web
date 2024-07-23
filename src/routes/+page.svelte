<script lang="ts">
  import BaseFlow from "$lib/components/BaseFlow.svelte";
  // smui
  import LayoutGrid, { Cell } from '@smui/layout-grid';
  import Card, {
    Content as CardContent,
    PrimaryAction,
    Media,
    Actions
  } from '@smui/card';
  import diagram from "$lib/store/diagram";
  import diaggen from "$lib/data/diaggen.json"
  import turtlebot_msgs from "$lib/data/turtlebot_msgs.json"
  import type IDiagram from "$lib/model/IDiagram";

  let graphs: IDiagram[] = [
    diaggen,
    turtlebot_msgs
  ]
</script>
{#if $diagram}
<BaseFlow />
{:else}
<div>
  <main class="main-content">
    {#if graphs && graphs.length > 0}
      <LayoutGrid>
        {#each graphs as graph}
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
      </LayoutGrid>
    {/if}
  </main>
</div>
{/if}