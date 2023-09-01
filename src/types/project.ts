import z from "zod";

const RawProject = z
  .object({
    name: z.string(),
    devDependencies: z.record(z.string()).optional(),
    dependencies: z.record(z.string()).optional()
  })
  .refine((value) => value.dependencies !== undefined || value.devDependencies !== undefined, {
    message: "Your packages are empty"
  });

const Dependency = z.object({
  name: z.string(),
  version: z.string(),
  latest: z.union([z.string(), z.null()]),
  dev: z.boolean(),
  exact: z.boolean()
});

const Project = z.object({
  name: z.string(),
  dependencies: z.array(Dependency)
});

type ProjectType = z.TypeOf<typeof Project>;
type RawProjectType = z.TypeOf<typeof RawProject>;
type DependencyType = z.TypeOf<typeof Dependency>;

export { Project, RawProject, Dependency };
export type { ProjectType, DependencyType, RawProjectType };
