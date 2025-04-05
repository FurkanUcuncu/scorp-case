<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/stores/userStore';

const userStore = useUserStore();
const { error } = storeToRefs(userStore);
</script>

<template>
    <div data-testid="error-message" class="inline-flex items-center px-4 py-2 rounded-md bg-red-50 text-red-700">
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        {{ error?.message }}
    </div>
</template>

<script lang="ts">
export default {
    name: 'Error'
}
</script>