import z from "zod";
import { writable, derived } from "svelte/store";
import type { ProjectType } from "$types/project";

const Project = z.object({
  name: z.string(),
  devDependencies: z.record(z.string()).optional(),
  dependencies: z.record(z.string()).optional()
});

async function parseFile(file: File | null) {
  if (!file) return null;

  const buffer = await file.arrayBuffer();
  const result = new TextDecoder("utf-8").decode(buffer);
  const project = Project.parse(JSON.parse(result));

  const dependencies = project.dependencies;
  const devDependencies = project.devDependencies;
  let data: ProjectType = { name: project.name, dependencies: [] };
  if (dependencies) {
    const temp = Object.keys(dependencies).map((key) => ({ name: key, version: dependencies[key], dev: false }));
    data.dependencies.push(...temp);
  }
  if (devDependencies) {
    const temp = Object.keys(devDependencies).map((key) => ({ name: key, version: devDependencies[key], dev: true }));
    data.dependencies.push(...temp);
  }

  return data;
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
