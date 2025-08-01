import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import { Snackbar, Alert } from '@mui/material';
import type { AlertColor } from '@mui/material';

interface Notification {
    id: string;
    message: string;
    severity: AlertColor;
    autoHideDuration?: number;
}

interface NotificationContextType {
    showNotification: (message: string, severity: AlertColor, autoHideDuration?: number) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotification = () => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error('useNotification must be used within a NotificationProvider');
    }
    return context;
};

interface NotificationProviderProps {
    children: ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
    const [notifications, setNotifications] = useState<Notification[]>([]);

    const showNotification = (
        message: string,
        severity: AlertColor,
        autoHideDuration: number = 6000
    ) => {
        const id = Date.now().toString();
        const newNotification: Notification = {
            id,
            message,
            severity,
            autoHideDuration,
        };

        setNotifications(prev => [...prev, newNotification]);

        if (autoHideDuration > 0) {
            setTimeout(() => {
                handleClose(id);
            }, autoHideDuration);
        }
    };

    const handleClose = (id: string) => {
        setNotifications(prev => prev.filter(notification => notification.id !== id));
    };

    return (
        <NotificationContext.Provider value={{ showNotification }}>
            {children}
            {notifications.map((notification) => (
                <Snackbar
                    key={notification.id}
                    open={true}
                    autoHideDuration={notification.autoHideDuration}
                    onClose={() => handleClose(notification.id)}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                    sx={{ zIndex: 9999 }}
                >
                    <Alert
                        onClose={() => handleClose(notification.id)}
                        severity={notification.severity}
                        variant="filled"
                        sx={{ width: '100%', zIndex: 10000 }}
                    >
                        {notification.message}
                    </Alert>
                </Snackbar>
            ))}
        </NotificationContext.Provider>
    );
}; 