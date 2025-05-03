
import { toast } from "react-hot-toast";

export const showDueTodayToast = (taskTitle: string) => {
  toast(`📢 "${taskTitle}" is due today!`, {
    icon: "⏰",
    style: {
      background: "#fef3c7",
      color: "#92400e",
    },
  });
};

export const showDueTomorrowToast = (taskTitle: string) => {
  toast(`📅 "${taskTitle}" is due tomorrow!`, {
    icon: "📆",
    style: {
      background: "#dbeafe",
      color: "#1e3a8a",
    },
  });
};

export const showOverdueToast = (taskTitle: string) => {
  toast(`⚠️ "${taskTitle}" is overdue!`, {
    icon: "⚡",
    style: {
      background: "#fecaca",
      color: "#991b1b",
    },
  });
};
