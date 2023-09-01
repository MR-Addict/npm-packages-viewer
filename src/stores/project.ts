import { writable } from "svelte/store";
import type { ProjectType } from "$types/project";

const project = writable<ProjectType | null>(null);

export default project;
