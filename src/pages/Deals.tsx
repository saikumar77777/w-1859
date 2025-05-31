
import React, { useState } from 'react';
import CRMSidebar from '../components/CRMSidebar';
import DealKanbanBoard from '../components/DealKanbanBoard';
import { useDeals } from '@/hooks/useDeals';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Search, Filter, BarChart3 } from 'lucide-react';
import { Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';

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

  // This will be used to filter deals in the future if needed
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
      
      <div className="flex-1 overflow-hidden">
        <div className="p-8 h-full flex flex-col">
          {/* Header */}
          <div className="flex justify-between items-center mb-8 flex-shrink-0">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Sales Pipeline</h1>
              <p className="text-crm-text-secondary">Manage your deals and track revenue</p>
            </div>
            
            <div className="flex space-x-4">
              <Link to="/deals-analytics">
                <Button variant="outline" className="bg-crm-secondary border-crm-tertiary text-white hover:bg-crm-tertiary">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  View Analytics
                </Button>
              </Link>
              
              <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-crm-electric hover:bg-crm-electric/90 text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    New Deal
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-crm-secondary border-crm-tertiary">
                  <DialogHeader>
                    <DialogTitle className="text-white">Create New Deal</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-white block mb-2">Deal Name</label>
                      <Input
                        value={newDeal.name}
                        onChange={(e) => setNewDeal(prev => ({ ...prev, name: e.target.value }))}
                        className="bg-crm-tertiary border-crm-tertiary text-white placeholder:text-gray-400 focus:border-crm-electric focus:ring-1 focus:ring-crm-electric"
                        placeholder="Enter deal name"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-white block mb-2">Company</label>
                      <Input
                        value={newDeal.company}
                        onChange={(e) => setNewDeal(prev => ({ ...prev, company: e.target.value }))}
                        className="bg-crm-tertiary border-crm-tertiary text-white placeholder:text-gray-400 focus:border-crm-electric focus:ring-1 focus:ring-crm-electric"
                        placeholder="Company name"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-white block mb-2">Value ($)</label>
                      <Input
                        type="number"
                        value={newDeal.value}
                        onChange={(e) => setNewDeal(prev => ({ ...prev, value: Number(e.target.value) }))}
                        className="bg-crm-tertiary border-crm-tertiary text-white placeholder:text-gray-400 focus:border-crm-electric focus:ring-1 focus:ring-crm-electric"
                        placeholder="0"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-white block mb-2">Priority</label>
                        <Select value={newDeal.priority} onValueChange={(value: any) => setNewDeal(prev => ({ ...prev, priority: value }))}>
                          <SelectTrigger className="bg-crm-tertiary border-crm-tertiary text-white">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-crm-tertiary border-crm-tertiary">
                            <SelectItem value="low" className="text-white hover:bg-crm-secondary">Low</SelectItem>
                            <SelectItem value="medium" className="text-white hover:bg-crm-secondary">Medium</SelectItem>
                            <SelectItem value="high" className="text-white hover:bg-crm-secondary">High</SelectItem>
                            <SelectItem value="critical" className="text-white hover:bg-crm-secondary">Critical</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-white block mb-2">Probability (%)</label>
                        <Input
                          type="number"
                          min="0"
                          max="100"
                          value={newDeal.probability}
                          onChange={(e) => setNewDeal(prev => ({ ...prev, probability: Number(e.target.value) }))}
                          className="bg-crm-tertiary border-crm-tertiary text-white placeholder:text-gray-400 focus:border-crm-electric focus:ring-1 focus:ring-crm-electric"
                        />
                      </div>
                    </div>
                    <Button onClick={handleCreateDeal} className="w-full bg-crm-electric hover:bg-crm-electric/90 text-white">
                      Create Deal
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="flex space-x-4 mb-8 flex-shrink-0">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search deals..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-crm-secondary border-crm-tertiary text-white placeholder:text-gray-400 pl-10 focus:border-crm-electric focus:ring-1 focus:ring-crm-electric"
              />
            </div>
            <Select value={filterStage} onValueChange={setFilterStage}>
              <SelectTrigger className="w-48 bg-crm-secondary border-crm-tertiary text-white">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter by stage" />
              </SelectTrigger>
              <SelectContent className="bg-crm-tertiary border-crm-tertiary">
                <SelectItem value="all" className="text-white hover:bg-crm-secondary">All Stages</SelectItem>
                <SelectItem value="prospecting" className="text-white hover:bg-crm-secondary">Prospecting</SelectItem>
                <SelectItem value="qualification" className="text-white hover:bg-crm-secondary">Qualification</SelectItem>
                <SelectItem value="proposal" className="text-white hover:bg-crm-secondary">Proposal</SelectItem>
                <SelectItem value="negotiation" className="text-white hover:bg-crm-secondary">Negotiation</SelectItem>
                <SelectItem value="closed-won" className="text-white hover:bg-crm-secondary">Closed Won</SelectItem>
                <SelectItem value="closed-lost" className="text-white hover:bg-crm-secondary">Closed Lost</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Kanban Board - Full height container */}
          <div className="flex-1 overflow-hidden">
            <DealKanbanBoard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Deals;
