
import React, { useState } from 'react';
import CRMSidebar from '../components/CRMSidebar';
import DealKanbanBoard from '../components/DealKanbanBoard';
import DealsAnalytics from '../components/DealsAnalytics';
import { useDeals } from '@/hooks/useDeals';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Search, Filter } from 'lucide-react';
import { Loader2 } from 'lucide-react';

const Deals = () => {
  const { deals, loading, createDeal } = useDeals();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStage, setFilterStage] = useState('all');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newDeal, setNewDeal] = useState({
    name: '',
    company: '',
    value: 0,
    stage: 'prospecting' as const,
    priority: 'medium' as const,
    probability: 50
  });

  const filteredDeals = deals.filter(deal => {
    const matchesSearch = deal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         deal.company?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStage = filterStage === 'all' || deal.stage === filterStage;
    return matchesSearch && matchesStage;
  });

  const handleCreateDeal = async () => {
    if (!newDeal.name) return;
    
    await createDeal({
      ...newDeal,
      days_in_stage: 0
    });
    
    setNewDeal({
      name: '',
      company: '',
      value: 0,
      stage: 'prospecting',
      priority: 'medium',
      probability: 50
    });
    setIsCreateDialogOpen(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-crm-primary flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-crm-electric" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-crm-primary flex">
      <CRMSidebar />
      
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-crm-text-white mb-2">Sales Pipeline</h1>
              <p className="text-crm-text-secondary">Manage your deals and track revenue</p>
            </div>
            
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button className="btn-primary">
                  <Plus className="w-4 h-4 mr-2" />
                  New Deal
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-crm-secondary border-crm-tertiary">
                <DialogHeader>
                  <DialogTitle className="text-crm-text-white">Create New Deal</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-crm-text-white">Deal Name</label>
                    <Input
                      value={newDeal.name}
                      onChange={(e) => setNewDeal(prev => ({ ...prev, name: e.target.value }))}
                      className="form-control-dark"
                      placeholder="Enter deal name"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-crm-text-white">Company</label>
                    <Input
                      value={newDeal.company}
                      onChange={(e) => setNewDeal(prev => ({ ...prev, company: e.target.value }))}
                      className="form-control-dark"
                      placeholder="Company name"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-crm-text-white">Value ($)</label>
                    <Input
                      type="number"
                      value={newDeal.value}
                      onChange={(e) => setNewDeal(prev => ({ ...prev, value: Number(e.target.value) }))}
                      className="form-control-dark"
                      placeholder="0"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-crm-text-white">Priority</label>
                      <Select value={newDeal.priority} onValueChange={(value: any) => setNewDeal(prev => ({ ...prev, priority: value }))}>
                        <SelectTrigger className="form-control-dark">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-crm-tertiary border-crm-tertiary">
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="critical">Critical</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-crm-text-white">Probability (%)</label>
                      <Input
                        type="number"
                        min="0"
                        max="100"
                        value={newDeal.probability}
                        onChange={(e) => setNewDeal(prev => ({ ...prev, probability: Number(e.target.value) }))}
                        className="form-control-dark"
                      />
                    </div>
                  </div>
                  <Button onClick={handleCreateDeal} className="w-full btn-primary">
                    Create Deal
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Search and Filter */}
          <div className="flex space-x-4 mb-8">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-crm-text-secondary" />
              <Input
                placeholder="Search deals..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-control-dark pl-10"
              />
            </div>
            <Select value={filterStage} onValueChange={setFilterStage}>
              <SelectTrigger className="w-48 form-control-dark">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-crm-tertiary border-crm-tertiary">
                <SelectItem value="all">All Stages</SelectItem>
                <SelectItem value="prospecting">Prospecting</SelectItem>
                <SelectItem value="qualification">Qualification</SelectItem>
                <SelectItem value="proposal">Proposal</SelectItem>
                <SelectItem value="negotiation">Negotiation</SelectItem>
                <SelectItem value="closed-won">Closed Won</SelectItem>
                <SelectItem value="closed-lost">Closed Lost</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Analytics */}
          <div className="mb-8">
            <DealsAnalytics deals={filteredDeals} />
          </div>

          {/* Kanban Board */}
          <DealKanbanBoard />
        </div>
      </div>
    </div>
  );
};

export default Deals;
