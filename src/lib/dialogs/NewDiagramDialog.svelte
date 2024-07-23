<script lang="ts">
  import Dialog, { Header, Title, Content, Actions } from "@smui/dialog";
  import Select, { Option } from '@smui/select';
  import Textfield from "@smui/textfield";
  import IconButton from "@smui/icon-button";
  import Button from '@smui/button';
  import type IDiagram from "$lib/model/IDiagram";
  import diag_names from "$lib/data/diag_names";
  import diagram from "$lib/store/diagram";

  export let open = false;
  const diag_types: ['class_diagram', 'ros_pkg'] = ['class_diagram', 'ros_pkg']
  let new_diagram:IDiagram = {
    name: 'some_diagram',
    desc: 'A brand new diagram',
    type: diag_types[0],
    groups: [],
    components: []
  }
  

</script>
<Dialog
  bind:open
  sheet
  scrimClickAction=""
  escapeKeyAction=""
  aria-describedby="sheet-content"
  aria-labelledby="sheet-title"
>
  <Header>
    <Title id="over-fullscreen-title">New Diagram</Title>
    <IconButton action="close" class="material-icons">close</IconButton>
  </Header>
  <Content>
    <div style:padding={"5px"}>
      <Textfield
        variant="outlined"
        bind:value={new_diagram.name}
        label="Name"
        type="text"
      >
      </Textfield>
    </div>
    <div style:padding={"5px"}>
    <Textfield
      variant="outlined"
      bind:value={new_diagram.desc}
      label="Description"
      type="text"
    >
    </Textfield>
    </div>
    <div style:height={"54px"}>
      <div class="select-wrapper">
        <Select 
            variant="outlined"
            bind:value={new_diagram.type}
            class="mdc-menu-surface--fixed"
            label="Select Menu">
          {#each diag_types as diag_type}
            <Option value={diag_type}>{diag_names[diag_type]}</Option>
          {/each}
        </Select>
      </div>
    </div>
  </Content>
  <Actions>
    <Button on:click={() => {
      $diagram = new_diagram;
    }}>create</Button>
  </Actions>
</Dialog>

<style>
  .select-wrapper {
    display: flex;
    flex-direction: column;
    padding: 5px;
    justify-content: space-around;
    width: 100%;
    height: 100%;
    z-index: 1000;
  }
</style>
