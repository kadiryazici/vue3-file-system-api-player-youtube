<template>
   <div class="controls">
      <!-- DETAILS -->
      <div class="d-flex flex-nowrap align-items-center">
         <span class="time py-3">{{ secondToMinute($store.state.currentTime) }}</span>
         <div @mouseup="handleMouseUp" class="progress w-100 mx-2">
            <div class="bar" :style="style"></div>
         </div>
         <span class="time left py-3">{{ secondToMinute($store.state.duration) }}</span>
      </div>

      <!-- CONTROLS -->
      <div class="controls d-flex align-items-center w-100 justify-content-center">
         <button
            :class="[{ active: $store.state.loop }, 'mr-auto play-pause material-icons']"
            @click="$store.commit('toggleLoop')"
         >loop</button>

         <button @click="$store.dispatch('PlayPrevious')" class="material-icons">skip_previous</button>

         <button @click="$store.commit('togglePlaying')" class="play-pause material-icons">
            <template v-if="$store.state.playing">pause</template>
            <template v-else>play_arrow</template>
         </button>

         <button @click="$store.dispatch('PlayNext', true)" class="material-icons">skip_next</button>

         <button @click="$store.commit('toggleMuted')" class="ml-auto play-pause material-icons">
            <template v-if="$store.state.muted">volume_off</template>
            <template v-else>volume_up</template>
         </button>
      </div>
   </div>
</template>

<script lang="ts" setup>
import { defineComponent, reactive, watchEffect } from 'vue';
export { secondToMinute } from '@/lib'
import store from '@/store';

export default defineComponent({
   name: 'Controls',
   components: {
   },
});

export const style = reactive({
   width: 0 + '%',
})

watchEffect(() => {
   style.width = store.state.currentTime / store.state.duration * 100 + '%';
})

export const handleMouseUp = (e: MouseEvent) => {
   if (e.currentTarget instanceof HTMLElement) {
      const { x, width } = e.currentTarget.getBoundingClientRect();
      const { clientX } = e;
      const startX = clientX - x;
      const yuzde = Math.floor(startX / width * 100);
      const duration = store.state.duration;
      store.state.audio.currentTime = duration / 100 * yuzde;
   }
}
</script>


<style lang="scss" scoped>
.time {
   min-width: 50px;
   &.left {
      text-align: right;
   }
}

.progress {
   border: 1px solid $dark;
   height: 10px;
   border-radius: 10px;
   background-color: $dark;
   padding: 1px 1px;
   cursor: pointer;
   .bar {
      background-color: $purple;
      height: 100%;
      border-radius: 10px;
   }
}

button {
   font-size: 35px;
   &.play-pause {
      font-size: 45px;
   }
}

.active {
   color: $white;
}
</style>