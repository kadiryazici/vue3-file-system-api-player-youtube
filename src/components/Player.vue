<template>
   <div class="w-100 player d-flex align-items-center justify-content-center">
      <div v-if="$store.state.selected" class="wrapper d-block text-center">
         <div class="py-3">{{ removeExtension($store.state.name) }}</div>
         <Controls />
      </div>
      <div v-else>
         <h2>PLEASE SELECT A SONG</h2>
      </div>
   </div>
</template>

<script lang="ts" setup>
import { defineComponent, defineAsyncComponent } from 'vue';
export { secondToMinute, removeExtension } from '@/lib'

export default defineComponent({
   name: 'Player',
   components: {
      Controls: defineAsyncComponent(() => import('@/components/Controls.vue'))
   },
});

</script>


<style lang="scss" scoped>
.player {
   background-color: $purple;
   .wrapper {
      max-width: 700px;
      width: 100%;
   }
}
</style>