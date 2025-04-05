<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useUserStore } from '@stores/userStore';

const userStore = useUserStore();
// @ts-ignore - used in template
const { isFetching, currentGenderFilter } = storeToRefs(userStore);

const handleGenderChange = (event: Event) => {
  userStore.setFetching(true);
  const target = event.target as HTMLSelectElement;
  userStore.setGenderFilter(target.value);
};
</script>

<template>
  <div class="relative">
    <select
      :value="currentGenderFilter"
      @change="handleGenderChange"
      :disabled="isFetching"
      class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
    >
      <option value="">All Genders</option>
      <option value="male">Male</option>
      <option value="female">Female</option>
    </select>
    <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
      <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'GenderFilter'
}
</script> 