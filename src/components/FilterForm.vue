<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { useUserStore } from '@/stores/userStore';
import { storeToRefs } from 'pinia';

const userStore = useUserStore();
const { currentFilter, currentGenderFilter } = storeToRefs(userStore);

const isOpen = ref(false);
const dropdownRef = ref<HTMLElement | null>(null);
const localSearch = ref('');
const localGender = ref('');

const handleClickOutside = (event: MouseEvent) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    isOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
  if (!isOpen.value) {
    localSearch.value = '';
    localGender.value = '';
  } else {
    localSearch.value = currentFilter.value;
    localGender.value = currentGenderFilter.value;
  }
};

const handleSubmit = () => {
  userStore.setFilteredUsers(localSearch.value);
  userStore.setGenderFilter(localGender.value);
  isOpen.value = false;
};

const handleReset = () => {
  localSearch.value = '';
  localGender.value = '';
  userStore.setFilteredUsers('');
  userStore.setGenderFilter('');
  isOpen.value = false;
};
</script>

<template>
  <div class="relative" ref="dropdownRef">
    <button
      data-testid="filter-form-button"
      @click="toggleDropdown"
      class="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border 
      border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 
      focus:ring-offset-2 max-[450px]:w-full max-[450px]:p-1 max-[450px]:m-2"
    >
      <svg class="w-5 h-5 max-[450px]:w-4 max-[450px]:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
      </svg>
      Filters
    </button>

    <div
      v-if="isOpen"
      data-testid="filter-form-dropdown"
      class="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10 max-[450px]:left-2 max-[450px]:w-60"
    >
      <div class="p-4 space-y-4 max-[450px]:p-2">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1 max-[450px]:text-[10px]">Search by City</label>
          <input
            data-testid="filter-form-input"
            v-model="localSearch"
            type="text"
            placeholder="Enter city name..."
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent max-[450px]:text-xs max-[450px]:px-2 max-[450px]:py-1"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1 max-[450px]:text-[10px]">Filter by Gender</label>
          <select
            data-testid="filter-form-select"
            v-model="localGender"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent max-[450px]:text-xs max-[450px]:px-2 max-[450px]:py-1"
          >
            <option value="">All Genders</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <div class="flex justify-end gap-2 pt-2">
          <button
            data-testid="filter-form-reset-button"
            @click="handleReset"
            type="button"
            class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 max-[450px]:text-xs max-[450px]:px-2 max-[450px]:py-1 cursor-pointer"
          >
            Reset
          </button>
          <button
            data-testid="filter-form-apply-button"
            @click="handleSubmit"
            type="button"
            class="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 max-[450px]:text-xs max-[450px]:px-2 max-[450px]:py-1 cursor-pointer"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'FilterForm'
}
</script> 