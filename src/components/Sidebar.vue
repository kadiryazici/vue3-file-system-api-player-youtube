<template>
   <div class="sidebar">
      <div class="p-2 text-right">
         <button @click="$store.dispatch('SelectFolder')">SELECT FOLDER</button>
      </div>
      <div class="item-wrapper">
         <ul>
            <li
               @click="$store.dispatch('playFile', index)"
               :class="['py-3 px-2 item', { active: $store.state.name === value.name }]"
               v-for="(value, index) in $store.state.files"
               :key="value.name"
            >
               <small>{{ removeExtension(value.name) }}</small>
            </li>
         </ul>
      </div>
   </div>
</template>

<script lang="ts" setup>
import { defineComponent } from 'vue';
export { removeExtension } from '@/lib'

export default defineComponent({
   name: 'Sidebar',
   components: {
   },
});
</script>

<style lang="scss" scoped>
.sidebar {
   width: 100%;
   max-width: 300px;
   background-color: $dark;
   max-height: calc(100vh);
   overflow-y: hidden;
}

.item-wrapper {
   max-height: calc(100vh - 44px);
   overflow-y: auto;
}

.item {
   color: $white;
   cursor: pointer;
   &:hover,
   &.active {
      color: $dark;
      background-color: $purple;
   }
}
</style>