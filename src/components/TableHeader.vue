<script setup lang="ts">
import Sorter from '@/components/Sorter.vue';
import { useUserStore } from '@/stores/userStore';
import { tableColumns } from '@/utils/constants';
import { storeToRefs } from 'pinia';

const userStore = useUserStore();
const { sort } = storeToRefs(userStore);

const onSortChange = (column: string) => {
  // If clicking the same column, cycle through states
  if (sort.value.sort === column) {
    if (sort.value.direction === 'asc') {
      userStore.setSort({
        sort: column,
        direction: 'desc'
      });
    } else if (sort.value.direction === 'desc') {
      // Reset to null state
      userStore.setSort({
        sort: '',
        direction: 'asc'
      });
    }
  } else {
    // If clicking a different column, start with ascending
    userStore.setSort({
      sort: column,
      direction: 'asc'
    });
  }
};
</script>

<template>
  <thead class="bg-gray-50 max-[650px]:hidden">
    <tr>
      <th
        v-for="column in tableColumns"
        :data-testid="`th-${column.key}`"
        :key="column.key"
        scope="col"
        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
        :class="[
          column.width,
          { 'cursor-pointer hover:bg-gray-100': column.sortable }
        ]"
        @click="column.sortable && column.sortKey ? onSortChange(column.sortKey) : undefined"
      >
        <div class="flex items-center gap-2">
          {{ column.label }}
          <Sorter
            v-if="column.sortable && column.sortKey"
            :sort-column="column.sortKey"
            :current-sort="sort"
          />
        </div>
      </th>
    </tr>
  </thead>
</template>

<script lang="ts">
export default {
  name: 'TableHeader'
}
</script> 