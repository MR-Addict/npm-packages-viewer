import { writable, derived } from "svelte/store";

import { Project } from "$types/project";

async function parseFile(file: File | null) {
  if (!file) return null;

  const buffer = await file.arrayBuffer();
  const data = new TextDecoder("utf-8").decode(buffer);
  return Project.parse(JSON.parse(data));
}

function createStore() {
  const file = writable<File | null>(null);
  const derivedStore = derived(file, ($file) => ({
    file: $file,
    data: parseFile($file)
  }));

  return {
    set: file.set,
    subscribe: derivedStore.subscribe
  };
}

const file = createStore();

export default file;
