
import React, { useState } from 'react';
import CRMSidebar from '../components/CRMSidebar';
import LeadManagement from '../components/LeadManagement';
import UserManagement from '../components/UserManagement';
import ReportsAnalytics from '../components/ReportsAnalytics';
import { Users, UserCheck, BarChart3 } from 'lucide-react';

const Communications = () => {
  const [activeTab, setActiveTab] = useState<'leads' | 'users' | 'reports'>('leads');

  const tabs = [
    { id: 'leads', label: 'Lead Management', icon: Users },
    { id: 'users', label: 'User Management', icon: UserCheck },
    { id: 'reports', label: 'Reports', icon: BarChart3 }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'leads':
        return <LeadManagement />;
      case 'users':
        return <UserManagement />;
      case 'reports':
        return <ReportsAnalytics />;
      default:
        return <LeadManagement />;
    }
  };

  return (
    <div className="min-h-screen bg-crm-primary flex">
      <CRMSidebar />
      
      <div className="flex-1 p-8">
        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="flex bg-crm-secondary rounded-lg p-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center px-4 py-3 rounded-md text-sm font-medium transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-crm-electric text-white shadow-electric'
                      : 'text-crm-text-secondary hover:text-crm-text-white hover:bg-crm-tertiary'
                  }`}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        {renderContent()}
      </div>
    </div>
  );
};

export default Communications;
