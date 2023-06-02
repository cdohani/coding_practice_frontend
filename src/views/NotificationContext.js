import React, { createContext, useState } from "react";

// Create the context
export const NotificationContext = createContext();

// Create the provider component
export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState("");

  // Function to set the notification message
  const setNotificationMessage = (message) => {
    setNotification(message);
  };

  return (
    <NotificationContext.Provider
      value={{
        notification,
        setNotificationMessage
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
