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
  import { Icon } from '@smui/icon-button';
  import data from "$lib/store/data";
  import type IGroup from "$lib/model/IGroup";
  import type IComponent from "$lib/model/IComponent";

  let graphs = [
    {
      name: 'diaggen',
      desc: 'Diagram Editor Class Diagram',
      type: 'python class diagram',
      data: [{
        name: 'model',
        components: [
          {
            name: 'Component',
            pkg: 'model',
            content: [
              {
                name: 'name',
                attr_type: 'str',
                prefix: '+'
              },
              {
                name: 'pkg',
                attr_type: 'str',
                prefix: '+'
              }
            ]
          } as IComponent
        ]
      }] as IGroup[]
    },
    {
      name: 'turtlebot3_msgs',
      desc: 'Turtlebot 3 Messages',
      type: 'ROS 2 messages',
      data: [{}] as IGroup[]
    }
  ]
</script>
{#if $data}
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
                    data.set(graph.data);
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