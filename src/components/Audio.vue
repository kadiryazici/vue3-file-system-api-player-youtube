<template>
   <teleport to="body">
      <span class="d-none"></span>
   </teleport>
</template>

<script lang="ts" setup>
import { defineComponent } from 'vue';
import store from '@/store'
export default defineComponent({
   name: 'Audio',
});

store.state.audio.onplay = () => {
   store.commit('setPlaying', true);
};
store.state.audio.onpause = () => {
   store.commit('setPlaying', false);
};
store.state.audio.ontimeupdate = () => {
   store.commit('setCurrentTime', store.state.audio.currentTime);
   store.commit('setDuration', store.state.audio.duration);
};
store.state.audio.onended = () => {
   store.dispatch('PlayNext');
};

</script>


<style lang="scss" scoped>
.player {
   background-color: $purple;
}
</style>