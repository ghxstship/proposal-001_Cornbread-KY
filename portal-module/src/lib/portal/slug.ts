import "server-only";

import { createClient } from "@/lib/supabase/server";

export type SlugContext = {
  slug: string;
  projectId: string;
  orgId: string;
};

/**
 * Resolve a portal slug → { project, org }. Authorization for /p/[slug]/...
 * is the slug itself: only members of the project's org can read it.
 *
 * Returns null if the slug is unknown or the viewer is not a member.
 */
export async function resolveSlugContext(slug: string): Promise<SlugContext | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("projects")
    .select("id, org_id, slug")
    .eq("slug", slug)
    .maybeSingle();
  if (error || !data) return null;
  return {
    slug: data.slug as string,
    projectId: data.id as string,
    orgId: data.org_id as string,
  };
}
