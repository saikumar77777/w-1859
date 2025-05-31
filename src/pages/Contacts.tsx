
import React, { useState } from 'react';
import CRMSidebar from '../components/CRMSidebar';
import { Search, Plus, User, Bell, FileText, Circle } from 'lucide-react';
import { useContacts } from '@/hooks/useContacts';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Loader2 } from 'lucide-react';

const Contacts = () => {
  const { contacts, loading, createContact } = useContacts();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newContact, setNewContact] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    company: '',
    position: '',
    status: 'lead' as const,
    notes: ''
  });

  const getStatusConfig = (status: string | null) => {
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
    return configs[status as keyof typeof configs] || configs.lead;
  };

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = searchTerm === '' ||
      contact.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (contact.company && contact.company.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (contact.email && contact.email.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = statusFilter === 'all' || contact.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleCreateContact = async () => {
    if (!newContact.first_name || !newContact.last_name) return;
    
    await createContact(newContact);
    
    setNewContact({
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      company: '',
      position: '',
      status: 'lead',
      notes: ''
    });
    setIsCreateDialogOpen(false);
  };

  const formatLastContact = (createdAt: string) => {
    const date = new Date(createdAt);
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return 'Yesterday';
    if (diffInDays < 7) return `${diffInDays} days ago`;
    return date.toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-crm-primary flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-crm-electric" />
      </div>
    );
  }

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
          
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-crm-electric to-crm-emerald hover:shadow-electric text-white">
                <Plus className="w-5 h-5 mr-2" />
                Add New Contact
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-crm-secondary border-crm-tertiary">
              <DialogHeader>
                <DialogTitle className="text-white">Create New Contact</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-white block mb-2">First Name *</label>
                    <Input
                      value={newContact.first_name}
                      onChange={(e) => setNewContact(prev => ({ ...prev, first_name: e.target.value }))}
                      className="bg-crm-tertiary border-crm-tertiary text-white placeholder:text-gray-400"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-white block mb-2">Last Name *</label>
                    <Input
                      value={newContact.last_name}
                      onChange={(e) => setNewContact(prev => ({ ...prev, last_name: e.target.value }))}
                      className="bg-crm-tertiary border-crm-tertiary text-white placeholder:text-gray-400"
                      placeholder="Doe"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-white block mb-2">Email</label>
                  <Input
                    type="email"
                    value={newContact.email}
                    onChange={(e) => setNewContact(prev => ({ ...prev, email: e.target.value }))}
                    className="bg-crm-tertiary border-crm-tertiary text-white placeholder:text-gray-400"
                    placeholder="john.doe@company.com"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-white block mb-2">Phone</label>
                    <Input
                      value={newContact.phone}
                      onChange={(e) => setNewContact(prev => ({ ...prev, phone: e.target.value }))}
                      className="bg-crm-tertiary border-crm-tertiary text-white placeholder:text-gray-400"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-white block mb-2">Company</label>
                    <Input
                      value={newContact.company}
                      onChange={(e) => setNewContact(prev => ({ ...prev, company: e.target.value }))}
                      className="bg-crm-tertiary border-crm-tertiary text-white placeholder:text-gray-400"
                      placeholder="Company Inc."
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-white block mb-2">Position</label>
                    <Input
                      value={newContact.position}
                      onChange={(e) => setNewContact(prev => ({ ...prev, position: e.target.value }))}
                      className="bg-crm-tertiary border-crm-tertiary text-white placeholder:text-gray-400"
                      placeholder="CEO"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-white block mb-2">Status</label>
                    <Select value={newContact.status} onValueChange={(value: any) => setNewContact(prev => ({ ...prev, status: value }))}>
                      <SelectTrigger className="bg-crm-tertiary border-crm-tertiary text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-crm-tertiary border-crm-tertiary">
                        <SelectItem value="lead" className="text-white hover:bg-crm-secondary">Lead</SelectItem>
                        <SelectItem value="qualified" className="text-white hover:bg-crm-secondary">Qualified</SelectItem>
                        <SelectItem value="opportunity" className="text-white hover:bg-crm-secondary">Opportunity</SelectItem>
                        <SelectItem value="customer" className="text-white hover:bg-crm-secondary">Customer</SelectItem>
                        <SelectItem value="vip" className="text-white hover:bg-crm-secondary">VIP</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-white block mb-2">Notes</label>
                  <Textarea
                    value={newContact.notes}
                    onChange={(e) => setNewContact(prev => ({ ...prev, notes: e.target.value }))}
                    className="bg-crm-tertiary border-crm-tertiary text-white placeholder:text-gray-400"
                    placeholder="Additional notes about this contact..."
                    rows={3}
                  />
                </div>
                <Button onClick={handleCreateContact} className="w-full bg-crm-electric hover:bg-crm-electric/90 text-white">
                  Create Contact
                </Button>
              </div>
            </DialogContent>
          </Dialog>
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
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48 bg-crm-tertiary border-crm-tertiary text-white">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent className="bg-crm-tertiary border-crm-tertiary">
                <SelectItem value="all" className="text-white hover:bg-crm-secondary">All Statuses</SelectItem>
                <SelectItem value="lead" className="text-white hover:bg-crm-secondary">New Lead</SelectItem>
                <SelectItem value="qualified" className="text-white hover:bg-crm-secondary">Qualified</SelectItem>
                <SelectItem value="opportunity" className="text-white hover:bg-crm-secondary">Opportunity</SelectItem>
                <SelectItem value="customer" className="text-white hover:bg-crm-secondary">Customer</SelectItem>
                <SelectItem value="vip" className="text-white hover:bg-crm-secondary">VIP</SelectItem>
                <SelectItem value="inactive" className="text-white hover:bg-crm-secondary">Inactive</SelectItem>
              </SelectContent>
            </Select>
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
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 ${
                      isVIP ? 'bg-gradient-to-br from-crm-status-vip to-yellow-500' : 'bg-gradient-to-br from-crm-electric to-crm-emerald'
                    }`}>
                      <span className="text-white font-semibold">
                        {contact.first_name[0]}{contact.last_name[0]}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-crm-text-white">{contact.first_name} {contact.last_name}</h3>
                      <p className="text-sm text-crm-text-secondary">{contact.position || 'No position'}</p>
                    </div>
                  </div>
                  <span className={`status-badge border ${statusConfig.className}`}>
                    {statusConfig.label}
                  </span>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-crm-text-secondary">
                    <Circle className="w-4 h-4 mr-2" />
                    {contact.company || 'No company'}
                  </div>
                  <div className="flex items-center text-sm text-crm-text-secondary">
                    <FileText className="w-4 h-4 mr-2" />
                    {contact.email || 'No email'}
                  </div>
                  <div className="flex items-center text-sm text-crm-text-secondary">
                    <Bell className="w-4 h-4 mr-2" />
                    {contact.phone || 'No phone'}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-crm-tertiary">
                  <div>
                    <p className="text-xs text-crm-text-secondary">Last Contact</p>
                    <p className="text-sm text-crm-text-secondary">{formatLastContact(contact.created_at)}</p>
                  </div>
                </div>

                {contact.notes && (
                  <div className="mt-4 pt-4 border-t border-crm-tertiary">
                    <p className="text-xs text-crm-text-secondary mb-1">Notes</p>
                    <p className="text-sm text-crm-text-secondary line-clamp-2">{contact.notes}</p>
                  </div>
                )}

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
            <p className="text-crm-text-secondary">
              {searchTerm || statusFilter !== 'all' 
                ? 'Try adjusting your search criteria or filters.' 
                : 'Get started by adding your first contact.'}
            </p>
            {!searchTerm && statusFilter === 'all' && (
              <Button 
                onClick={() => setIsCreateDialogOpen(true)}
                className="mt-4 bg-crm-electric hover:bg-blue-600 text-white"
              >
                Add Your First Contact
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Contacts;
