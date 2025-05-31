
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ArrowRight } from 'lucide-react';

interface StageChangeDialogProps {
  isOpen: boolean;
  dealName: string;
  fromStage: string;
  toStage: string;
  onConfirm: (note: string) => void;
  onCancel: () => void;
}

const StageChangeDialog = ({ 
  isOpen, 
  dealName, 
  fromStage, 
  toStage, 
  onConfirm, 
  onCancel 
}: StageChangeDialogProps) => {
  const [note, setNote] = useState('');

  const handleConfirm = () => {
    onConfirm(note);
    setNote('');
  };

  const handleCancel = () => {
    onCancel();
    setNote('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleCancel}>
      <DialogContent className="bg-crm-secondary border-crm-tertiary">
        <DialogHeader>
          <DialogTitle className="text-white">Move Deal to New Stage</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="text-center">
            <p className="text-white font-medium mb-2">"{dealName}"</p>
            <div className="flex items-center justify-center space-x-3 text-sm">
              <span className="px-3 py-1 bg-orange-500/20 text-orange-400 rounded-full">
                {fromStage}
              </span>
              <ArrowRight className="w-4 h-4 text-gray-400" />
              <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full">
                {toStage}
              </span>
            </div>
          </div>

          <div>
            <Label htmlFor="note" className="text-white">
              Add a note about this stage change (optional)
            </Label>
            <Textarea
              id="note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="What happened to move this deal forward?"
              className="bg-crm-tertiary border-crm-tertiary text-white placeholder:text-gray-400 focus:border-crm-electric focus:ring-1 focus:ring-crm-electric mt-2"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              onClick={handleCancel}
              variant="outline"
              className="flex-1 border-crm-tertiary text-gray-300 hover:text-white hover:bg-crm-tertiary"
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirm}
              className="flex-1 bg-crm-electric hover:bg-blue-600 text-white"
            >
              Move Deal
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StageChangeDialog;
