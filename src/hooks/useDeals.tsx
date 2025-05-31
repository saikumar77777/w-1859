
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { useToast } from '@/hooks/use-toast';

export interface Deal {
  id: string;
  contact_id?: string;
  name: string;
  company?: string;
  value: number;
  stage: 'prospecting' | 'qualification' | 'proposal' | 'negotiation' | 'closed-won' | 'closed-lost';
  priority: 'critical' | 'high' | 'medium' | 'low';
  probability: number;
  expected_close_date?: string;
  days_in_stage: number;
  last_activity?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export const useDeals = () => {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchDeals = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('deals')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setDeals(data || []);
    } catch (error: any) {
      console.error('Error fetching deals:', error);
      toast({
        title: "Error",
        description: "Failed to fetch deals",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const createDeal = async (dealData: Omit<Deal, 'id' | 'created_at' | 'updated_at'>) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('deals')
        .insert([{ ...dealData, user_id: user.id }])
        .select()
        .single();

      if (error) throw error;
      setDeals(prev => [data, ...prev]);
      toast({
        title: "Success",
        description: "Deal created successfully"
      });
      return data;
    } catch (error: any) {
      console.error('Error creating deal:', error);
      toast({
        title: "Error",
        description: "Failed to create deal",
        variant: "destructive"
      });
    }
  };

  const updateDeal = async (id: string, updates: Partial<Deal>) => {
    try {
      const { data, error } = await supabase
        .from('deals')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      setDeals(prev => prev.map(deal => deal.id === id ? data : deal));
      toast({
        title: "Success",
        description: "Deal updated successfully"
      });
      return data;
    } catch (error: any) {
      console.error('Error updating deal:', error);
      toast({
        title: "Error",
        description: "Failed to update deal",
        variant: "destructive"
      });
    }
  };

  const deleteDeal = async (id: string) => {
    try {
      const { error } = await supabase
        .from('deals')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setDeals(prev => prev.filter(deal => deal.id !== id));
      toast({
        title: "Success",
        description: "Deal deleted successfully"
      });
    } catch (error: any) {
      console.error('Error deleting deal:', error);
      toast({
        title: "Error",
        description: "Failed to delete deal",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    fetchDeals();
  }, [user]);

  return {
    deals,
    loading,
    createDeal,
    updateDeal,
    deleteDeal,
    refetch: fetchDeals
  };
};
