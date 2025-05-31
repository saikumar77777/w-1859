
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, Target, Users, Calendar } from 'lucide-react';

const DealsAnalytics = () => {
  const pipelineData = [
    { stage: 'Prospecting', deals: 15, value: 750000 },
    { stage: 'Qualification', deals: 8, value: 450000 },
    { stage: 'Proposal', deals: 5, value: 320000 },
    { stage: 'Negotiation', deals: 3, value: 180000 },
    { stage: 'Closed Won', deals: 12, value: 980000 },
    { stage: 'Closed Lost', deals: 7, value: 120000 }
  ];

  const revenueData = [
    { month: 'Jan', revenue: 450000, target: 500000 },
    { month: 'Feb', revenue: 520000, target: 500000 },
    { month: 'Mar', revenue: 380000, target: 500000 },
    { month: 'Apr', revenue: 620000, target: 500000 },
    { month: 'May', revenue: 750000, target: 500000 },
    { month: 'Jun', revenue: 890000, target: 500000 }
  ];

  const dealSourceData = [
    { name: 'Inbound Leads', value: 35, color: '#10b981' },
    { name: 'Referrals', value: 25, color: '#3b82f6' },
    { name: 'Outbound', value: 20, color: '#a78bfa' },
    { name: 'Social Media', value: 12, color: '#fbbf24' },
    { name: 'Events', value: 8, color: '#f87171' }
  ];

  const metrics = [
    {
      title: 'Total Pipeline Value',
      value: '$2.8M',
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
      color: '#10b981'
    },
    {
      title: 'Average Deal Size',
      value: '$58.2K',
      change: '+8.3%',
      trend: 'up',
      icon: Target,
      color: '#3b82f6'
    },
    {
      title: 'Conversion Rate',
      value: '24.8%',
      change: '-2.1%',
      trend: 'down',
      icon: Users,
      color: '#fbbf24'
    },
    {
      title: 'Avg. Sales Cycle',
      value: '34 days',
      change: '-5.2%',
      trend: 'up',
      icon: Calendar,
      color: '#a78bfa'
    }
  ];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="space-y-8">
      {/* Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          const isPositive = metric.trend === 'up';
          const TrendIcon = isPositive ? TrendingUp : TrendingDown;
          
          return (
            <div key={index} className="crm-card p-6">
              <div className="flex items-center justify-between mb-4">
                <div 
                  className="p-3 rounded-lg"
                  style={{ backgroundColor: `${metric.color}20` }}
                >
                  <Icon className="w-6 h-6" style={{ color: metric.color }} />
                </div>
                <div className={`flex items-center text-sm ${
                  isPositive ? 'text-emerald-400' : 'text-red-400'
                }`}>
                  <TrendIcon className="w-4 h-4 mr-1" />
                  {metric.change}
                </div>
              </div>
              
              <div>
                <h3 className="text-crm-text-secondary text-sm font-medium uppercase tracking-wide mb-1">
                  {metric.title}
                </h3>
                <p className="text-2xl font-bold text-crm-text-white">
                  {metric.value}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Pipeline by Stage */}
        <div className="crm-card p-6">
          <h3 className="text-xl font-semibold text-crm-text-white mb-6">
            Pipeline by Stage
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={pipelineData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis 
                dataKey="stage" 
                stroke="#cbd5e1"
                fontSize={12}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis stroke="#cbd5e1" fontSize={12} />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#1e293b',
                  border: '1px solid #334155',
                  borderRadius: '8px',
                  color: '#f8fafc'
                }}
                formatter={(value, name) => [
                  name === 'value' ? formatCurrency(value as number) : value,
                  name === 'value' ? 'Value' : 'Deals'
                ]}
              />
              <Bar dataKey="deals" fill="#3b82f6" name="deals" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue Trend */}
        <div className="crm-card p-6">
          <h3 className="text-xl font-semibold text-crm-text-white mb-6">
            Revenue vs Target
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="month" stroke="#cbd5e1" fontSize={12} />
              <YAxis stroke="#cbd5e1" fontSize={12} />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#1e293b',
                  border: '1px solid #334155',
                  borderRadius: '8px',
                  color: '#f8fafc'
                }}
                formatter={(value) => [formatCurrency(value as number), '']}
              />
              <Line 
                type="monotone" 
                dataKey="revenue" 
                stroke="#10b981" 
                strokeWidth={3}
                dot={{ fill: '#10b981', strokeWidth: 2, r: 6 }}
                name="Revenue"
              />
              <Line 
                type="monotone" 
                dataKey="target" 
                stroke="#fbbf24" 
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ fill: '#fbbf24', strokeWidth: 2, r: 4 }}
                name="Target"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Deal Sources and Pipeline Value */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Deal Sources */}
        <div className="crm-card p-6">
          <h3 className="text-xl font-semibold text-crm-text-white mb-6">
            Deal Sources
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={dealSourceData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {dealSourceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#1e293b',
                  border: '1px solid #334155',
                  borderRadius: '8px',
                  color: '#f8fafc'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Pipeline Value Breakdown */}
        <div className="crm-card p-6">
          <h3 className="text-xl font-semibold text-crm-text-white mb-6">
            Pipeline Value by Stage
          </h3>
          <div className="space-y-4">
            {pipelineData.map((stage, index) => {
              const percentage = (stage.value / 2800000) * 100;
              const stageColors = {
                'Prospecting': '#a78bfa',
                'Qualification': '#22d3ee',
                'Proposal': '#fbbf24',
                'Negotiation': '#fb923c',
                'Closed Won': '#10b981',
                'Closed Lost': '#f87171'
              };
              const color = stageColors[stage.stage as keyof typeof stageColors];
              
              return (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center flex-1">
                    <div 
                      className="w-3 h-3 rounded-full mr-3"
                      style={{ backgroundColor: color }}
                    />
                    <span className="text-crm-text-secondary text-sm">
                      {stage.stage}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-crm-text-white font-medium">
                      {formatCurrency(stage.value)}
                    </span>
                    <div className="w-20 bg-crm-tertiary rounded-full h-2">
                      <div 
                        className="h-2 rounded-full transition-all duration-300"
                        style={{ 
                          backgroundColor: color,
                          width: `${percentage}%`
                        }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DealsAnalytics;
