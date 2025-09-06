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
      applications: {
        Row: {
          applied_at: string | null
          fit_score: number | null
          id: string
          internship_id: string | null
          status: string | null
          student_id: string | null
        }
        Insert: {
          applied_at?: string | null
          fit_score?: number | null
          id?: string
          internship_id?: string | null
          status?: string | null
          student_id?: string | null
        }
        Update: {
          applied_at?: string | null
          fit_score?: number | null
          id?: string
          internship_id?: string | null
          status?: string | null
          student_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "applications_internship_id_fkey"
            columns: ["internship_id"]
            isOneToOne: false
            referencedRelation: "internships"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "applications_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          }
        ]
      }
      content_blocks: {
        Row: {
          block_order: number | null
          content: string | null
          id: string
          module_id: string | null
          title: string
          type: string
        }
        Insert: {
          block_order?: number | null
          content?: string | null
          id?: string
          module_id?: string | null
          title: string
          type: string
        }
        Update: {
          block_order?: number | null
          content?: string | null
          id?: string
          module_id?: string | null
          title?: string
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "content_blocks_module_id_fkey"
            columns: ["module_id"]
            isOneToOne: false
            referencedRelation: "course_modules"
            referencedColumns: ["id"]
          }
        ]
      }
      conversations: {
        Row: {
          admin_id: string | null
          created_at: string | null
          id: string
          organization_id: string | null
        }
        Insert: {
          admin_id?: string | null
          created_at?: string | null
          id?: string
          organization_id?: string | null
        }
        Update: {
          admin_id?: string | null
          created_at?: string | null
          id?: string
          organization_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "conversations_admin_id_fkey"
            columns: ["admin_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "conversations_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          }
        ]
      }
      course_modules: {
        Row: {
          course_id: string | null
          duration: string | null
          id: string
          module_order: number | null
          title: string
        }
        Insert: {
          course_id?: string | null
          duration?: string | null
          id?: string
          module_order?: number | null
          title: string
        }
        Update: {
          course_id?: string | null
          duration?: string | null
          id?: string
          module_order?: number | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "course_modules_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          }
        ]
      }
      courses: {
        Row: {
          category: string | null
          description: string | null
          duration: string | null
          id: string
          provider_id: string | null
          rating: number | null
          status: string | null
          tags: string[] | null
          title: string
        }
        Insert: {
          category?: string | null
          description?: string | null
          duration?: string | null
          id?: string
          provider_id?: string | null
          rating?: number | null
          status?: string | null
          tags?: string[] | null
          title: string
        }
        Update: {
          category?: string | null
          description?: string | null
          duration?: string | null
          id?: string
          provider_id?: string | null
          rating?: number | null
          status?: string | null
          tags?: string[] | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "courses_provider_id_fkey"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          }
        ]
      }
      feedback: {
        Row: {
          comment: string | null
          created_at: string | null
          id: string
          rating: number | null
          student_id: string | null
          target_id: string
          target_type: string
        }
        Insert: {
          comment?: string | null
          created_at?: string | null
          id?: string
          rating?: number | null
          student_id?: string | null
          target_id: string
          target_type: string
        }
        Update: {
          comment?: string | null
          created_at?: string | null
          id?: string
          rating?: number | null
          student_id?: string | null
          target_id?: string
          target_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "feedback_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          }
        ]
      }
      internships: {
        Row: {
          deadline: string | null
          description: string | null
          duration: string | null
          id: string
          location: string | null
          organization_id: string | null
          start_date: string | null
          status: string | null
          stipend: number | null
          tags: string[] | null
          title: string
        }
        Insert: {
          deadline?: string | null
          description?: string | null
          duration?: string | null
          id?: string
          location?: string | null
          organization_id?: string | null
          start_date?: string | null
          status?: string | null
          stipend?: number | null
          tags?: string[] | null
          title: string
        }
        Update: {
          deadline?: string | null
          description?: string | null
          duration?: string | null
          id?: string
          location?: string | null
          organization_id?: string | null
          start_date?: string | null
          status?: string | null
          stipend?: number | null
          tags?: string[] | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "internships_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          }
        ]
      }
      messages: {
        Row: {
          content: string | null
          conversation_id: string | null
          id: string
          sender_id: string | null
          sent_at: string | null
        }
        Insert: {
          content?: string | null
          conversation_id?: string | null
          id?: string
          sender_id?: string | null
          sent_at?: string | null
        }
        Update: {
          content?: string | null
          conversation_id?: string | null
          id?: string
          sender_id?: string | null
          sent_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      organizations: {
        Row: {
          address: string | null
          bio: string | null
          email: string | null
          id: string
          logo_url: string | null
          name: string
          owner_id: string | null
          phone: string | null
          verified: boolean | null
        }
        Insert: {
          address?: string | null
          bio?: string | null
          email?: string | null
          id?: string
          logo_url?: string | null
          name: string
          owner_id?: string | null
          phone?: string | null
          verified?: boolean | null
        }
        Update: {
          address?: string | null
          bio?: string | null
          email?: string | null
          id?: string
          logo_url?: string | null
          name?: string
          owner_id?: string | null
          phone?: string | null
          verified?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "organizations_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      saved_items: {
        Row: {
          item_id: string
          item_type: string
          student_id: string
        }
        Insert: {
          item_id: string
          item_type: string
          student_id: string
        }
        Update: {
          item_id?: string
          item_type?: string
          student_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "saved_items_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          }
        ]
      }
      student_skills: {
        Row: {
          skill_name: string
          student_id: string
        }
        Insert: {
          skill_name: string
          student_id: string
        }
        Update: {
          skill_name?: string
          student_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "student_skills_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          }
        ]
      }
      students: {
        Row: {
          avatar_url: string | null
          bio: string | null
          branch: string | null
          cgpa: number | null
          college: string | null
          consent: boolean | null
          credits: number | null
          degree: string | null
          email: string
          id: string
          links: Json | null
          name: string
          resume_url: string | null
          university: string | null
          year: number | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          branch?: string | null
          cgpa?: number | null
          college?: string | null
          consent?: boolean | null
          credits?: number | null
          degree?: string | null
          email: string
          id: string
          links?: Json | null
          name: string
          resume_url?: string | null
          university?: string | null
          year?: number | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          branch?: string | null
          cgpa?: number | null
          college?: string | null
          consent?: boolean | null
          credits?: number | null
          degree?: string | null
          email?: string
          id?: string
          links?: Json | null
          name?: string
          resume_url?: string | null
          university?: string | null
          year?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "students_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
