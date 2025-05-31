
import React from 'react';
import { Clock, Mail, Phone, Calendar, AlertTriangle, User } from 'lucide-react';

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

interface DealCardProps {
  deal: Deal;
  stageColor: string;
}

const DealCard: React.FC<DealCardProps> = ({ deal, stageColor }) => {
  const getPriorityConfig = (priority: Deal['priority']) => {
    const configs = {
      critical: {
        color: '#f87171',
        bgColor: 'bg-red-500/20',
        textColor: 'text-red-400',
        glowClass: 'animate-pulse shadow-red-500/30',
        label: 'Critical'
      },
      high: {
        color: '#fb923c',
        bgColor: 'bg-orange-500/20',
        textColor: 'text-orange-400',
        glowClass: '',
        label: 'High'
      },
      medium: {
        color: '#fbbf24',
        bgColor: 'bg-amber-500/20',
        textColor: 'text-amber-400',
        glowClass: '',
        label: 'Medium'
      },
      low: {
        color: '#34d399',
        bgColor: 'bg-emerald-500/20',
        textColor: 'text-emerald-400',
        glowClass: '',
        label: 'Low'
      }
    };
    return configs[priority];
  };

  const getActivityIcon = (type: string) => {
    const icons = {
      email: <Mail className="w-3 h-3 text-blue-400" />,
      call: <Phone className="w-3 h-3 text-emerald-400" />,
      meeting: <Calendar className="w-3 h-3 text-purple-400" />,
      followup: <AlertTriangle className="w-3 h-3 text-amber-400" />,
      overdue: <AlertTriangle className="w-3 h-3 text-red-400 animate-pulse" />
    };
    return icons[type as keyof typeof icons] || <User className="w-3 h-3" />;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const priorityConfig = getPriorityConfig(deal.priority);
  const isOverdue = deal.daysInStage > 10 || deal.activities.some(a => a.type === 'overdue');

  return (
    <div 
      className={`crm-card crm-card-hover p-4 border-l-4 cursor-pointer ${
        priorityConfig.glowClass
      } ${isOverdue ? 'border-red-500 bg-gradient-to-r from-crm-secondary to-red-900/20' : ''}`}
      style={{ borderLeftColor: stageColor }}
    >
      {/* Priority Badge */}
      <div className="flex items-center justify-between mb-3">
        <span 
          className={`px-2 py-1 rounded-full text-xs font-medium uppercase tracking-wide ${priorityConfig.bgColor} ${priorityConfig.textColor}`}
        >
          {priorityConfig.label}
        </span>
        {isOverdue && (
          <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-500/20 text-red-400 animate-pulse">
            Overdue
          </span>
        )}
      </div>

      {/* Deal Info */}
      <div className="mb-4">
        <h4 className="font-medium text-crm-text-white mb-1 line-clamp-2">
          {deal.name}
        </h4>
        <p className="text-sm text-crm-text-secondary">{deal.company}</p>
      </div>

      {/* Value */}
      <div className="mb-4">
        <p className="font-mono text-lg font-bold text-crm-text-white">
          {formatCurrency(deal.value)}
        </p>
      </div>

      {/* Activities */}
      <div className="mb-4">
        <div className="flex items-center space-x-3">
          {deal.activities.map((activity, index) => (
            <div key={index} className="flex items-center space-x-1">
              {getActivityIcon(activity.type)}
              <span className="text-xs text-crm-text-secondary">
                {activity.count}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Time in Stage & Last Activity */}
      <div className="flex items-center justify-between text-xs text-crm-text-secondary">
        <div className="flex items-center">
          <Clock className="w-3 h-3 mr-1" />
          <span>{deal.daysInStage}d in stage</span>
        </div>
        <span>{deal.lastActivity}</span>
      </div>

      {/* Progress Indicator */}
      <div className="mt-3 pt-3 border-t border-crm-tertiary">
        <div className="w-full bg-crm-tertiary rounded-full h-1">
          <div 
            className="h-1 rounded-full transition-all duration-300"
            style={{ 
              backgroundColor: stageColor,
              width: `${Math.min(100, (deal.activities.length * 20))}%`
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default DealCard;
