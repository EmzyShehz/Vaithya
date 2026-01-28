import React from 'react';
import { ArrowLeft, Bell, Activity, Calendar, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';

interface NotificationsPageProps {
  setActiveTab: (tab: string) => void;
}

interface Notification {
  id: string;
  type: 'test_result' | 'goal_progress' | 'appointment' | 'alert' | 'achievement';
  title: string;
  message: string;
  date: Date;
  read: boolean;
}

export function NotificationsPage({ setActiveTab }: NotificationsPageProps) {
  const [notifications, setNotifications] = React.useState<Notification[]>([
    {
      id: '1',
      type: 'test_result',
      title: 'New Test Results Available',
      message: 'Your Comprehensive Metabolic Panel results are ready to view.',
      date: new Date('2026-01-28T09:30:00'),
      read: false,
    },
    {
      id: '2',
      type: 'goal_progress',
      title: 'Goal Progress Update',
      message: 'Your Glucose goal has improved by 5% this week. Keep it up!',
      date: new Date('2026-01-27T14:20:00'),
      read: false,
    },
    {
      id: '3',
      type: 'alert',
      title: 'Borderline Reading Detected',
      message: 'Your latest Blood Pressure reading (138/88 mmHg) is in the borderline range.',
      date: new Date('2026-01-26T11:15:00'),
      read: true,
    },
    {
      id: '4',
      type: 'appointment',
      title: 'Upcoming Lab Appointment',
      message: 'Reminder: You have a blood test scheduled for February 15, 2026.',
      date: new Date('2026-01-25T08:00:00'),
      read: true,
    },
    {
      id: '5',
      type: 'achievement',
      title: 'Achievement Unlocked!',
      message: 'You completed all action items for your LDL Cholesterol goal!',
      date: new Date('2026-01-24T16:45:00'),
      read: true,
    },
    {
      id: '6',
      type: 'goal_progress',
      title: 'Weekly Summary',
      message: 'You completed 85% of your health goals this week.',
      date: new Date('2026-01-21T10:00:00'),
      read: true,
    },
    {
      id: '7',
      type: 'test_result',
      title: 'Test Results Updated',
      message: 'Your HDL Cholesterol levels show optimal improvement.',
      date: new Date('2026-01-20T13:30:00'),
      read: true,
    },
    {
      id: '8',
      type: 'alert',
      title: 'Action Required',
      message: 'Your Glucose reading requires attention. Review your action plan.',
      date: new Date('2026-01-18T09:00:00'),
      read: true,
    },
  ]);

  // Sort notifications by date (most recent first)
  const sortedNotifications = [...notifications].sort((a, b) => b.date.getTime() - a.date.getTime());

  // Mark notification as read
  const markAsRead = (id: string) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  // Mark all as read
  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'test_result':
        return <Activity size={20} className="text-blue-600" />;
      case 'goal_progress':
        return <TrendingUp size={20} className="text-green-600" />;
      case 'appointment':
        return <Calendar size={20} className="text-purple-600" />;
      case 'alert':
        return <AlertCircle size={20} className="text-orange-600" />;
      case 'achievement':
        return <CheckCircle size={20} className="text-emerald-600" />;
      default:
        return <Bell size={20} className="text-slate-600" />;
    }
  };

  const getIconBg = (type: string) => {
    switch (type) {
      case 'test_result':
        return 'bg-blue-100';
      case 'goal_progress':
        return 'bg-green-100';
      case 'appointment':
        return 'bg-purple-100';
      case 'alert':
        return 'bg-orange-100';
      case 'achievement':
        return 'bg-emerald-100';
      default:
        return 'bg-slate-100';
    }
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) {
      return `${diffMins}m ago`;
    } else if (diffHours < 24) {
      return `${diffHours}h ago`;
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays < 7) {
      return `${diffDays}d ago`;
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-md mx-auto px-3 py-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setActiveTab('home')}
                className="p-2 hover:bg-slate-100 rounded-full transition-colors"
              >
                <ArrowLeft size={20} className="text-slate-700" />
              </button>
              <div>
                <h1 className="text-xl font-semibold text-slate-900">Notifications</h1>
                {unreadCount > 0 && (
                  <p className="text-sm text-slate-500">{unreadCount} unread</p>
                )}
              </div>
            </div>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="text-sm text-[#337e51] hover:text-[#2a6742] font-medium transition-colors"
              >
                Mark all read
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Notifications List */}
      <div className="max-w-md mx-auto px-3 py-4">
        {sortedNotifications.length === 0 ? (
          <div className="bg-white rounded-3xl px-6 py-12 text-center shadow-sm">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bell className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-slate-900 font-medium mb-2">No notifications</h3>
            <p className="text-slate-500 text-sm">
              You're all caught up! New notifications will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {sortedNotifications.map((notification) => (
              <div
                key={notification.id}
                onClick={() => markAsRead(notification.id)}
                className={`bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-all cursor-pointer ${
                  !notification.read ? 'border-l-4 border-[#337e51]' : ''
                }`}
              >
                <div className="flex gap-3">
                  {/* Icon */}
                  <div className={`w-10 h-10 rounded-full ${getIconBg(notification.type)} flex items-center justify-center flex-shrink-0`}>
                    {getIcon(notification.type)}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className={`font-medium text-sm ${
                        !notification.read ? 'text-slate-900' : 'text-slate-700'
                      }`}>
                        {notification.title}
                      </h3>
                      {!notification.read && (
                        <div className="w-2 h-2 bg-[#337e51] rounded-full flex-shrink-0 mt-1.5"></div>
                      )}
                    </div>
                    <p className={`text-sm mb-2 ${
                      !notification.read ? 'text-slate-600' : 'text-slate-500'
                    }`}>
                      {notification.message}
                    </p>
                    <p className="text-xs text-slate-400">
                      {formatDate(notification.date)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
