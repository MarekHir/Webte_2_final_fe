import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useStateStore = defineStore('state', () => {
  const alerts = ref([])

  const addAlert = (message, type) => {
    const alert = {
      message,
      type
    };

    alerts.value.push(alert);

    setTimeout(() => {
      removeAlert(alert);
    }, 8000);
  };

  const removeAlert = (alert) => {
    alerts.value.splice(alerts.value.indexOf(alert), 1);
  }

  return { alerts, addAlert , removeAlert }
})
