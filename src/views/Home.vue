<template>
  <div class="home d-flex flex-nowrap align-items-stretch">
    <Sidebar />
    <Player />
    <Audio />
  </div>
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent } from 'vue';

export default defineComponent({
  name: 'Home',
  components: {
    Sidebar: defineAsyncComponent(() => import('@/components/Sidebar.vue')),
    Player: defineAsyncComponent(() => import('@/components/Player.vue')),
    Audio: defineAsyncComponent(() => import('@/components/Audio.vue')),
  },
});
</script>

<style lang="scss" scoped>
.home {
  max-height: 100vh;
  height: 100vh;
  max-width: 100vw;
  width: 100vw;
}
</style>