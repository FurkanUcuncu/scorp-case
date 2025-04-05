<script setup lang="ts">
import { ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useUserStore } from '@stores/userStore';

const userStore = useUserStore();
// @ts-ignore - used in template
const { isLoading, isFetching } = storeToRefs(userStore);
const searchQuery = ref('');
let debounceTimer: number;

const handleSearch = () => {
  userStore.setFetching(true);
  userStore.setFilteredUsers(searchQuery.value);
};

watch(searchQuery, () => {
  clearTimeout(debounceTimer);
  debounceTimer = window.setTimeout(() => {
    handleSearch();
  }, 500);
});
</script>

<template>
  <div class="relative">
    <input
      type="text"
      v-model="searchQuery"
      :disabled="isLoading || isFetching"
      placeholder="Search users by city..."
      class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    />
    <div v-if="isFetching" class="absolute right-3 top-2">
      <div class="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'SearchInput'
}
</script>