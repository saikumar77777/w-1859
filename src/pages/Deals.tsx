
import React, { useState } from 'react';
import CRMSidebar from '../components/CRMSidebar';
import DealKanbanBoard from '../components/DealKanbanBoard';
import DealsAnalytics from '../components/DealsAnalytics';
import { Plus, Filter, BarChart3 } from 'lucide-react';

const Deals = () => {
  const [viewMode, setViewMode] = useState<'kanban' | 'analytics'>('kanban');

  return (
    <div className="min-h-screen bg-crm-primary flex">
      <CRMSidebar />
      
      <div className="flex-1 p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-semibold text-crm-text-white mb-2">
              Sales Pipeline
            </h1>
            <p className="text-crm-text-secondary">
              Track and manage your deals through the sales process
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex bg-crm-secondary rounded-lg p-1">
              <button
                onClick={() => setViewMode('kanban')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  viewMode === 'kanban'
                    ? 'bg-crm-electric text-white'
                    : 'text-crm-text-secondary hover:text-crm-text-white'
                }`}
              >
                Pipeline
              </button>
              <button
                onClick={() => setViewMode('analytics')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  viewMode === 'analytics'
                    ? 'bg-crm-electric text-white'
                    : 'text-crm-text-secondary hover:text-crm-text-white'
                }`}
              >
                <BarChart3 className="w-4 h-4 mr-2 inline" />
                Analytics
              </button>
            </div>
            <button className="bg-crm-tertiary hover:bg-crm-text-secondary text-crm-text-primary px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </button>
            <button className="bg-gradient-to-r from-crm-electric to-crm-emerald hover:shadow-electric text-white px-6 py-2 rounded-lg font-medium transition-all duration-200 flex items-center">
              <Plus className="w-5 h-5 mr-2" />
              New Deal
            </button>
          </div>
        </div>

        {/* Main Content */}
        {viewMode === 'kanban' ? <DealKanbanBoard /> : <DealsAnalytics />}
      </div>
    </div>
  );
};

export default Deals;
