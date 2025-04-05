<script setup lang="ts">
import { onMounted, watch } from 'vue';
import { storeToRefs } from "pinia";
import { useUserStore } from '@/stores/userStore';
import TableHeader from '@components/TableHeader.vue';
import TableBody from '@components/TableBody.vue';
import Pagination from '@components/Pagination.vue';
import Error from '@/components/ErrorMessage.vue';
import FilterForm from '@components/FilterForm.vue';

const userStore = useUserStore();
const { sort, currentPage, isLoading, error } = storeToRefs(userStore);

onMounted(() => {
  userStore.getUsers();
});

watch([sort, currentPage], () => {
  userStore.getUsers();
});
</script>

<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-[1440px] mx-auto p-5">
      <div class="bg-white rounded-lg shadow-sm">
        <div class="p-6 border-b border-gray-200 max-[450px]:p-0">
          <div class="flex justify-between items-center gap-4 mb-6 max-[450px]:flex-col max-[450px]:items-start">
            <h1 class="text-2xl font-semibold text-gray-900 max-[450px]:text-xl max-[450px]:p-2">Users Management</h1>
            <FilterForm />
          </div>
          
          <div v-if="isLoading" class="flex justify-center items-center py-12">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
          
          <div v-else-if="error" class="text-center py-12">
            <Error />
          </div>
          
          <div v-else>
            <div class="overflow-x-auto">
              <table class="w-full border-collapse m-0 rounded overflow-hidden bg-[#cccccc]/70 text-black">
                <TableHeader />
                <TableBody />
              </table>
            </div>
            
            <div class="px-6 py-4 w-full border-t border-gray-200 flex justify-end items-center max-[450px]:justify-center">
              <Pagination
                :range="2"
                :jump-size="5"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'UserList'
}
</script> 