import React, { useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "../ui/dialog";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { User, Trash2, Clock } from "lucide-react";
import { toast } from "sonner@2.0.3";
import IconSrokeChatbubbles from "../../imports/IconSrokeChatbubbles";
import { useLanguage } from "../../contexts/LanguageContext";
import { VisuallyHidden } from "../ui/visually-hidden";
import { CloseButton } from "../ui/close-button";

interface Message {
  id: string;
  senderKey: string;
  senderRoleKey: string;
  messageKey: string;
  timeKey: string;
  isRead: boolean;
}

const mockMessages: Message[] = [
  {
    id: '1',
    senderKey: 'message.mockData.sender1',
    senderRoleKey: 'message.mockData.role1',
    messageKey: 'message.mockData.message1',
    timeKey: 'notification.timeAgo.justNow',
    isRead: false,
  },
  {
    id: '2',
    senderKey: 'message.mockData.sender2',
    senderRoleKey: 'message.mockData.role2',
    messageKey: 'message.mockData.message2',
    timeKey: 'notification.timeAgo.minutesAgo',
    isRead: false,
  },
  {
    id: '3',
    senderKey: 'message.mockData.sender3',
    senderRoleKey: 'message.mockData.role3',
    messageKey: 'message.mockData.message3',
    timeKey: 'notification.timeAgo.minutesAgo',
    isRead: true,
  },
  {
    id: '4',
    senderKey: 'message.mockData.sender4',
    senderRoleKey: 'message.mockData.role4',
    messageKey: 'message.mockData.message4',
    timeKey: 'notification.timeAgo.hoursAgo',
    isRead: true,
  },
  {
    id: '5',
    senderKey: 'message.mockData.sender5',
    senderRoleKey: 'message.mockData.role5',
    messageKey: 'message.mockData.message5',
    timeKey: 'notification.timeAgo.hoursAgo',
    isRead: true,
  },
];

interface MessageDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MessageDialog({ isOpen, onClose }: MessageDialogProps) {
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const { t } = useLanguage();

  const handleMarkAllRead = () => {
    setMessages(prev => prev.map(m => ({ ...m, isRead: true })));
    toast.success(t('message.markAllReadSuccess'));
  };

  const handleDeleteAll = () => {
    setMessages([]);
    toast.success(t('message.deleteAllSuccess'));
  };

  const handleDeleteMessage = (id: string) => {
    setMessages(prev => prev.filter(m => m.id !== id));
    toast.success(t('message.deleteSuccess'));
  };

  const unreadCount = messages.filter(m => !m.isRead).length;

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
            {t('message.title')}
          </DialogTitle>
          <DialogDescription>
            {t('message.description')}
          </DialogDescription>
        </VisuallyHidden>

        <div className="absolute right-2.5 top-2.5 z-50">
          <CloseButton onClick={onClose} size="sm" />
        </div>

        {/* Custom Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b shrink-0" style={{ borderColor: 'var(--glass-border)' }}>
          <div className="flex items-center gap-2">
            <IconSrokeChatbubbles size={20} className="text-primary" />
            <h2 className="text-lg font-semibold text-foreground">{t('message.title')}</h2>
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
              <Clock className="h-4 w-4 mr-2" />
              {t('message.markAllRead')}
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1 hover:bg-muted/50"
              style={{ backgroundColor: 'var(--glass-bg)' }}
              onClick={handleDeleteAll}
              disabled={messages.length === 0}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              {t('message.deleteAll')}
            </Button>
          </div>

          {/* 메시지 리스트 */}
          <div className="space-y-2 flex-1 min-h-0">
            {messages.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <IconSrokeChatbubbles size={48} className="mx-auto mb-3 opacity-30" />
                <p className="text-sm">{t('message.noMessages')}</p>
              </div>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={`relative p-3 rounded-xl border transition-all duration-200 group ${
                    message.isRead
                      ? 'border-border/40 bg-secondary/40'
                      : 'border-primary/20 bg-primary/10'
                  }`}
                >
                  {/* 읽지 않음 표시 */}
                  {!message.isRead && (
                    <div className="absolute top-3 left-3 w-2 h-2 bg-primary rounded-full" />
                  )}

                  <div className="flex gap-3 pl-4">
                    {/* 프로필 아이콘 */}
                    <div className="flex-shrink-0 mt-0.5">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                        <User className="h-4 w-4 text-primary" />
                      </div>
                    </div>

                    {/* 콘텐츠 */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <div>
                          <h4 className="font-medium text-sm">{t(message.senderKey)}</h4>
                          <p className="text-xs text-muted-foreground">{t(message.senderRoleKey)}</p>
                        </div>
                        <button
                          onClick={() => handleDeleteMessage(message.id)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
                        >
                          <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive transition-colors" />
                        </button>
                      </div>
                      <p className="text-sm text-foreground mb-2">
                        {t(message.messageKey)}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {message.timeKey === 'notification.timeAgo.justNow'
                          ? t('notification.timeAgo.justNow')
                          : t(message.timeKey, { count: message.id === '2' ? 10 : message.id === '3' ? 30 : message.id === '4' ? 1 : 2 })
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
              toast.info(t('message.settingsPreparing'));
            }}
          >
            {t('message.settings')}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
