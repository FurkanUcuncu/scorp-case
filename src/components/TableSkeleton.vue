<script setup lang="ts">
import { ITableSkeletonProps } from '@/types/props.types';

const props = defineProps<ITableSkeletonProps>();
</script>

<template>
  <tr v-for="(_, index) in props.rowCount" :key="index">
    <td 
      v-for="column in props.columns" 
      :key="column.width"
      class="t-data px-6 py-4 whitespace-nowrap text-sm text-gray-900 max-[650px]:flex max-[650px]:flex-col max-[650px]:gap-2 max-[650px]:py-1 max-[650px]:px-2 max-[650px]:text-xs"
      :class="`w-[${column.width}]`"
    >
      <div class="h-4 bg-gray-200 rounded animate-pulse"></div>
    </td>
  </tr>
</template>

<script lang="ts">
export default {
  name: 'TableSkeleton'
}
</script>