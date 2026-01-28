import React from 'react';
import { House, Activity, BookOpen, MessageCircle } from 'lucide-react';

interface BottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function BottomNav({ activeTab, setActiveTab }: BottomNavProps) {
  const navItems = [
    { id: 'home', label: 'Home', icon: House },
    { id: 'history', label: 'Results', icon: Activity },
    { id: 'knowledge', label: 'Learn', icon: BookOpen },
    { id: 'coaching', label: 'Coach', icon: MessageCircle },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 safe-area-bottom shadow-lg z-50">
      <div className="max-w-md mx-auto px-4 py-2">
        <div className="flex items-center justify-around">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className="flex flex-col items-center gap-1 py-2 px-4 rounded-xl transition-all"
              >
                <div className={`p-2 rounded-xl transition-colors ${
                  isActive 
                    ? 'bg-[#337e51]' 
                    : 'bg-transparent'
                }`}>
                  <Icon 
                    size={22} 
                    className={isActive ? 'text-white' : 'text-slate-400'}
                    strokeWidth={isActive ? 2.5 : 2}
                  />
                </div>
                <span className={`text-xs transition-colors ${
                  isActive ? 'text-slate-900 font-medium' : 'text-slate-400'
                }`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}