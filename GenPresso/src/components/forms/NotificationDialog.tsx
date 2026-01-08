import React, { useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "../ui/dialog";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Bell, CheckCircle2, AlertCircle, Info, Gift, Trash2 } from "lucide-react";
import { toast } from "sonner@2.0.3";
import { useLanguage } from "../../contexts/LanguageContext";
import { VisuallyHidden } from "../ui/visually-hidden";
import { CloseButton } from "../ui/close-button";

interface Notification {
  id: string;
  type: 'success' | 'info' | 'warning' | 'credit';
  titleKey: string;
  messageKey: string;
  timeKey: string;
  isRead: boolean;
  icon?: React.ReactNode;
}

const mockNotifications: Notification[] = [
  {
    id: '8',
    type: 'credit',
    titleKey: 'notification.mockData.couponCredit',
    messageKey: 'notification.mockData.couponCreditMessage',
    timeKey: 'notification.timeAgo.justNow',
    isRead: false,
  },
  {
    id: '7',
    type: 'warning',
    titleKey: 'notification.mockData.insufficientCredit',
    messageKey: 'notification.mockData.insufficientCreditMessage',
    timeKey: 'notification.timeAgo.justNow',
    isRead: false,
  },
  {
    id: '1',
    type: 'credit',
    titleKey: 'notification.mockData.creditCharged',
    messageKey: 'notification.mockData.creditChargedMessage',
    timeKey: 'notification.timeAgo.justNow',
    isRead: false,
  },
  {
    id: '2',
    type: 'success',
    titleKey: 'notification.mockData.projectShared',
    messageKey: 'notification.mockData.projectSharedMessage',
    timeKey: 'notification.timeAgo.minutesAgo',
    isRead: false,
  },
  {
    id: '3',
    type: 'info',
    titleKey: 'notification.mockData.newComment',
    messageKey: 'notification.mockData.newCommentMessage',
    timeKey: 'notification.timeAgo.minutesAgo',
    isRead: true,
  },
  {
    id: '4',
    type: 'success',
    titleKey: 'notification.mockData.imageGenerated',
    messageKey: 'notification.mockData.imageGeneratedMessage',
    timeKey: 'notification.timeAgo.hoursAgo',
    isRead: true,
  },
  {
    id: '5',
    type: 'info',
    titleKey: 'notification.mockData.workspaceInvite',
    messageKey: 'notification.mockData.workspaceInviteMessage',
    timeKey: 'notification.timeAgo.hoursAgo',
    isRead: true,
  },
  {
    id: '6',
    type: 'warning',
    titleKey: 'notification.mockData.creditWarning',
    messageKey: 'notification.mockData.creditWarningMessage',
    timeKey: 'notification.timeAgo.hoursAgo',
    isRead: true,
  },
];

interface NotificationDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NotificationDialog({ isOpen, onClose }: NotificationDialogProps) {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const { t } = useLanguage();

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case 'warning':
        return <AlertCircle className="h-5 w-5 text-orange-500" />;
      case 'credit':
        return <Gift className="h-5 w-5 text-primary" />;
      case 'info':
      default:
        return <Info className="h-5 w-5 text-blue-500" />;
    }
  };

  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    toast.success(t('notification.markAllReadSuccess'));
  };

  const handleDeleteAll = () => {
    setNotifications([]);
    toast.success(t('notification.deleteAllSuccess'));
  };

  const handleDeleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
    toast.success(t('notification.deleteSuccess'));
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className="max-w-2xl mx-auto max-h-[85vh] flex flex-col p-0 gap-0 border-[0.5px] overflow-hidden [&>button]:hidden"
        style={{
          backgroundColor: 'var(--glass-bg)',
          backdropFilter: 'blur(var(--glass-backdrop))',
          WebkitBackdropFilter: 'blur(var(--glass-backdrop))',
          borderColor: 'var(--glass-border)',
          boxShadow: 'var(--glass-shadow)',
        }}
      >
        <VisuallyHidden>
          <DialogTitle>
            {t('notification.title')}
          </DialogTitle>
          <DialogDescription>
            {t('notification.description')}
          </DialogDescription>
        </VisuallyHidden>

        <div className="absolute right-2.5 top-2.5 z-50">
          <CloseButton onClick={onClose} size="sm" />
        </div>

        {/* Custom Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b shrink-0" style={{ borderColor: 'var(--glass-border)' }}>
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold text-foreground">{t('notification.title')}</h2>
            {unreadCount > 0 && (
              <Badge variant="secondary" className="bg-destructive text-destructive-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center p-0">
                {unreadCount}
              </Badge>
            )}
          </div>
        </div>

        {/* Content Body */}
        <div className="flex flex-col flex-1 overflow-y-auto p-6 gap-4">
          <div className="flex gap-2 shrink-0">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1 hover:bg-muted/50"
              style={{ backgroundColor: 'var(--glass-bg)' }}
              onClick={handleMarkAllRead}
              disabled={unreadCount === 0}
            >
              <CheckCircle2 className="h-4 w-4 mr-2" />
              {t('notification.markAllRead')}
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1 hover:bg-muted/50"
              style={{ backgroundColor: 'var(--glass-bg)' }}
              onClick={handleDeleteAll}
              disabled={notifications.length === 0}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              {t('notification.deleteAll')}
            </Button>
          </div>

          {/* 알림 리스트 */}
          <div className="space-y-2 flex-1 min-h-0">
            {notifications.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Bell className="h-12 w-12 mx-auto mb-3 opacity-30" />
                <p className="text-sm">{t('notification.noNotifications')}</p>
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`relative p-3 rounded-xl border transition-all duration-200 group ${
                    notification.isRead
                      ? 'border-border/40 bg-secondary/40'
                      : 'border-primary/20 bg-primary/10'
                  }`}
                >
                  {/* 읽지 않음 표시 */}
                  {!notification.isRead && (
                    <div className="absolute top-3 left-3 w-2 h-2 bg-primary rounded-full" />
                  )}

                  <div className="flex gap-3 pl-4">
                    {/* 아이콘 */}
                    <div className="flex-shrink-0 mt-0.5">
                      {getNotificationIcon(notification.type)}
                    </div>

                    {/* 콘텐츠 */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h4 className="font-medium text-sm">{t(notification.titleKey)}</h4>
                        <button
                          onClick={() => handleDeleteNotification(notification.id)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
                        >
                          <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive transition-colors" />
                        </button>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {t(notification.messageKey)}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {notification.timeKey === 'notification.timeAgo.justNow' 
                          ? t('notification.timeAgo.justNow')
                          : t(notification.timeKey, { count: notification.id === '2' ? 5 : notification.id === '3' ? 15 : notification.id === '4' ? 1 : notification.id === '5' ? 2 : 3 })
                        }
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t shrink-0" style={{ borderColor: 'var(--glass-border)' }}>
          <Button 
            variant="ghost" 
            size="sm" 
            className="flex w-fit mx-auto text-muted-foreground hover:text-foreground"
            onClick={() => {
              toast.info(t('notification.settingsPreparing'));
            }}
          >
            {t('notification.settings')}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
