<script setup lang="ts">
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useUserStore } from '@stores/userStore';

const props = withDefaults(defineProps<{
  range?: number;
  jumpSize?: number;
}>(), {
  range: 2,
  jumpSize: 5
});

const userStore = useUserStore();
const { currentPage, total, isFetching } = storeToRefs(userStore);

const totalPages = computed(() => {
  return Math.ceil(total.value / 10);
});

const onPageChange = (page: number) => {
  userStore.setFetching(true);
  userStore.setCurrentPage(page);
};

const getPageNumbers = computed(() => {
  const pages: (number | '...')[] = [];
  
  const addPage = (page: number) => {
    if (!pages.includes(page)) pages.push(page);
  };

  addPage(1); // First page

  if (currentPage.value - props.range > 2) pages.push('...');

  for (let i = Math.max(2, currentPage.value - props.range); i <= Math.min(totalPages.value - 1, currentPage.value + props.range); i++) {
    addPage(i);
  }

  if (currentPage.value + props.range < totalPages.value - 1) pages.push('...');

  addPage(totalPages.value); // Last page

  return pages;
});

const handlePageJump = (position: 'left' | 'right') => {
  const targetPage = position === 'left' 
    ? Math.max(1, currentPage.value - props.jumpSize) 
    : Math.min(totalPages.value, currentPage.value + props.jumpSize);
  onPageChange(targetPage);
};

const handleMouseEnter = (event: MouseEvent, index: number) => {
  const target = event.target as HTMLButtonElement;
  target.innerHTML = index === 1 ? '<' : '>';
};

const handleMouseLeave = (event: MouseEvent) => {
  const target = event.target as HTMLButtonElement;
  target.innerHTML = '...';
};
</script>

<template>
  <div v-if="totalPages > 1" data-testid="pagination-container" class="flex gap-1 mt-4">
    <button
      data-testid="pagination-prev-button"
      class="bg-white text-gray-500 px-2 py-1.5 rounded text-sm outline-none border-none cursor-pointer disabled:opacity-20 disabled:cursor-not-allowed hover:bg-gray-100"
      :disabled="currentPage === 1 || isFetching"
      @click="onPageChange(currentPage - 1)"
    >
      Previous
    </button>
    
    <template v-for="(page, index) in getPageNumbers" :key="index">
      <button
        v-if="page === '...'"
        :disabled="isFetching"
        class="bg-white text-gray-500 px-2 py-1.5 rounded text-sm outline-none border-none cursor-pointer disabled:opacity-20 disabled:cursor-not-allowed hover:bg-gray-100"
        @click="handlePageJump(index === 1 ? 'left' : 'right')"
        @mouseenter="(e) => handleMouseEnter(e, index)"
        @mouseleave="handleMouseLeave"
      >
        ...
      </button>
      <button
        v-else
        :disabled="isFetching"
        class="bg-white text-gray-500 px-2 py-1.5 rounded text-sm outline-none border-none cursor-pointer disabled:opacity-20 disabled:cursor-not-allowed hover:bg-gray-100"
        :class="{ '!bg-[#36304a] !text-white hover:!bg-[#36304a]': page === currentPage }"
        @click="onPageChange(page)"
      >
        {{ page }}
      </button>
    </template>

    <button
      data-testid="pagination-next-button"
      class="bg-white text-gray-500 px-2 py-1.5 rounded text-sm outline-none border-none cursor-pointer disabled:opacity-20 disabled:cursor-not-allowed hover:bg-gray-100"
      :disabled="currentPage >= totalPages || isFetching"
      @click="onPageChange(currentPage + 1)"
    >
      Next
    </button>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Pagination'
}
</script>
