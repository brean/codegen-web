/* store data */
import type IGroup from '$lib/model/IGroup';
import { writable } from 'svelte/store';
const { subscribe, set, update } = writable<IGroup[] | undefined>();

export default {
  subscribe,
  set,
  update
}
