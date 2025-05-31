
import React from 'react';
import { Helmet } from 'react-helmet-async';
import CRMSidebar from '@/components/CRMSidebar';
import NotificationCenter from '@/components/NotificationCenter';

const Notifications = () => {
  return (
    <>
      <Helmet>
        <title>Notifications - CRM Pro</title>
      </Helmet>
      <div className="min-h-screen bg-crm-primary flex">
        <CRMSidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <main className="flex-1 overflow-auto p-6">
            <div className="max-w-6xl mx-auto">
              <NotificationCenter />
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Notifications;
