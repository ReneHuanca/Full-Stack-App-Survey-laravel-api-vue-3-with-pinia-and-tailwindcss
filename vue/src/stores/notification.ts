import { defineStore } from 'pinia'

interface State {
    notification: {
        show: boolean
        message: null | string
        type: null | string
    }
}
export const useNotificationStore = defineStore('notification', {
    state: (): State => ({
        notification: {
            show: false,
            type: null,
            message: null,
        }
   }),
    actions: {
        notify(message: any, type: any) {
            this.notification.show = true
            this.notification.type = type
            this.notification.message = message
            setInterval(() => {
                this.notification.show = false
            }, 3000)
        },
    }
})