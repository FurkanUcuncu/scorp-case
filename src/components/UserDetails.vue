<script setup lang="ts">
import { useUserStore } from '@/stores/userStore';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';

const router = useRouter();
const userStore = useUserStore();
const { selectedUser, isFavorite } = storeToRefs(userStore);

const toggleFavorite = () => {
  if (!selectedUser.value) return;
  
  if (isFavorite.value(selectedUser.value.id)) {
    userStore.removeFromFavorites(selectedUser.value.id);
  } else {
    userStore.addToFavorites(selectedUser.value);
  }
};

const userDetails = [
  { key: 'age', value: selectedUser?.value?.age },
  { key: 'gender', value: selectedUser?.value?.gender },
  { key: 'email', value: selectedUser?.value?.email },
  { key: 'city', value: selectedUser?.value?.address.city },
  { key: 'country', value: selectedUser?.value?.address.country },
]

const goBack = () => {
  router.push('/');
};
</script>

<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="bg-white rounded-lg shadow-sm">
        <div class="p-6">
          <button 
            @click="goBack"
            class="mb-6 inline-flex items-center text-sm text-gray-600 hover:text-gray-900"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Users List
          </button>

          <div v-if="selectedUser" class="space-y-6">
            <div class="flex justify-between items-start">
              <h1 class="text-2xl font-semibold text-gray-900">
                {{ selectedUser.firstName }} {{ selectedUser.lastName }}
              </h1>
              <button
                @click="toggleFavorite"
                class="p-2 rounded-full hover:bg-gray-100"
                :class="{ 'text-red-500': isFavorite(selectedUser.id) }"
              >
                <svg 
                  class="w-6 h-6" 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                  :class="{ 'fill-current': isFavorite(selectedUser.id) }"
                >
                  <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                </svg>
              </button>
            </div>

            <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div v-for="detail in userDetails" :key="detail.key" class="bg-gray-50 p-4 rounded-lg">
                <h3 class="text-sm font-medium text-gray-500">{{ detail.key }}</h3>
                <p class="mt-1 text-lg text-gray-900 wrap-anywhere">{{ detail.value }}</p>
              </div>
            </div>
          </div>

          <div v-else class="text-center py-12">
            <p class="text-gray-500">No user selected</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'UserDetails'
}
</script>