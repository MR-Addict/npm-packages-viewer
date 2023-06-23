import z from "zod";

const Dependency = z.object({
  name: z.string(),
  version: z.string(),
  dev: z.boolean()
});

const Project = z.object({
  name: z.string(),
  dependencies: z.array(Dependency)
});

type ProjectType = z.TypeOf<typeof Project>;
type DependencyType = z.TypeOf<typeof Dependency>;

export { Project, Dependency };
export type { ProjectType, DependencyType };
