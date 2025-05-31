
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { useToast } from '@/hooks/use-toast';

export interface RealContact {
  id: string;
  first_name: string;
  last_name: string;
  email: string | null;
  phone: string | null;
  company: string | null;
  position: string | null;
  status: string | null;
  source: string | null;
  notes: string | null;
  tags: string[] | null;
  created_at: string;
  updated_at: string;
}

export const useRealContacts = () => {
  const [contacts, setContacts] = useState<RealContact[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchContacts = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('contacts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setContacts(data || []);
    } catch (error: any) {
      console.error('Error fetching contacts:', error);
      toast({
        title: "Error",
        description: "Failed to fetch contacts",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const createContact = async (contactData: Partial<RealContact>) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('contacts')
        .insert([{
          ...contactData,
          user_id: user.id
        }])
        .select()
        .single();

      if (error) throw error;
      setContacts(prev => [data, ...prev]);
      toast({
        title: "Success",
        description: "Contact created successfully"
      });
      return data;
    } catch (error: any) {
      console.error('Error creating contact:', error);
      toast({
        title: "Error",
        description: "Failed to create contact",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    fetchContacts();
  }, [user]);

  return {
    contacts,
    loading,
    createContact,
    refetch: fetchContacts
  };
};
