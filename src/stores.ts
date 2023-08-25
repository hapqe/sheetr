import { writable } from "svelte/store";

export const size = writable<number | null>(null);
export const grid = writable(false);
export const scaling = writable(1);
export const xOffset = writable(0);
export const yOffset = writable(0);
export const pixels = writable(64);

export const entries = writable<FileSystemEntry[]>([]);

export const selected = writable<FileSystemEntry | null>(null);
export const preview = writable('');

export const showSheet = writable(true);

export const exportScale = writable(1);
export const exporting = writable(false);
export const json = writable<any>({});