
import React from 'react';
import { Circle, User, Bell, FileText } from 'lucide-react';

interface Activity {
  id: string;
  type: 'call' | 'email' | 'meeting' | 'note';
  description: string;
  contact: string;
  timestamp: string;
  priority: 'low' | 'medium' | 'high';
}

const ActivityFeed = () => {
  const activities: Activity[] = [
    {
      id: '1',
      type: 'call',
      description: 'Scheduled follow-up call with Sarah Johnson',
      contact: 'Sarah Johnson',
      timestamp: '2 hours ago',
      priority: 'high'
    },
    {
      id: '2',
      type: 'email',
      description: 'Sent proposal to Michael Chen',
      contact: 'Michael Chen',
      timestamp: '4 hours ago',
      priority: 'medium'
    },
    {
      id: '3',
      type: 'meeting',
      description: 'Demo completed with Emily Rodriguez',
      contact: 'Emily Rodriguez',
      timestamp: '6 hours ago',
      priority: 'high'
    },
    {
      id: '4',
      type: 'note',
      description: 'Added notes from discovery call',
      contact: 'David Park',
      timestamp: '1 day ago',
      priority: 'low'
    }
  ];

  const getActivityIcon = (type: Activity['type']) => {
    const icons = {
      call: Bell,
      email: FileText,
      meeting: User,
      note: Circle
    };
    return icons[type];
  };

  const getPriorityColor = (priority: Activity['priority']) => {
    const colors = {
      high: 'border-red-500 bg-red-500/10',
      medium: 'border-crm-status-opportunity bg-crm-status-opportunity/10',
      low: 'border-crm-text-secondary bg-crm-text-secondary/10'
    };
    return colors[priority];
  };

  return (
    <div className="crm-card p-6">
      <h2 className="text-xl font-semibold text-crm-text-white mb-6">Recent Activity</h2>
      
      <div className="space-y-4">
        {activities.map((activity) => {
          const Icon = getActivityIcon(activity.type);
          const priorityColor = getPriorityColor(activity.priority);
          
          return (
            <div 
              key={activity.id}
              className="flex items-start space-x-4 p-4 rounded-lg bg-crm-tertiary/30 hover:bg-crm-tertiary/50 transition-all duration-200 animate-fade-in-up"
            >
              <div className={`p-2 rounded-full ${priorityColor} border`}>
                <Icon className="w-4 h-4" />
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="text-crm-text-white font-medium mb-1">
                  {activity.description}
                </p>
                <div className="flex items-center space-x-2 text-sm text-crm-text-secondary">
                  <span>Contact: {activity.contact}</span>
                  <span>•</span>
                  <span>{activity.timestamp}</span>
                </div>
              </div>
              
              <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                activity.priority === 'high' ? 'bg-red-500/20 text-red-400' :
                activity.priority === 'medium' ? 'bg-crm-status-opportunity/20 text-crm-status-opportunity' :
                'bg-crm-text-secondary/20 text-crm-text-secondary'
              }`}>
                {activity.priority}
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-6 text-center">
        <button className="text-crm-electric hover:text-blue-400 font-medium transition-colors duration-200">
          View All Activity →
        </button>
      </div>
    </div>
  );
};

export default ActivityFeed;
