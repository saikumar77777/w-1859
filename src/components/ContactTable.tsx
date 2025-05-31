
import React from 'react';
import { User, Bell, Circle, Search } from 'lucide-react';

interface Contact {
  id: string;
  name: string;
  email: string;
  company: string;
  status: 'lead' | 'qualified' | 'opportunity' | 'customer' | 'vip' | 'inactive';
  lastContact: string;
  value: string;
}

const ContactTable = () => {
  const contacts: Contact[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@techcorp.com',
      company: 'TechCorp Inc.',
      status: 'vip',
      lastContact: '2 hours ago',
      value: '$45,000'
    },
    {
      id: '2',
      name: 'Michael Chen',
      email: 'm.chen@startup.io',
      company: 'StartupIO',
      status: 'qualified',
      lastContact: '1 day ago',
      value: '$12,500'
    },
    {
      id: '3',
      name: 'Emily Rodriguez',
      email: 'emily@designstudio.com',
      company: 'Design Studio',
      status: 'opportunity',
      lastContact: '3 days ago',
      value: '$8,750'
    },
    {
      id: '4',
      name: 'David Park',
      email: 'david.park@enterprise.com',
      company: 'Enterprise Solutions',
      status: 'customer',
      lastContact: '1 week ago',
      value: '$25,000'
    },
    {
      id: '5',
      name: 'Lisa Thompson',
      email: 'lisa.t@consulting.biz',
      company: 'Consulting Biz',
      status: 'lead',
      lastContact: '2 weeks ago',
      value: '$5,200'
    }
  ];

  const getStatusConfig = (status: Contact['status']) => {
    const configs = {
      lead: { 
        label: 'New Lead', 
        className: 'bg-crm-status-lead/20 text-crm-status-lead border-crm-status-lead/50',
        glow: 'shadow-purple'
      },
      qualified: { 
        label: 'Qualified', 
        className: 'bg-crm-status-qualified/20 text-crm-status-qualified border-crm-status-qualified/50',
        glow: ''
      },
      opportunity: { 
        label: 'Opportunity', 
        className: 'bg-crm-status-opportunity/20 text-crm-status-opportunity border-crm-status-opportunity/50',
        glow: ''
      },
      customer: { 
        label: 'Active Customer', 
        className: 'bg-crm-status-customer/20 text-crm-status-customer border-crm-status-customer/50',
        glow: 'shadow-emerald'
      },
      vip: { 
        label: 'VIP Customer', 
        className: 'bg-gradient-to-r from-crm-status-vip/30 to-yellow-500/30 text-crm-status-vip border-crm-status-vip/50',
        glow: 'shadow-electric'
      },
      inactive: { 
        label: 'Inactive', 
        className: 'bg-crm-status-inactive/20 text-crm-status-inactive border-crm-status-inactive/50',
        glow: ''
      }
    };
    return configs[status];
  };

  return (
    <div className="crm-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-crm-text-white">Recent Contacts</h2>
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-crm-text-secondary" />
            <input
              type="text"
              placeholder="Search contacts..."
              className="bg-crm-tertiary border border-crm-tertiary rounded-lg pl-10 pr-4 py-2 text-crm-text-primary placeholder-crm-text-secondary focus:outline-none focus:ring-2 focus:ring-crm-electric/50 focus:border-crm-electric transition-all duration-200"
            />
          </div>
          <button className="bg-crm-electric hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:shadow-electric">
            Add Contact
          </button>
        </div>
      </div>

      <div className="overflow-hidden rounded-lg border border-crm-tertiary">
        <table className="w-full">
          <thead className="bg-crm-tertiary">
            <tr>
              <th className="text-left py-4 px-6 text-crm-text-primary font-medium">Contact</th>
              <th className="text-left py-4 px-6 text-crm-text-primary font-medium">Company</th>
              <th className="text-left py-4 px-6 text-crm-text-primary font-medium">Status</th>
              <th className="text-left py-4 px-6 text-crm-text-primary font-medium">Last Contact</th>
              <th className="text-left py-4 px-6 text-crm-text-primary font-medium">Value</th>
              <th className="text-left py-4 px-6 text-crm-text-primary font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact, index) => {
              const statusConfig = getStatusConfig(contact.status);
              const isEven = index % 2 === 0;
              
              return (
                <tr 
                  key={contact.id}
                  className={`transition-all duration-200 hover:bg-crm-tertiary/50 ${
                    isEven ? 'bg-crm-secondary' : 'bg-slate-800/50'
                  } ${contact.status === 'vip' ? 'bg-gradient-to-r from-crm-secondary to-amber-900/20' : ''}`}
                >
                  <td className="py-4 px-6">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-br from-crm-electric to-crm-emerald rounded-full flex items-center justify-center mr-3">
                        <span className="text-white font-medium text-sm">
                          {contact.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <div className="font-medium text-crm-text-white">{contact.name}</div>
                        <div className="text-sm text-crm-text-secondary">{contact.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-crm-text-secondary">{contact.company}</td>
                  <td className="py-4 px-6">
                    <span className={`status-badge border ${statusConfig.className} ${statusConfig.glow}`}>
                      {statusConfig.label}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-crm-text-secondary">{contact.lastContact}</td>
                  <td className="py-4 px-6 font-medium text-crm-text-white">{contact.value}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      <button className="p-2 hover:bg-crm-tertiary rounded-lg transition-all duration-200 text-crm-text-secondary hover:text-crm-text-white">
                        <User className="w-4 h-4" />
                      </button>
                      <button className="p-2 hover:bg-crm-tertiary rounded-lg transition-all duration-200 text-crm-text-secondary hover:text-crm-text-white">
                        <Bell className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContactTable;
