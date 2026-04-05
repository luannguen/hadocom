import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

// Interfaces
export interface Service {
  id: string;
  slug: string;
  title: string;
  description: string;
  icon: string;
  image_url: string;
  features: string[];
}

export interface News {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image_url: string;
  tag?: string;
  created_at: string;
}

export interface Product {
    id: string;
    name: string;
    description: string;
    icon?: string;
    category: 'infrastructure' | 'software';
}

export interface Project {
    id: string;
    title: string;
    description: string;
    image_url: string;
    tags: string[];
}

export interface TeamMember {
    id: string;
    name: string;
    role: string;
    bio: string;
    icon: string;
}

export interface Banner {
    id: string;
    title: string;
    description: string;
    badge: string;
    image_url: string;
    link: string;
    button_text: string;
    features: any[];
}

export interface SiteSetting {
    key: string;
    value: string;
}

// Hooks
export const useServices = () => {
  return useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("services")
        .select("*")
        .eq("is_active", true);
      if (error) throw error;
      return data as Service[];
    },
  });
};

export const useNews = () => {
  return useQuery({
    queryKey: ["news"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("news")
        .select("*")
        .eq("status", "published")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as News[];
    },
  });
};

export const useProducts = () => {
    return useQuery({
      queryKey: ["products"],
      queryFn: async () => {
        const { data, error } = await supabase
          .from("products")
          .select("*");
        if (error) throw error;
        return data as Product[];
      },
    });
};

export const useProjects = () => {
    return useQuery({
      queryKey: ["projects"],
      queryFn: async () => {
        const { data, error } = await supabase
          .from("projects")
          .select("*");
        if (error) throw error;
        return data as Project[];
      },
    });
};

export const useTeam = () => {
    return useQuery({
      queryKey: ["team"],
      queryFn: async () => {
        const { data, error } = await supabase
          .from("team_members")
          .select("*")
          .order("display_order", { ascending: true });
        if (error) throw error;
        return data as TeamMember[];
      },
    });
};

export const useBanner = (position: string = 'home_main') => {
    return useQuery({
        queryKey: ["banner", position],
        queryFn: async () => {
            const { data, error } = await supabase
                .from("banners")
                .select("*")
                .eq("position", position)
                .eq("is_active", true)
                .single();
            if (error) throw error;
            return data as Banner;
        },
    });
};

export const useSettings = () => {
    return useQuery({
        queryKey: ["settings"],
        queryFn: async () => {
            const { data, error } = await supabase
                .from("site_settings")
                .select("*");
            if (error) throw error;
            
            // Map to key-value object
            const settingsMap: Record<string, string> = {};
            data.forEach(s => settingsMap[s.key] = s.value);
            return settingsMap;
        },
    });
};
