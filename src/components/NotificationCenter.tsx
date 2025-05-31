
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNotifications } from '@/hooks/useNotifications';
import { Bell, Check, CheckCheck, Search, Filter, AlertCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { formatDistanceToNow } from 'date-fns';

const NotificationCenter = () => {
  const { notifications, loading, unreadCount, markAsRead, markAllAsRead } = useNotifications();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterRead, setFilterRead] = useState('all');

  const filteredNotifications = notifications.filter(notification => {
    const matchesSearch = notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notification.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || notification.type === filterType;
    const matchesRead = filterRead === 'all' || 
                       (filterRead === 'read' && notification.is_read) ||
                       (filterRead === 'unread' && !notification.is_read);
    return matchesSearch && matchesType && matchesRead;
  });

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success': return '✅';
      case 'warning': return '⚠️';
      case 'error': return '❌';
      default: return 'ℹ️';
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'success': return 'border-crm-emerald';
      case 'warning': return 'border-yellow-500';
      case 'error': return 'border-red-500';
      default: return 'border-crm-electric';
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-crm-secondary h-20 rounded-lg animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <Bell className="w-6 h-6 text-crm-electric" />
          <h2 className="text-2xl font-bold text-white">Notifications</h2>
          {unreadCount > 0 && (
            <Badge className="bg-red-500 text-white">
              {unreadCount}
            </Badge>
          )}
        </div>
        
        {unreadCount > 0 && (
          <Button
            onClick={markAllAsRead}
            variant="outline"
            size="sm"
            className="border-crm-tertiary text-crm-text-secondary hover:text-white hover:bg-crm-tertiary"
          >
            <CheckCheck className="w-4 h-4 mr-2" />
            Mark All Read
          </Button>
        )}
      </div>

      {/* Search and Filters */}
      <div className="flex space-x-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-crm-text-secondary" />
          <Input
            placeholder="Search notifications..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-crm-secondary border-crm-tertiary text-white placeholder:text-gray-400 pl-10 focus:border-crm-electric focus:ring-1 focus:ring-crm-electric"
          />
        </div>
        
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-32 bg-crm-secondary border-crm-tertiary text-white">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent className="bg-crm-tertiary border-crm-tertiary">
            <SelectItem value="all" className="text-white hover:bg-crm-secondary">All Types</SelectItem>
            <SelectItem value="info" className="text-white hover:bg-crm-secondary">Info</SelectItem>
            <SelectItem value="success" className="text-white hover:bg-crm-secondary">Success</SelectItem>
            <SelectItem value="warning" className="text-white hover:bg-crm-secondary">Warning</SelectItem>
            <SelectItem value="error" className="text-white hover:bg-crm-secondary">Error</SelectItem>
          </SelectContent>
        </Select>

        <Select value={filterRead} onValueChange={setFilterRead}>
          <SelectTrigger className="w-32 bg-crm-secondary border-crm-tertiary text-white">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent className="bg-crm-tertiary border-crm-tertiary">
            <SelectItem value="all" className="text-white hover:bg-crm-secondary">All</SelectItem>
            <SelectItem value="unread" className="text-white hover:bg-crm-secondary">Unread</SelectItem>
            <SelectItem value="read" className="text-white hover:bg-crm-secondary">Read</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filteredNotifications.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-crm-secondary rounded-full flex items-center justify-center mx-auto mb-4">
              <Bell className="w-10 h-10 text-crm-text-secondary" />
            </div>
            <h3 className="text-lg font-medium text-white mb-2">No notifications found</h3>
            <p className="text-crm-text-secondary">
              {notifications.length === 0 
                ? "You don't have any notifications yet" 
                : "Try adjusting your search or filters"
              }
            </p>
          </div>
        ) : (
          filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`bg-crm-secondary border border-crm-tertiary rounded-lg p-4 border-l-4 ${getNotificationColor(notification.type)} ${
                !notification.is_read ? 'bg-crm-tertiary/30' : ''
              } hover:bg-crm-tertiary/20 transition-all duration-300 cursor-pointer`}
              onClick={() => !notification.is_read && markAsRead(notification.id)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="text-lg">{getNotificationIcon(notification.type)}</span>
                    <h3 className={`font-semibold ${
                      !notification.is_read ? 'text-white' : 'text-crm-text-secondary'
                    }`}>
                      {notification.title}
                    </h3>
                    {!notification.is_read && (
                      <div className="w-2 h-2 bg-crm-electric rounded-full animate-pulse" />
                    )}
                  </div>
                  <p className="text-crm-text-secondary text-sm mb-3 leading-relaxed">
                    {notification.message}
                  </p>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-crm-text-secondary">
                      {formatDistanceToNow(new Date(notification.created_at), { addSuffix: true })}
                    </p>
                    {notification.action_url && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-crm-electric hover:text-blue-400 text-xs"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(notification.action_url, '_blank');
                        }}
                      >
                        View Details
                      </Button>
                    )}
                  </div>
                </div>
                
                {!notification.is_read && (
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      markAsRead(notification.id);
                    }}
                    variant="ghost"
                    size="sm"
                    className="text-crm-text-secondary hover:text-white ml-4"
                  >
                    <Check className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Empty state for when there are no notifications at all */}
      {notifications.length === 0 && !loading && (
        <div className="text-center py-16">
          <div className="w-24 h-24 bg-crm-secondary rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-12 h-12 text-crm-text-secondary" />
          </div>
          <h3 className="text-xl font-medium text-white mb-3">All caught up!</h3>
          <p className="text-crm-text-secondary mb-6 max-w-md mx-auto">
            You don't have any notifications right now. We'll notify you when there's something important to see.
          </p>
          <Button
            onClick={() => window.location.reload()}
            variant="outline"
            className="border-crm-electric text-crm-electric hover:bg-crm-electric hover:text-white"
          >
            Refresh
          </Button>
        </div>
      )}
    </div>
  );
};

export default NotificationCenter;
