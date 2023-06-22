import z from "zod";

const Package = z.object({
  name: z.string(),
  version: z.string(),
  description: z.string(),
  homepage: z.string()
});

type PackageType = z.TypeOf<typeof Package>;

export default Package;
export type { PackageType };
