
import React from 'react';
import CRMSidebar from '../components/CRMSidebar';
import MetricsCard from '../components/MetricsCard';
import ContactTable from '../components/ContactTable';
import ActivityFeed from '../components/ActivityFeed';
import { User, FileText, Circle, Bell } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-crm-primary flex">
      <CRMSidebar />
      
      <div className="flex-1 p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-crm-text-white mb-2">
            Dashboard Overview
          </h1>
          <p className="text-crm-text-secondary">
            Welcome back! Here's what's happening with your business today.
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricsCard
            title="Total Contacts"
            value="2,847"
            subValue="+12.5%"
            accentColor="#3b82f6"
            icon={<User className="w-6 h-6 text-crm-electric" />}
            trend="up"
            trendValue="12.5%"
          />
          
          <MetricsCard
            title="Active Deals"
            value="127"
            subValue="$1.2M Value"
            gradient="linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)"
            icon={<FileText className="w-6 h-6 text-white" />}
            trend="up"
            trendValue="8.3%"
          />
          
          <MetricsCard
            title="Monthly Revenue"
            value="$284.7K"
            subValue="Target: $300K"
            gradient="linear-gradient(135deg, #065f46 0%, #10b981 100%)"
            icon={<Circle className="w-6 h-6 text-white" />}
            trend="up"
            trendValue="15.2%"
          />
          
          <MetricsCard
            title="Conversion Rate"
            value="24.8%"
            subValue="Industry Avg: 18%"
            accentColor="#10b981"
            icon={<Bell className="w-6 h-6 text-crm-emerald" />}
            trend="up"
            trendValue="3.1%"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Table - Takes up 2 columns */}
          <div className="lg:col-span-2">
            <ContactTable />
          </div>
          
          {/* Activity Feed - Takes up 1 column */}
          <div className="lg:col-span-1">
            <ActivityFeed />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
