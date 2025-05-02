"use client";

import { createContext, useState, useContext, useEffect, ReactNode } from "react";

interface DeviceContextType {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  windowSize: {
    width: number;
    height: number;
  };
}

const defaultValue: DeviceContextType = {
  isMobile: false,
  isTablet: false,
  isDesktop: true,
  windowSize: {
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800
  }
};

const DeviceContext = createContext<DeviceContextType>(defaultValue);

interface DeviceProviderProps {
  children: ReactNode;
}

export function DeviceProvider({ children }: DeviceProviderProps) {
  const [deviceInfo, setDeviceInfo] = useState<DeviceContextType>(defaultValue);

  useEffect(() => {
    const updateDeviceInfo = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      setDeviceInfo({
        isMobile: width < 768,
        isTablet: width >= 768 && width < 1024,
        isDesktop: width >= 1024,
        windowSize: { width, height }
      });
    };

    updateDeviceInfo();

    const debounce = (func: Function, wait: number) => {
      let timeout: NodeJS.Timeout;
      return () => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(), wait);
      };
    };

    const debouncedUpdateDeviceInfo = debounce(updateDeviceInfo, 250);
    window.addEventListener('resize', debouncedUpdateDeviceInfo);

    return () => {
      window.removeEventListener('resize', debouncedUpdateDeviceInfo);
    };
  }, []);

  return (
    <DeviceContext.Provider value={deviceInfo}>
      {children}
    </DeviceContext.Provider>
  );
}

export const useDevice = () => useContext(DeviceContext);