import { RawProject } from "$types/project";
import type { ProjectType } from "$types/project";

export default async function parsePackage(file: File) {
  const buffer = await file.arrayBuffer();
  const result = RawProject.safeParse(JSON.parse(new TextDecoder("utf-8").decode(buffer)));
  if (!result.success) return null;

  const rawProject = result.data;

  const { name, dependencies, devDependencies } = rawProject;
  const project: ProjectType = { name, dependencies: [] };

  if (dependencies) {
    Object.keys(dependencies).forEach((name) => {
      const dev = false;
      const exact = !dependencies[name].startsWith("^");
      const version = dependencies[name].replace("^", "");
      project.dependencies.push({ name, dev, exact, version, latest: null });
    });
  }

  if (devDependencies) {
    Object.keys(devDependencies).forEach((name) => {
      const dev = true;
      const exact = !devDependencies[name].startsWith("^");
      const version = devDependencies[name].replace("^", "");
      project.dependencies.push({ name, dev, exact, version, latest: null });
    });
  }

  return project;
}
