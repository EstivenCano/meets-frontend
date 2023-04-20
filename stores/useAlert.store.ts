import { create } from "zustand";

type Alert = {
  message: string;
  status: number;
  errorList?: string | string[];
};

interface AlertState {
  alerts: Alert[];
  addAlert: (alert: Alert) => void;
  removeAlert: (message: string) => void;
}

export const alertStore = create<AlertState>()((set) => ({
  alerts: [],
  addAlert: (alert) => set((state) => ({ alerts: [...state.alerts, alert] })),
  removeAlert: (message) =>
    set((state) => ({
      alerts: state.alerts.filter((a) => a.message !== message),
    })),
}));
