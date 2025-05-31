
import React, { useState } from 'react';
import CRMSidebar from '../components/CRMSidebar';
import MetricsCard from '../components/MetricsCard';
import ActivityFeed from '../components/ActivityFeed';
import NotificationCenter from '../components/NotificationCenter';
import { useAuth } from '@/hooks/useAuth';
import { useContacts } from '@/hooks/useContacts';
import { useDeals } from '@/hooks/useDeals';
import { useNotifications } from '@/hooks/useNotifications';
import { Bell, Users, DollarSign, TrendingUp, Target, Calendar } from 'lucide-react';

const Index = () => {
  const [activeView, setActiveView] = useState<'dashboard' | 'notifications'>('dashboard');
  const { user } = useAuth();
  const { contacts } = useContacts();
  const { deals } = useDeals();
  const { unreadCount } = useNotifications();

  // Calculate metrics from real data
  const totalRevenue = deals
    .filter(deal => deal.stage === 'closed-won')
    .reduce((sum, deal) => sum + deal.value, 0);

  const totalLeads = contacts.filter(contact => contact.status === 'lead').length;
  const totalCustomers = contacts.filter(contact => contact.status === 'customer').length;
  
  const pipelineValue = deals
    .filter(deal => !['closed-won', 'closed-lost'].includes(deal.stage))
    .reduce((sum, deal) => sum + deal.value, 0);

  const activeDeals = deals.filter(deal => !['closed-won', 'closed-lost'].includes(deal.stage)).length;

  const metrics = [
    {
      title: 'Total Revenue',
      value: `$${totalRevenue.toLocaleString()}`,
      change: '+12.5%',
      trend: 'up' as const,
      icon: DollarSign,
      color: 'emerald'
    },
    {
      title: 'New Leads',
      value: totalLeads.toString(),
      change: '+8.2%',
      trend: 'up' as const,
      icon: Users,
      color: 'blue'
    },
    {
      title: 'Pipeline Value',
      value: `$${pipelineValue.toLocaleString()}`,
      change: '+15.3%',
      trend: 'up' as const,
      icon: TrendingUp,
      color: 'purple'
    },
    {
      title: 'Active Deals',
      value: activeDeals.toString(),
      change: '+3.1%',
      trend: 'up' as const,
      icon: Target,
      color: 'orange'
    }
  ];

  return (
    <div className="min-h-screen bg-crm-primary flex">
      <CRMSidebar />
      
      <div className="flex-1 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-crm-text-white mb-2">
              Welcome back, {user?.user_metadata?.first_name || 'User'}!
            </h1>
            <p className="text-crm-text-secondary">
              Here's what's happening with your business today
            </p>
          </div>
          
          <div className="flex space-x-4">
            <button
              onClick={() => setActiveView('dashboard')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeView === 'dashboard'
                  ? 'bg-crm-electric text-white'
                  : 'text-crm-text-secondary hover:text-crm-text-white hover:bg-crm-tertiary'
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveView('notifications')}
              className={`px-4 py-2 rounded-lg transition-colors relative ${
                activeView === 'notifications'
                  ? 'bg-crm-electric text-white'
                  : 'text-crm-text-secondary hover:text-crm-text-white hover:bg-crm-tertiary'
              }`}
            >
              <Bell className="w-4 h-4 mr-2 inline" />
              Notifications
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {activeView === 'dashboard' ? (
          <>
            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
              {metrics.map((metric, index) => (
                <MetricsCard key={index} {...metric} />
              ))}
            </div>

            {/* Activity Feed */}
            <div className="crm-card p-6">
              <div className="flex items-center space-x-3 mb-6">
                <Calendar className="w-6 h-6 text-crm-electric" />
                <h2 className="text-xl font-semibold text-crm-text-white">Recent Activity</h2>
              </div>
              <ActivityFeed />
            </div>
          </>
        ) : (
          <NotificationCenter />
        )}
      </div>
    </div>
  );
};

export default Index;
