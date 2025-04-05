<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const goToDashboard = () => {
  router.push('/');
};
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center px-4">
    <div class="text-center">
      <h1 class="text-9xl font-bold text-blue-600">404</h1>
      <h2 class="mt-4 text-3xl font-semibold text-gray-900">Page Not Found</h2>
      <p class="mt-2 text-lg text-gray-600">The page you're looking for doesn't exist or has been moved.</p>
      <button
        @click="goToDashboard"
        class="mt-8 px-6 py-3 text-lg font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
      >
        Go to Dashboard
      </button>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'NotFound'
}
</script> 