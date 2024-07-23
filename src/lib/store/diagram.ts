/* store data */
import type IDiagram from '$lib/model/IDiagram';
import { writable } from 'svelte/store';
const { subscribe, set, update } = writable<IDiagram | undefined>();

export default {
  subscribe,
  set,
  update
}
