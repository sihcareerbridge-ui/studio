// This file is a placeholder for your Supabase database types.
// You can generate this file automatically using the Supabase CLI:
// npx supabase gen types typescript --project-id <your-project-id> > src/lib/database-types.ts
// 
// See: https://supabase.com/docs/guides/api/generating-types

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      // Add your table definitions here
      // Example:
      // profiles: {
      //   Row: {
      //     id: string
      //     updated_at: string | null
      //     username: string | null
      //     avatar_url: string | null
      //     website: string | null
      //   }
      //   Insert: {
      //     id: string
      //     updated_at?: string | null
      //     username?: string | null
      //     avatar_url?: string | null
      //     website?: string | null
      //   }
      //   Update: {
      //     id?: string
      //     updated_at?: string | null
      //     username?: string | null
      //     avatar_url?: string | null
      //     website?: string | null
      //   }
      // }
    }
    Views: {
      // Add your view definitions here
    }
    Functions: {
      // Add your function definitions here
    }
    Enums: {
      // Add your enum definitions here
    }
    CompositeTypes: {
      // Add your composite type definitions here
    }
  }
}
