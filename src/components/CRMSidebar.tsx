
import React from 'react';
import { NavLink } from 'react-router-dom';
import { User, FileText, Circle, Bell, BarChart3 } from 'lucide-react';

const CRMSidebar = () => {
  const menuItems = [
    { icon: Circle, label: 'Dashboard', path: '/' },
    { icon: User, label: 'Contacts', path: '/contacts' },
    { icon: FileText, label: 'Deals', path: '/deals' },
    { icon: BarChart3, label: 'Analytics', path: '/deals-analytics' },
    { icon: Bell, label: 'Notifications', path: '/notifications' },
  ];

  return (
    <div className="w-64 bg-crm-secondary h-screen border-r border-crm-tertiary p-4 flex flex-col">
      <div className="mb-8">
        <h1 className="text-xl font-semibold text-white mb-2">CRM Pro</h1>
        <div className="w-12 h-1 bg-gradient-to-r from-crm-electric to-crm-emerald rounded-full"></div>
      </div>
      
      <nav className="space-y-2 flex-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center px-4 py-3 text-gray-300 hover:text-white hover:bg-crm-tertiary transition-all duration-200 rounded-lg ${
                  isActive ? 'bg-crm-electric text-white' : ''
                }`
              }
            >
              <Icon className="w-5 h-5 mr-3" />
              <span className="font-medium">{item.label}</span>
            </NavLink>
          );
        })}
      </nav>
      
      <div className="mt-auto">
        <div className="bg-gradient-to-r from-crm-electric/20 to-crm-emerald/20 rounded-lg p-4 border border-crm-electric/30">
          <h3 className="text-sm font-medium text-white mb-2">Upgrade to Pro</h3>
          <p className="text-xs text-gray-400 mb-3">Unlock advanced features</p>
          <button className="w-full bg-gradient-to-r from-crm-electric to-crm-emerald text-white py-2 px-4 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
            Upgrade Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default CRMSidebar;
