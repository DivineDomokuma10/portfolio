export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      projects: {
        Row: {
          id: string;
          title: string;
          description: string;
          techs: Json;
          image_url: string | null;
          github_url: string | null;
          live_url: string | null;
          category: string;
          sort_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description?: string;
          techs?: Json;
          image_url?: string | null;
          github_url?: string | null;
          live_url?: string | null;
          category?: string;
          sort_order?: number;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["projects"]["Insert"]>;
        Relationships: [];
      };
      skill_categories: {
        Row: {
          id: string;
          name: string;
          techs: Json;
          image_url: string | null;
          sort_order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          techs?: Json;
          image_url?: string | null;
          sort_order?: number;
        };
        Update: Partial<Database["public"]["Tables"]["skill_categories"]["Insert"]>;
        Relationships: [];
      };
      settings: {
        Row: {
          id: number;
          about_paragraphs: Json;
          contact: Json;
          updated_at: string;
        };
        Insert: {
          id?: number;
          about_paragraphs?: Json;
          contact?: Json;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["settings"]["Insert"]>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
