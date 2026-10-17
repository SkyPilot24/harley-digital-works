import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type CmsService = {
  id: string;
  slug: string;
  title: string;
  tagline: string | null;
  description: string | null;
  price_label: string | null;
  bullets: string[] | null;
  sort_order: number | null;
  published: boolean;
};

export type CmsResource = {
  id: string;
  slug: string;
  title: string;
  category: string | null;
  excerpt: string | null;
  body: string | null;
  cover_image_url: string | null;
  sort_order: number | null;
  published: boolean;
};

export type CmsTestimonial = {
  id: string;
  quote: string;
  author_name: string;
  author_title: string | null;
  company: string | null;
  avatar_url: string | null;
  sort_order: number | null;
  published: boolean;
};

export function usePublishedServices() {
  return useQuery({
    queryKey: ["cms_services", "public"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("cms_services")
        .select("*")
        .eq("published", true)
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return (data ?? []) as CmsService[];
    },
    staleTime: 60_000,
  });
}

export function usePublishedResources() {
  return useQuery({
    queryKey: ["cms_resources", "public"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("cms_resources")
        .select("*")
        .eq("published", true)
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return (data ?? []) as CmsResource[];
    },
    staleTime: 60_000,
  });
}

export function usePublishedTestimonials() {
  return useQuery({
    queryKey: ["cms_testimonials", "public"],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from("cms_testimonials")
          .select("*")
          .eq("published", true)
          .order("sort_order", { ascending: true });
        if (error) return [];
        return (data ?? []) as CmsTestimonial[];
      } catch {
        return [];
      }
    },
    staleTime: 60_000,
  });
}
