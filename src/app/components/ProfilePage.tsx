import React from 'react';
import { ArrowLeft, Edit, BookOpen, Instagram, MessageCircle, Crown, Star, Shield, FileText, RotateCcw, Gift, LogOut, ChevronRight, X } from 'lucide-react';
import { PWAStatus } from './PWAStatus';

interface ProfilePageProps {
  setActiveTab: (tab: string) => void;
  userName: string;
  userInitial: string;
  onLogout?: () => void;
}

export function ProfilePage({ setActiveTab, userName, userInitial, onLogout }: ProfilePageProps) {
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
  const [editedName, setEditedName] = React.useState(userName);
  const [editedGender, setEditedGender] = React.useState('Male');
  const [displayName, setDisplayName] = React.useState(userName);
  const [displayGender, setDisplayGender] = React.useState('Male');
  const [displayInitial, setDisplayInitial] = React.useState(userInitial);

  const handleMenuItemClick = (item: string) => {
    console.log(`Clicked: ${item}`);
    // In a real app, navigate to the appropriate page
    if (item === 'Logout') {
      // Handle logout
      console.log('Logging out...');
      if (onLogout) {
        onLogout();
      }
    }
  };

  const handleEditClick = () => {
    setIsEditModalOpen(true);
  };

  const handleSaveClick = () => {
    setDisplayName(editedName);
    setDisplayGender(editedGender);
    setDisplayInitial(editedName.charAt(0).toUpperCase());
    setIsEditModalOpen(false);
  };

  const handleCancelClick = () => {
    setIsEditModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center">
          <button
            onClick={() => setActiveTab('home')}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors -ml-2"
          >
            <ArrowLeft size={20} className="text-slate-900" />
          </button>
          <h1 className="flex-1 text-center text-xl font-semibold text-slate-900 -ml-10">My Profile</h1>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Profile Section */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              {/* Avatar */}
              <div className="w-20 h-20 rounded-full bg-[#59b559] flex items-center justify-center">
                <span className="text-white font-bold text-3xl">{displayInitial}</span>
              </div>
              
              {/* User Info */}
              <div>
                <h3 className="text-xl font-semibold text-[#59b559] mb-1 text-[24px] font-bold">{displayName}</h3>
                <p className="text-slate-600 text-sm mb-1">+1234567890</p>
                <p className="text-slate-500 text-sm">{displayGender}</p>
              </div>
            </div>
            
            {/* Edit Button */}
            <button 
              onClick={handleEditClick}
              className="p-2.5 hover:bg-slate-100 rounded-full transition-colors self-center"
            >
              <Edit size={22} className="text-slate-600" />
            </button>
          </div>
        </div>

        {/* Action Cards */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="grid grid-cols-3 gap-3">
            {/* My Courses */}
            <button
              onClick={() => handleMenuItemClick('My Courses')}
              className="flex flex-col items-center gap-3 p-4 border-2 border-[#59b559]/30 rounded-2xl hover:bg-[#59b559]/5 transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-[#59b559]/10 flex items-center justify-center">
                <BookOpen size={24} className="text-[#59b559]" />
              </div>
              <span className="text-xs font-medium text-slate-900 text-center">My Courses</span>
            </button>

            {/* Follow us */}
            <button
              onClick={() => handleMenuItemClick('Follow us')}
              className="flex flex-col items-center gap-3 p-4 border-2 border-[#59b559]/30 rounded-2xl hover:bg-[#59b559]/5 transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-[#59b559]/10 flex items-center justify-center">
                <Instagram size={24} className="text-[#59b559]" />
              </div>
              <span className="text-xs font-medium text-slate-900 text-center">Follow us</span>
            </button>

            {/* Help & support */}
            <button
              onClick={() => handleMenuItemClick('Help & support')}
              className="flex flex-col items-center gap-3 p-4 border-2 border-[#59b559]/30 rounded-2xl hover:bg-[#59b559]/5 transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-[#59b559]/10 flex items-center justify-center">
                <MessageCircle size={24} className="text-[#59b559]" />
              </div>
              <span className="text-xs font-medium text-slate-900 text-center">Help & support</span>
            </button>
          </div>
        </div>

        {/* PWA Status */}
        <PWAStatus />

        {/* Menu Items */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          {/* Pro membership */}
          <button
            onClick={() => handleMenuItemClick('Pro membership')}
            className="w-full flex items-center gap-4 px-6 py-4 hover:bg-slate-50 transition-colors border-b border-slate-100"
          >
            <div className="w-10 h-10 rounded-xl bg-[#59b559]/10 flex items-center justify-center">
              <Crown size={20} className="text-[#59b559]" />
            </div>
            <span className="text-slate-900 font-medium flex-1 text-left">Pro membership</span>
            <ChevronRight size={20} className="text-slate-400" />
          </button>

          {/* Rate Your Experience */}
          <button
            onClick={() => handleMenuItemClick('Rate Your Experience')}
            className="w-full flex items-center gap-4 px-6 py-4 hover:bg-slate-50 transition-colors border-b border-slate-100"
          >
            <div className="w-10 h-10 rounded-xl bg-[#59b559]/10 flex items-center justify-center">
              <Star size={20} className="text-[#59b559]" />
            </div>
            <span className="text-slate-900 font-medium flex-1 text-left">Rate Your Experience</span>
            <ChevronRight size={20} className="text-slate-400" />
          </button>

          {/* Privacy policy */}
          <button
            onClick={() => handleMenuItemClick('Privacy policy')}
            className="w-full flex items-center gap-4 px-6 py-4 hover:bg-slate-50 transition-colors border-b border-slate-100"
          >
            <div className="w-10 h-10 rounded-xl bg-[#59b559]/10 flex items-center justify-center">
              <Shield size={20} className="text-[#59b559]" />
            </div>
            <span className="text-slate-900 font-medium flex-1 text-left">Privacy policy</span>
            <ChevronRight size={20} className="text-slate-400" />
          </button>

          {/* Terms and Conditions */}
          <button
            onClick={() => handleMenuItemClick('Terms and Conditions')}
            className="w-full flex items-center gap-4 px-6 py-4 hover:bg-slate-50 transition-colors border-b border-slate-100"
          >
            <div className="w-10 h-10 rounded-xl bg-[#59b559]/10 flex items-center justify-center">
              <FileText size={20} className="text-[#59b559]" />
            </div>
            <span className="text-slate-900 font-medium flex-1 text-left">Terms and Conditions</span>
            <ChevronRight size={20} className="text-slate-400" />
          </button>

          {/* Refund Policy */}
          <button
            onClick={() => handleMenuItemClick('Refund Policy')}
            className="w-full flex items-center gap-4 px-6 py-4 hover:bg-slate-50 transition-colors border-b border-slate-100"
          >
            <div className="w-10 h-10 rounded-xl bg-[#59b559]/10 flex items-center justify-center">
              <RotateCcw size={20} className="text-[#59b559]" />
            </div>
            <span className="text-slate-900 font-medium flex-1 text-left">Refund Policy</span>
            <ChevronRight size={20} className="text-slate-400" />
          </button>

          {/* Refer and earn */}
          <button
            onClick={() => handleMenuItemClick('Refer and earn')}
            className="w-full flex items-center gap-4 px-6 py-4 hover:bg-slate-50 transition-colors"
          >
            <div className="w-10 h-10 rounded-xl bg-[#59b559]/10 flex items-center justify-center">
              <Gift size={20} className="text-[#59b559]" />
            </div>
            <div className="flex-1 flex items-center justify-between">
              <span className="text-slate-900 font-medium">Refer and earn</span>
              <span className="text-xs text-[#59b559] font-medium">Coming Soon</span>
            </div>
            <ChevronRight size={20} className="text-slate-400" />
          </button>
        </div>

        {/* Logout */}
        <button
          onClick={() => handleMenuItemClick('Logout')}
          className="w-full bg-white rounded-2xl shadow-sm flex items-center gap-4 px-6 py-4 hover:bg-red-50 transition-colors"
        >
          <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center">
            <LogOut size={20} className="text-red-500" />
          </div>
          <span className="text-red-500 font-medium flex-1 text-left">Logout</span>
        </button>
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 shadow-lg w-80">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-slate-900">Edit Profile</h3>
              <button
                onClick={handleCancelClick}
                className="p-2 hover:bg-slate-100 rounded-full transition-colors"
              >
                <X size={20} className="text-slate-600" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700">Name</label>
                <input
                  type="text"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-slate-500 focus:border-slate-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Gender</label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setEditedGender('Male')}
                    className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      editedGender === 'Male'
                        ? 'bg-[#59b559] text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    Male
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditedGender('Female')}
                    className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      editedGender === 'Female'
                        ? 'bg-[#59b559] text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    Female
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditedGender('Other')}
                    className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      editedGender === 'Other'
                        ? 'bg-[#59b559] text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    Other
                  </button>
                </div>
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={handleCancelClick}
                className="px-4 py-2 bg-slate-100 text-slate-600 rounded-md mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveClick}
                className="px-4 py-2 bg-[#59b559] text-white rounded-md"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}