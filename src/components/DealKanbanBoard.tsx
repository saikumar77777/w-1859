
import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useDeals } from '@/hooks/useDeals';
import DealCard from './DealCard';
import CreateDealDialog from './CreateDealDialog';

interface PipelineStage {
  id: string;
  name: string;
  color: string;
  bgColor: string;
  borderColor: string;
}

const DealKanbanBoard = () => {
  const { deals, loading, createDeal, updateDeal } = useDeals();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedStage, setSelectedStage] = useState<string>('');

  const pipelineStages: PipelineStage[] = [
    {
      id: 'prospecting',
      name: 'Prospecting',
      color: '#a78bfa',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/30',
    },
    {
      id: 'qualification',
      name: 'Qualification',
      color: '#22d3ee',
      bgColor: 'bg-cyan-500/10',
      borderColor: 'border-cyan-500/30',
    },
    {
      id: 'proposal',
      name: 'Proposal Sent',
      color: '#fbbf24',
      bgColor: 'bg-amber-500/10',
      borderColor: 'border-amber-500/30',
    },
    {
      id: 'negotiation',
      name: 'Negotiation',
      color: '#fb923c',
      bgColor: 'bg-orange-500/10',
      borderColor: 'border-orange-500/30',
    },
    {
      id: 'closed-won',
      name: 'Closed Won',
      color: '#10b981',
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/30',
    },
    {
      id: 'closed-lost',
      name: 'Closed Lost',
      color: '#f87171',
      bgColor: 'bg-red-500/10',
      borderColor: 'border-red-500/30',
    }
  ];

  const getDealsForStage = (stageId: string) => {
    return deals.filter(deal => deal.stage === stageId);
  };

  const getTotalValueForStage = (stageId: string) => {
    return getDealsForStage(stageId).reduce((total, deal) => total + deal.value, 0);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleAddDeal = (stageId: string) => {
    setSelectedStage(stageId);
    setIsCreateDialogOpen(true);
  };

  const handleCreateDeal = async (dealData: any) => {
    await createDeal({
      ...dealData,
      stage: selectedStage
    });
    setIsCreateDialogOpen(false);
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-crm-electric"></div>
      </div>
    );
  }

  return (
    <>
      <div className="h-full overflow-x-auto">
        <div className="flex space-x-6 h-full min-w-max p-4">
          {pipelineStages.map((stage) => {
            const stageDeals = getDealsForStage(stage.id);
            const totalValue = getTotalValueForStage(stage.id);

            return (
              <div key={stage.id} className="flex-shrink-0 w-80 h-full flex flex-col">
                {/* Stage Header */}
                <div 
                  className="bg-crm-secondary p-4 mb-4 border-l-4 rounded-lg border border-crm-tertiary"
                  style={{ borderLeftColor: stage.color }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-white">{stage.name}</h3>
                    <span 
                      className="px-2 py-1 rounded-full text-xs font-medium"
                      style={{ 
                        backgroundColor: `${stage.color}20`,
                        color: stage.color 
                      }}
                    >
                      {stageDeals.length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="font-mono text-sm font-bold text-white">
                      {formatCurrency(totalValue)}
                    </p>
                    <button 
                      onClick={() => handleAddDeal(stage.id)}
                      className="text-gray-400 hover:text-white transition-colors"
                      title="Add Deal"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Deal Cards Container */}
                <div className="flex-1 overflow-hidden">
                  <ScrollArea className="h-full">
                    <div className="space-y-4 pr-2">
                      {stageDeals.map((deal) => (
                        <DealCard 
                          key={deal.id}
                          deal={{
                            id: deal.id,
                            name: deal.name,
                            company: deal.company || 'Unknown Company',
                            value: deal.value,
                            priority: (deal.priority as 'critical' | 'high' | 'medium' | 'low') || 'medium',
                            daysInStage: deal.days_in_stage || 0,
                            lastActivity: deal.last_activity || 'No recent activity',
                            activities: [],
                            isOverdue: (deal.days_in_stage || 0) > 14
                          }} 
                          stageColor={stage.color}
                          onUpdate={updateDeal}
                        />
                      ))}

                      {/* Add Deal Button */}
                      <button 
                        onClick={() => handleAddDeal(stage.id)}
                        className="w-full mt-4 p-4 border-2 border-dashed border-crm-tertiary rounded-lg text-gray-400 hover:text-white hover:border-gray-400 transition-colors flex items-center justify-center hover:bg-crm-tertiary/20"
                      >
                        <Plus className="w-5 h-5 mr-2" />
                        Add Deal
                      </button>
                    </div>
                  </ScrollArea>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <CreateDealDialog
        isOpen={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
        onSubmit={handleCreateDeal}
        stage={selectedStage}
      />
    </>
  );
};

export default DealKanbanBoard;
