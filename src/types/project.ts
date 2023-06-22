import z from "zod";

const Project = z.object({
  name: z.string(),
  version: z.string(),
  devDependencies: z.record(z.string()).optional(),
  dependencies: z.record(z.string()).optional()
});

type ProjectType = z.TypeOf<typeof Project>;

export { Project };
export type { ProjectType };
