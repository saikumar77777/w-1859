
import React from 'react';
import DealCard from './DealCard';
import { Plus } from 'lucide-react';

interface Deal {
  id: string;
  name: string;
  company: string;
  value: number;
  priority: 'critical' | 'high' | 'medium' | 'low';
  daysInStage: number;
  lastActivity: string;
  activities: {
    type: 'email' | 'call' | 'meeting' | 'followup' | 'overdue';
    count: number;
  }[];
  isOverdue?: boolean;
}

interface PipelineStage {
  id: string;
  name: string;
  color: string;
  bgColor: string;
  borderColor: string;
  deals: Deal[];
  totalValue: number;
}

const DealKanbanBoard = () => {
  const pipelineStages: PipelineStage[] = [
    {
      id: 'prospecting',
      name: 'Prospecting',
      color: '#a78bfa',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/30',
      deals: [
        {
          id: '1',
          name: 'Enterprise Software License',
          company: 'TechCorp Inc.',
          value: 75000,
          priority: 'high',
          daysInStage: 3,
          lastActivity: '2 hours ago',
          activities: [
            { type: 'email', count: 2 },
            { type: 'call', count: 1 }
          ]
        },
        {
          id: '2',
          name: 'Cloud Migration Project',
          company: 'StartupIO',
          value: 25000,
          priority: 'medium',
          daysInStage: 7,
          lastActivity: '1 day ago',
          activities: [
            { type: 'email', count: 1 },
            { type: 'meeting', count: 1 }
          ]
        }
      ],
      totalValue: 100000
    },
    {
      id: 'qualification',
      name: 'Qualification',
      color: '#22d3ee',
      bgColor: 'bg-cyan-500/10',
      borderColor: 'border-cyan-500/30',
      deals: [
        {
          id: '3',
          name: 'Marketing Platform Integration',
          company: 'Design Studio',
          value: 45000,
          priority: 'critical',
          daysInStage: 12,
          lastActivity: '3 hours ago',
          activities: [
            { type: 'email', count: 5 },
            { type: 'call', count: 2 },
            { type: 'meeting', count: 1 }
          ]
        }
      ],
      totalValue: 45000
    },
    {
      id: 'proposal',
      name: 'Proposal Sent',
      color: '#fbbf24',
      bgColor: 'bg-amber-500/10',
      borderColor: 'border-amber-500/30',
      deals: [
        {
          id: '4',
          name: 'Custom Development Package',
          company: 'Enterprise Solutions',
          value: 120000,
          priority: 'critical',
          daysInStage: 5,
          lastActivity: '1 hour ago',
          activities: [
            { type: 'email', count: 3 },
            { type: 'followup', count: 2 }
          ]
        },
        {
          id: '5',
          name: 'Support Package Renewal',
          company: 'Consulting Biz',
          value: 18000,
          priority: 'low',
          daysInStage: 2,
          lastActivity: '4 hours ago',
          activities: [
            { type: 'email', count: 1 }
          ]
        }
      ],
      totalValue: 138000
    },
    {
      id: 'negotiation',
      name: 'Negotiation',
      color: '#fb923c',
      bgColor: 'bg-orange-500/10',
      borderColor: 'border-orange-500/30',
      deals: [
        {
          id: '6',
          name: 'Multi-Year Service Contract',
          company: 'Global Corp',
          value: 250000,
          priority: 'critical',
          daysInStage: 8,
          lastActivity: '30 minutes ago',
          activities: [
            { type: 'call', count: 4 },
            { type: 'email', count: 7 },
            { type: 'meeting', count: 2 }
          ]
        }
      ],
      totalValue: 250000
    },
    {
      id: 'closed-won',
      name: 'Closed Won',
      color: '#10b981',
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/30',
      deals: [
        {
          id: '7',
          name: 'Premium License Bundle',
          company: 'Innovation Labs',
          value: 85000,
          priority: 'high',
          daysInStage: 1,
          lastActivity: '6 hours ago',
          activities: [
            { type: 'call', count: 1 }
          ]
        }
      ],
      totalValue: 85000
    },
    {
      id: 'closed-lost',
      name: 'Closed Lost',
      color: '#f87171',
      bgColor: 'bg-red-500/10',
      borderColor: 'border-red-500/30',
      deals: [
        {
          id: '8',
          name: 'Basic Package Deal',
          company: 'Small Business Co',
          value: 5000,
          priority: 'low',
          daysInStage: 14,
          lastActivity: '2 weeks ago',
          activities: [
            { type: 'overdue', count: 3 }
          ]
        }
      ],
      totalValue: 5000
    }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="flex-1 overflow-x-auto">
      <div className="flex space-x-6 min-w-max pb-8">
        {pipelineStages.map((stage) => (
          <div key={stage.id} className="flex-shrink-0 w-80">
            {/* Stage Header */}
            <div 
              className={`crm-card p-4 mb-4 border-l-4`}
              style={{ borderLeftColor: stage.color }}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-crm-text-white">{stage.name}</h3>
                <span 
                  className="px-2 py-1 rounded-full text-xs font-medium"
                  style={{ 
                    backgroundColor: `${stage.color}20`,
                    color: stage.color 
                  }}
                >
                  {stage.deals.length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <p className="font-mono text-sm font-bold text-crm-text-white">
                  {formatCurrency(stage.totalValue)}
                </p>
                <button 
                  className="text-crm-text-secondary hover:text-crm-text-white transition-colors duration-200"
                  title="Add Deal"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Deal Cards */}
            <div className="space-y-4">
              {stage.deals.map((deal) => (
                <DealCard 
                  key={deal.id} 
                  deal={deal} 
                  stageColor={stage.color}
                />
              ))}
            </div>

            {/* Add Deal Button */}
            <button className="w-full mt-4 p-4 border-2 border-dashed border-crm-tertiary rounded-lg text-crm-text-secondary hover:text-crm-text-white hover:border-crm-text-secondary transition-all duration-200 flex items-center justify-center">
              <Plus className="w-5 h-5 mr-2" />
              Add Deal
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DealKanbanBoard;
