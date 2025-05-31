
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { useDeals } from '@/hooks/useDeals';
import { useContacts } from '@/hooks/useContacts';
import { TrendingUp, TrendingDown, DollarSign, Target, Users, Calendar } from 'lucide-react';

const DealsAnalytics = () => {
  const { deals } = useDeals();
  const { contacts } = useContacts();

  // Calculate analytics from real data
  const totalDeals = deals.length;
  const totalValue = deals.reduce((sum, deal) => sum + deal.value, 0);
  const wonDeals = deals.filter(deal => deal.stage === 'closed-won');
  const lostDeals = deals.filter(deal => deal.stage === 'closed-lost');
  const wonValue = wonDeals.reduce((sum, deal) => sum + deal.value, 0);
  const winRate = totalDeals > 0 ? (wonDeals.length / totalDeals) * 100 : 0;
  const avgDealValue = totalDeals > 0 ? totalValue / totalDeals : 0;

  // Pipeline data by stage
  const pipelineData = [
    { stage: 'Prospecting', value: deals.filter(d => d.stage === 'prospecting').reduce((sum, d) => sum + d.value, 0), count: deals.filter(d => d.stage === 'prospecting').length },
    { stage: 'Qualification', value: deals.filter(d => d.stage === 'qualification').reduce((sum, d) => sum + d.value, 0), count: deals.filter(d => d.stage === 'qualification').length },
    { stage: 'Proposal', value: deals.filter(d => d.stage === 'proposal').reduce((sum, d) => sum + d.value, 0), count: deals.filter(d => d.stage === 'proposal').length },
    { stage: 'Negotiation', value: deals.filter(d => d.stage === 'negotiation').reduce((sum, d) => sum + d.value, 0), count: deals.filter(d => d.stage === 'negotiation').length },
    { stage: 'Closed Won', value: wonValue, count: wonDeals.length },
    { stage: 'Closed Lost', value: lostDeals.reduce((sum, d) => sum + d.value, 0), count: lostDeals.length }
  ];

  // Deal sources from contact sources
  const dealSources = contacts.reduce((acc, contact) => {
    const source = contact.source || 'Unknown';
    acc[source] = (acc[source] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const sourceData = Object.entries(dealSources).map(([source, count]) => ({
    name: source.charAt(0).toUpperCase() + source.slice(1),
    value: count,
    percentage: ((count / contacts.length) * 100).toFixed(1)
  }));

  // Monthly trend (last 6 months)
  const monthlyData = [];
  for (let i = 5; i >= 0; i--) {
    const date = new Date();
    date.setMonth(date.getMonth() - i);
    const monthYear = date.toLocaleString('default', { month: 'short', year: 'numeric' });
    
    const monthDeals = deals.filter(deal => {
      const dealDate = new Date(deal.created_at);
      return dealDate.getMonth() === date.getMonth() && dealDate.getFullYear() === date.getFullYear();
    });
    
    monthlyData.push({
      month: monthYear,
      deals: monthDeals.length,
      value: monthDeals.reduce((sum, deal) => sum + deal.value, 0)
    });
  }

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <div className="space-y-8">
      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="crm-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-crm-text-secondary text-sm font-medium">Total Pipeline Value</p>
              <p className="text-2xl font-bold text-crm-text-white">{formatCurrency(totalValue)}</p>
            </div>
            <div className="p-3 bg-crm-electric/20 rounded-lg">
              <DollarSign className="w-6 h-6 text-crm-electric" />
            </div>
          </div>
          <div className="flex items-center mt-4 text-sm">
            <TrendingUp className="w-4 h-4 text-emerald-400 mr-1" />
            <span className="text-emerald-400">+12.5%</span>
            <span className="text-crm-text-secondary ml-1">vs last month</span>
          </div>
        </div>

        <div className="crm-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-crm-text-secondary text-sm font-medium">Win Rate</p>
              <p className="text-2xl font-bold text-crm-text-white">{winRate.toFixed(1)}%</p>
            </div>
            <div className="p-3 bg-emerald-500/20 rounded-lg">
              <Target className="w-6 h-6 text-emerald-400" />
            </div>
          </div>
          <div className="flex items-center mt-4 text-sm">
            <TrendingUp className="w-4 h-4 text-emerald-400 mr-1" />
            <span className="text-emerald-400">+3.2%</span>
            <span className="text-crm-text-secondary ml-1">vs last month</span>
          </div>
        </div>

        <div className="crm-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-crm-text-secondary text-sm font-medium">Avg Deal Size</p>
              <p className="text-2xl font-bold text-crm-text-white">{formatCurrency(avgDealValue)}</p>
            </div>
            <div className="p-3 bg-amber-500/20 rounded-lg">
              <Calendar className="w-6 h-6 text-amber-400" />
            </div>
          </div>
          <div className="flex items-center mt-4 text-sm">
            <TrendingDown className="w-4 h-4 text-red-400 mr-1" />
            <span className="text-red-400">-2.1%</span>
            <span className="text-crm-text-secondary ml-1">vs last month</span>
          </div>
        </div>

        <div className="crm-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-crm-text-secondary text-sm font-medium">Active Deals</p>
              <p className="text-2xl font-bold text-crm-text-white">{totalDeals}</p>
            </div>
            <div className="p-3 bg-purple-500/20 rounded-lg">
              <Users className="w-6 h-6 text-purple-400" />
            </div>
          </div>
          <div className="flex items-center mt-4 text-sm">
            <TrendingUp className="w-4 h-4 text-emerald-400 mr-1" />
            <span className="text-emerald-400">+8 deals</span>
            <span className="text-crm-text-secondary ml-1">this month</span>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Pipeline by Stage */}
        <div className="crm-card p-6">
          <h3 className="text-xl font-semibold text-crm-text-white mb-6">Pipeline by Stage</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={pipelineData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="stage" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#F3F4F6'
                }}
                formatter={(value: number, name) => [
                  name === 'value' ? formatCurrency(value) : value,
                  name === 'value' ? 'Value' : 'Count'
                ]}
              />
              <Bar dataKey="value" fill="#3B82F6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Deal Sources */}
        <div className="crm-card p-6">
          <h3 className="text-xl font-semibold text-crm-text-white mb-6">Lead Sources</h3>
          <div className="flex items-center justify-center">
            {sourceData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={sourceData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percentage }) => `${name}: ${percentage}%`}
                  >
                    {sourceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937', 
                      border: '1px solid #374151',
                      borderRadius: '8px',
                      color: '#F3F4F6'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex flex-col items-center justify-center h-[300px] text-crm-text-secondary">
                <Users className="w-16 h-16 mb-4" />
                <p className="text-lg font-medium">No source data available</p>
                <p className="text-sm">Add contacts with source information to see this chart</p>
              </div>
            )}
          </div>
        </div>

        {/* Monthly Trend */}
        <div className="crm-card p-6 lg:col-span-2">
          <h3 className="text-xl font-semibold text-crm-text-white mb-6">Monthly Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="month" stroke="#9CA3AF" />
              <YAxis yAxisId="left" stroke="#9CA3AF" />
              <YAxis yAxisId="right" orientation="right" stroke="#9CA3AF" tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#F3F4F6'
                }}
                formatter={(value: number, name) => [
                  name === 'value' ? formatCurrency(value) : value,
                  name === 'value' ? 'Total Value' : 'Deal Count'
                ]}
              />
              <Line yAxisId="left" type="monotone" dataKey="deals" stroke="#3B82F6" strokeWidth={3} dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }} />
              <Line yAxisId="right" type="monotone" dataKey="value" stroke="#10B981" strokeWidth={3} dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DealsAnalytics;
