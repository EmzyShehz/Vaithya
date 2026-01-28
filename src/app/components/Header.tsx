import image_7d6b53efc078c0030fa563bc08163619de4a413e from 'figma:asset/7d6b53efc078c0030fa563bc08163619de4a413e.png';
import React from 'react';
import { Bell, User } from 'lucide-react';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import image_f921ee1be3aa73b34b93fb4c58e6184360a04be5 from 'figma:asset/f921ee1be3aa73b34b93fb4c58e6184360a04be5.png';

interface HeaderProps {
  setActiveTab?: (tab: string) => void;
}

export function Header({ setActiveTab }: HeaderProps = {}) {
  // Mock user name - in real app, this would come from auth context
  const userName = "John Doe";
  const userInitial = userName.charAt(0).toUpperCase();

  return (
    <div className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-md mx-auto px-3 py-4 flex items-center justify-between">
        {/* Logo/Brand */}
        <h1 className="flex items-center gap-2 text-xl">
          <ImageWithFallback 
            src={image_7d6b53efc078c0030fa563bc08163619de4a413e}
            alt="ErythroLabs Logo"
            className="h-5 object-contain mix-blend-multiply ml-3"
          />
        </h1>
        
        {/* Right Side Actions */}
        <div className="flex items-center gap-3">
          {/* Notification Bell */}
          <button 
            className="p-2 hover:bg-slate-100 rounded-full transition-colors relative"
            onClick={() => setActiveTab && setActiveTab('notifications')}
          >
            <Bell size={20} className="text-slate-600" />
            {/* Notification Badge */}
            <div className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></div>
          </button>
          
          {/* Profile Picture */}
          <button 
            className="w-8 h-8 rounded-full bg-[#337e51] flex items-center justify-center hover:bg-[#2a6742] transition-colors"
            onClick={() => setActiveTab && setActiveTab('profile')}
          >
            <span className="text-white font-semibold text-sm">{userInitial}</span>
          </button>
        </div>
      </div>
    </div>
  );
}