
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, DollarSign, User, Building, Target, Clock, FileText, Plus } from 'lucide-react';
import CRMSidebar from '../components/CRMSidebar';
import { useDeals } from '@/hooks/useDeals';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const DealDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { deals, updateDeal, loading } = useDeals();
  const { toast } = useToast();
  const [newNote, setNewNote] = useState('');
  const [isAddingNote, setIsAddingNote] = useState(false);

  console.log('DealDetails: Current deal ID from URL:', id);
  console.log('DealDetails: Available deals:', deals);

  const deal = deals.find(d => d.id === id);
  console.log('DealDetails: Found deal:', deal);

  useEffect(() => {
    if (!loading && deals.length > 0 && !deal && id) {
      console.log('Deal not found, redirecting to deals page');
      toast({
        title: "Deal not found",
        description: "The requested deal could not be found.",
        variant: "destructive"
      });
      navigate('/deals');
    }
  }, [deal, loading, deals, id, navigate, toast]);

  if (loading) {
    return (
      <div className="min-h-screen bg-crm-primary flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-crm-electric"></div>
      </div>
    );
  }

  if (!deal) {
    return (
      <div className="min-h-screen bg-crm-primary flex">
        <CRMSidebar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Deal Not Found</h2>
            <p className="text-crm-text-secondary mb-6">The requested deal could not be found.</p>
            <Button 
              onClick={() => navigate('/deals')}
              className="bg-crm-electric hover:bg-blue-600 text-white"
            >
              Back to Deals
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const getPriorityColor = (priority: string) => {
    const colors = {
      critical: 'bg-red-500/20 text-red-400 border-red-500/30',
      high: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
      medium: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
      low: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
    };
    return colors[priority as keyof typeof colors] || colors.medium;
  };

  const getStageColor = (stage: string) => {
    const colors = {
      prospecting: '#a78bfa',
      qualification: '#22d3ee',
      proposal: '#fbbf24',
      negotiation: '#fb923c',
      'closed-won': '#10b981',
      'closed-lost': '#f87171'
    };
    return colors[stage as keyof typeof colors] || '#a78bfa';
  };

  const handleAddNote = async () => {
    if (!newNote.trim()) return;

    const currentNotes = deal.notes || '';
    const timestamp = new Date().toLocaleString();
    const updatedNotes = currentNotes 
      ? `${currentNotes}\n\n[${timestamp}] ${newNote}`
      : `[${timestamp}] ${newNote}`;

    await updateDeal(deal.id, { notes: updatedNotes });
    setNewNote('');
    setIsAddingNote(false);
    
    toast({
      title: "Note added",
      description: "Your note has been added to the deal."
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatNotes = (notes: string) => {
    if (!notes) return [];
    return notes.split('\n\n').filter(note => note.trim());
  };

  return (
    <div className="min-h-screen bg-crm-primary flex">
      <CRMSidebar />
      
      <div className="flex-1 p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/deals')}
              className="border-crm-tertiary text-white hover:bg-crm-tertiary"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Deals
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-white">{deal.name}</h1>
              <p className="text-crm-text-secondary">{deal.company || 'No company specified'}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Badge 
              className={`${getPriorityColor(deal.priority || 'medium')} border`}
            >
              {(deal.priority || 'medium').toUpperCase()}
            </Badge>
            <Badge 
              style={{ 
                backgroundColor: `${getStageColor(deal.stage)}20`,
                color: getStageColor(deal.stage),
                borderColor: `${getStageColor(deal.stage)}30`
              }}
              className="border"
            >
              {deal.stage.replace('-', ' ').toUpperCase()}
            </Badge>
          </div>
        </div>

        {/* Deal Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-crm-secondary border-crm-tertiary">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-crm-text-secondary flex items-center">
                <DollarSign className="w-4 h-4 mr-2" />
                Deal Value
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-white">{formatCurrency(deal.value)}</p>
            </CardContent>
          </Card>

          <Card className="bg-crm-secondary border-crm-tertiary">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-crm-text-secondary flex items-center">
                <Target className="w-4 h-4 mr-2" />
                Probability
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-white">{deal.probability || 50}%</p>
            </CardContent>
          </Card>

          <Card className="bg-crm-secondary border-crm-tertiary">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-crm-text-secondary flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                Days in Stage
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-white">{deal.days_in_stage || 0} days</p>
            </CardContent>
          </Card>

          <Card className="bg-crm-secondary border-crm-tertiary">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-crm-text-secondary flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                Created
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm font-medium text-white">
                {new Date(deal.created_at).toLocaleDateString()}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Notes Section */}
        <Card className="bg-crm-secondary border-crm-tertiary">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-white flex items-center">
                <FileText className="w-5 h-5 mr-2" />
                Deal Notes & History
              </CardTitle>
              <Button
                onClick={() => setIsAddingNote(!isAddingNote)}
                className="bg-crm-electric hover:bg-blue-600 text-white"
                size="sm"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Note
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {isAddingNote && (
              <div className="space-y-3 p-4 bg-crm-tertiary rounded-lg">
                <Textarea
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="Add a note about this deal..."
                  className="bg-crm-primary border-crm-tertiary text-white placeholder:text-gray-400 focus:border-crm-electric focus:ring-1 focus:ring-crm-electric"
                />
                <div className="flex gap-2">
                  <Button
                    onClick={handleAddNote}
                    disabled={!newNote.trim()}
                    className="bg-crm-electric hover:bg-blue-600 text-white"
                    size="sm"
                  >
                    Save Note
                  </Button>
                  <Button
                    onClick={() => {
                      setIsAddingNote(false);
                      setNewNote('');
                    }}
                    variant="outline"
                    className="border-crm-tertiary text-gray-300 hover:text-white hover:bg-crm-tertiary"
                    size="sm"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}

            {deal.notes ? (
              <div className="space-y-3">
                {formatNotes(deal.notes).map((note, index) => (
                  <div key={index} className="p-3 bg-crm-tertiary rounded-lg">
                    <p className="text-white whitespace-pre-wrap">{note}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-400">No notes yet</p>
                <p className="text-sm text-gray-500 mt-2">
                  Add notes to track the progress of this deal
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DealDetails;
