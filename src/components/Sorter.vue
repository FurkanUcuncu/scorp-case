<script setup lang="ts">
import { ISorterProps } from '@/types/props.types';

defineProps<ISorterProps>();
</script>

<template>
  <div class="inline-flex flex-col gap-1 items-center justify-center">
    <div
      :data-testid="`${sortColumn}-sorter-asc`"
      class="border-3 border-x-transparent border-t-0 border-b-4 border-b-black"
      :class="{
        'opacity-100': currentSort.sort === sortColumn && currentSort.direction === 'asc',
        'opacity-30': currentSort.sort !== sortColumn || (currentSort.sort === sortColumn && currentSort.direction === 'desc')
      }"
    />
    <div
      :data-testid="`${sortColumn}-sorter-desc`"
      class="border-3 border-x-transparent border-b-0 border-t-4 border-t-black"
      :class="{
        'opacity-100': currentSort.sort === sortColumn && currentSort.direction === 'desc',
        'opacity-30': currentSort.sort !== sortColumn || (currentSort.sort === sortColumn && currentSort.direction === 'asc')
      }"
    />
  </div>
</template>

<script lang="ts">
export default {
  name: 'Sorter'
}
</script>