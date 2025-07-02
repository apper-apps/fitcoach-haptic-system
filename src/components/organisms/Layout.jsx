import React from 'react';
import { Outlet } from 'react-router-dom';
import BottomNavigation from '@/components/molecules/BottomNavigation';
import Header from '@/components/organisms/Header';
import FloatingActionButton from '@/components/atoms/FloatingActionButton';

const Layout = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      
      <main className="flex-1 pb-20 pt-16 overflow-hidden">
        <Outlet />
      </main>
      
      <BottomNavigation />
      <FloatingActionButton />
    </div>
  );
};

export default Layout;