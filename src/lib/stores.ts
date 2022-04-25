import { writable } from 'svelte/store';

export const currentTagName = writable<string | undefined>();

// const colors = ['#FBECDD', '#FBF3DB', '#EDF3EC', '#E7F3F8', '#FDEBEC'];
export const tagColors = { git: '#FBECDD', powershell: '#FBF3DB', thoughts: '#EDF3EC' };
