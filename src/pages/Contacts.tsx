
import React, { useState } from 'react';
import CRMSidebar from '../components/CRMSidebar';
import { Search, Plus, User, Bell, FileText, Circle } from 'lucide-react';

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  position: string;
  status: 'lead' | 'qualified' | 'opportunity' | 'customer' | 'vip' | 'inactive';
  lastContact: string;
  value: string;
  notes: string;
}

const Contacts = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  const contacts: Contact[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@techcorp.com',
      phone: '+1 (555) 123-4567',
      company: 'TechCorp Inc.',
      position: 'CTO',
      status: 'vip',
      lastContact: '2 hours ago',
      value: '$45,000',
      notes: 'Key decision maker for enterprise solutions. Very interested in our premium package.'
    },
    {
      id: '2',
      name: 'Michael Chen',
      email: 'm.chen@startup.io',
      phone: '+1 (555) 234-5678',
      company: 'StartupIO',
      position: 'Founder',
      status: 'qualified',
      lastContact: '1 day ago',
      value: '$12,500',
      notes: 'Fast-growing startup, needs scalable solution. Budget approved for Q4.'
    },
    {
      id: '3',
      name: 'Emily Rodriguez',
      email: 'emily@designstudio.com',
      phone: '+1 (555) 345-6789',
      company: 'Design Studio',
      position: 'Creative Director',
      status: 'opportunity',
      lastContact: '3 days ago',
      value: '$8,750',
      notes: 'Interested in design tools integration. Follow up on demo feedback.'
    },
    // Add more contacts as needed
  ];

  const getStatusConfig = (status: Contact['status']) => {
    const configs = {
      lead: { 
        label: 'New Lead', 
        className: 'bg-crm-status-lead/20 text-crm-status-lead border-crm-status-lead/50',
        leftBorder: 'border-l-crm-status-lead'
      },
      qualified: { 
        label: 'Qualified', 
        className: 'bg-crm-status-qualified/20 text-crm-status-qualified border-crm-status-qualified/50',
        leftBorder: 'border-l-crm-status-qualified'
      },
      opportunity: { 
        label: 'Opportunity', 
        className: 'bg-crm-status-opportunity/20 text-crm-status-opportunity border-crm-status-opportunity/50',
        leftBorder: 'border-l-crm-status-opportunity'
      },
      customer: { 
        label: 'Active Customer', 
        className: 'bg-crm-status-customer/20 text-crm-status-customer border-crm-status-customer/50',
        leftBorder: 'border-l-crm-status-customer'
      },
      vip: { 
        label: 'VIP Customer', 
        className: 'bg-gradient-to-r from-crm-status-vip/30 to-yellow-500/30 text-crm-status-vip border-crm-status-vip/50',
        leftBorder: 'border-l-crm-status-vip'
      },
      inactive: { 
        label: 'Inactive', 
        className: 'bg-crm-status-inactive/20 text-crm-status-inactive border-crm-status-inactive/50',
        leftBorder: 'border-l-crm-status-inactive'
      }
    };
    return configs[status];
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-crm-primary flex">
      <CRMSidebar />
      
      <div className="flex-1 p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-semibold text-crm-text-white mb-2">
              Contact Management
            </h1>
            <p className="text-crm-text-secondary">
              Manage your customer relationships and track interactions
            </p>
          </div>
          <button className="bg-gradient-to-r from-crm-electric to-crm-emerald hover:shadow-electric text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center">
            <Plus className="w-5 h-5 mr-2" />
            Add New Contact
          </button>
        </div>

        {/* Search and Filters */}
        <div className="crm-card p-6 mb-8">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-crm-text-secondary" />
              <input
                type="text"
                placeholder="Search contacts by name, company, or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-crm-tertiary border border-crm-tertiary rounded-lg pl-10 pr-4 py-3 text-crm-text-primary placeholder-crm-text-secondary focus:outline-none focus:ring-2 focus:ring-crm-electric/50 focus:border-crm-electric transition-all duration-200"
              />
            </div>
            <select className="bg-crm-tertiary border border-crm-tertiary rounded-lg px-4 py-3 text-crm-text-primary focus:outline-none focus:ring-2 focus:ring-crm-electric/50">
              <option>All Statuses</option>
              <option>New Lead</option>
              <option>Qualified</option>
              <option>Opportunity</option>
              <option>Customer</option>
              <option>VIP</option>
              <option>Inactive</option>
            </select>
          </div>
        </div>

        {/* Contacts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredContacts.map((contact) => {
            const statusConfig = getStatusConfig(contact.status);
            const isVIP = contact.status === 'vip';
            
            return (
              <div
                key={contact.id}
                className={`crm-card crm-card-hover p-6 cursor-pointer border-l-4 ${statusConfig.leftBorder} ${
                  isVIP ? 'bg-gradient-to-br from-crm-secondary to-amber-900/20' : ''
                }`}
                onClick={() => setSelectedContact(contact)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 ${
                      isVIP ? 'bg-gradient-to-br from-crm-status-vip to-yellow-500' : 'bg-gradient-to-br from-crm-electric to-crm-emerald'
                    }`}>
                      <span className="text-white font-semibold">
                        {contact.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-crm-text-white">{contact.name}</h3>
                      <p className="text-sm text-crm-text-secondary">{contact.position}</p>
                    </div>
                  </div>
                  <span className={`status-badge border ${statusConfig.className}`}>
                    {statusConfig.label}
                  </span>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-crm-text-secondary">
                    <Circle className="w-4 h-4 mr-2" />
                    {contact.company}
                  </div>
                  <div className="flex items-center text-sm text-crm-text-secondary">
                    <FileText className="w-4 h-4 mr-2" />
                    {contact.email}
                  </div>
                  <div className="flex items-center text-sm text-crm-text-secondary">
                    <Bell className="w-4 h-4 mr-2" />
                    {contact.phone}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-crm-tertiary">
                  <div>
                    <p className="text-xs text-crm-text-secondary">Deal Value</p>
                    <p className="font-semibold text-crm-text-white">{contact.value}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-crm-text-secondary">Last Contact</p>
                    <p className="text-sm text-crm-text-secondary">{contact.lastContact}</p>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-crm-tertiary">
                  <p className="text-xs text-crm-text-secondary mb-1">Notes</p>
                  <p className="text-sm text-crm-text-secondary line-clamp-2">{contact.notes}</p>
                </div>

                <div className="mt-4 flex space-x-2">
                  <button className="flex-1 bg-crm-electric hover:bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200">
                    Contact
                  </button>
                  <button className="bg-crm-tertiary hover:bg-crm-text-secondary text-crm-text-primary py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200">
                    Edit
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {filteredContacts.length === 0 && (
          <div className="text-center py-12">
            <User className="w-16 h-16 text-crm-text-secondary mx-auto mb-4" />
            <h3 className="text-xl font-medium text-crm-text-white mb-2">No contacts found</h3>
            <p className="text-crm-text-secondary">Try adjusting your search criteria or add a new contact.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Contacts;
