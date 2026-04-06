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

export interface Job {
    id: string;
    title: string;
    slug: string;
    description?: string;
    requirements?: string;
    benefits?: string;
    location?: string;
    type?: string;
    salary?: string;
    status: 'opening' | 'closed' | 'draft';
    deadline?: string;
    created_at?: string;
}

export interface JobApplication {
    job_id: string;
    full_name: string;
    email: string;
    phone: string;
    cv_url: string;
    message?: string;
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

export interface NavigationItem {
  id: string;
  label: string;
  path: string;
  parent_id?: string;
  order_index: number;
  is_active: boolean;
  position?: 'header' | 'footer';
  children?: NavigationItem[];
  created_at?: string;
}

export interface FAQ {
    id: string;
    question: string;
    answer: string;
    category: string;
    sort_order: number;
    is_active: boolean;
    created_at?: string;
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

export const useJobs = () => {
    return useQuery({
      queryKey: ["jobs"],
      queryFn: async () => {
        const { data, error } = await supabase
          .from("jobs")
          .select("*")
          .eq("status", "opening")
          .order("created_at", { ascending: false });
        if (error) throw error;
        return data as Job[];
      },
    });
};

export const useApplyJob = () => {
    return async (application: JobApplication) => {
        const { data, error } = await supabase
            .from("job_applications")
            .insert([
                {
                    ...application,
                    status: 'pending',
                    created_at: new Date().toISOString()
                }
            ])
            .select()
            .single();
        
        if (error) throw error;
        return data;
    };
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
export const useSubmitContact = () => {
    return async (contact: { name: string; email: string; phone: string; service: string; message: string }) => {
        const { data, error } = await supabase
            .from("contacts")
            .insert([
                {
                    name: contact.name,
                    email: contact.email,
                    phone: contact.phone,
                    subject: contact.service, // Map 'service' to 'subject' in the database
                    message: contact.message,
                    status: 'new',
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString()
                }
            ])
            .select()
            .single();
        
        if (error) throw error;
        return data;
    };
};

export const useFAQs = (category?: string) => {
  return useQuery({
    queryKey: ["faqs", category],
    queryFn: async () => {
      let query = supabase
        .from("faqs")
        .select("*")
        .eq("is_active", true)
        .order("sort_order", { ascending: true });
      
      if (category) {
        query = query.eq("category", category);
      }
      
      const { data, error } = await query;
      if (error) throw error;
      return data as FAQ[];
    },
  });
};

export const useNavigation = (position: 'header' | 'footer' = 'header') => {
  return useQuery({
    queryKey: ["navigation", position],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("navigation")
        .select("*")
        .eq("position", position)
        .eq("is_active", true)
        .order("order_index", { ascending: true });

      if (error) throw error;

      // Build tree structure
      const itemMap: Record<string, NavigationItem> = {};
      const roots: NavigationItem[] = [];

      const items = data as NavigationItem[];

      items.forEach(item => {
        itemMap[item.id] = { ...item, children: [] };
      });

      items.forEach(item => {
        const mappedItem = itemMap[item.id];
        if (item.parent_id && itemMap[item.parent_id]) {
          itemMap[item.parent_id].children?.push(mappedItem);
        } else if (!item.parent_id) {
          roots.push(mappedItem);
        }
      });

      return roots;
    },
  });
};
