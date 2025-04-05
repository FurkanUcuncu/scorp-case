<script setup lang="ts">
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { tableSkeletonColumnWidths } from '@/utils/constants';
import { IUser } from '@/types/user.types';
import { useUserStore } from '@/stores/userStore';
import TableSkeleton from '@/components/TableSkeleton.vue';
import Error from '@/components/ErrorMessage.vue';

const router = useRouter();
const userStore = useUserStore();
// @ts-ignore - used in template
const { filteredUsers, isFetching, error } = storeToRefs(userStore);

const columns = [
  { key: 'id', label: 'ID', width: 'w-[10%]', value: (user: IUser) => user.id },
  { key: 'name', label: 'Name', width: 'w-[20%]', value: (user: IUser) => `${user.firstName} ${user.lastName}` },
  { key: 'age', label: 'Age', width: 'w-[10%]', value: (user: IUser) => user.age },
  { key: 'gender', label: 'Gender', width: 'w-[10%]', value: (user: IUser) => user.gender },
  { key: 'city', label: 'City', width: 'w-[15%]', value: (user: IUser) => user.address.city },
  { key: 'email', label: 'Email', width: 'w-[35%]', value: (user: IUser) => user.email }
];

const handleUserClick = (user: IUser) => {
  userStore.setSelectedUser(user);
  router.push('/user');
};
</script>

<template>
  <tbody class="bg-white divide-y divide-gray-200">
    <template v-if="isFetching">
      <TableSkeleton :row-count="10" :columns="tableSkeletonColumnWidths" />
    </template>

    <template v-else-if="error">
      <tr>
        <td :colspan="columns.length" class="px-6 py-12">
          <div class="flex justify-center items-center">
            <Error/>
          </div>
        </td>
      </tr>
    </template>

    <template v-else-if="!filteredUsers?.length">
      <tr>
        <td :colspan="columns.length" class="px-6 py-12">
          <div class="text-center text-gray-500">
            No users found
          </div>
        </td>
      </tr>
    </template>

    <template v-else>
      <tr
        v-for="user in filteredUsers"
        :key="user.id"
        class="hover:bg-gray-50 cursor-pointer"
        @click="handleUserClick(user)"
      >
        <td
          v-for="column in columns"
          :key="column.key"
          :data-cell="column.label"
          class="px-6 py-4 whitespace-break-spaces text-sm text-gray-900 
                 max-[650px]:break-all max-[650px]:wrap-anywhere max-[650px]:flex max-[650px]:flex-col 
                 max-[650px]:gap-2 max-[650px]:py-1 max-[650px]:px-2 max-[650px]:text-xs max-[650px]:w-full
                 max-[650px]:first:pt-3 max-[650px]:last:pb-3
                 max-[650px]:before:content-[attr(data-cell)] max-[650px]:before:font-bold max-[650px]:before:capitalize max-[650px]:before:after:content-[':_']"
          :class="column.width"
        >
          {{ column.value(user) }}
        </td>
      </tr>
    </template>
  </tbody>
</template>

<script lang="ts">
export default {
  name: 'TableBody'
}
</script> 