import { writable } from 'svelte/store';

export let showDelete = writable(false);
export let showSort = writable(false);
export let showEdit = writable(false);

export let toastSuccess = writable(false);
export let toastSuccessText = writable('');

export let toastError = writable(false);
export let toastErrorText = writable('');

export let currComponent = writable('');
