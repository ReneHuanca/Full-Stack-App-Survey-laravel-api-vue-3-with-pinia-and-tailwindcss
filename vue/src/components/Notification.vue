<script lang="ts" setup>
import { computed } from 'vue'
import { useNotificationStore } from '../stores/notification'

const notificationStore = useNotificationStore()

const notification = computed(() => notificationStore.notification)

</script>

<template>
    <div
        v-if="notification.show"
        class="fixed w-[300px] left-4 bottom-4 py-2 px-4 text-white animate-fade-in-down"
        :class="[notification.type == 'success' ? 'bg-emerald-500' : 'bg-red-500']"
    >
        {{ notification.message }}
    </div>
</template>