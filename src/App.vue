<template>
  <div id="nav">
    <router-view />
  </div>
</template>

<script lang="ts" setup>
import { defineComponent } from 'vue'

export default defineComponent({

})

</script>

<style lang="scss">
@import url("https://cdn.jsdelivr.net/npm/bootstrap-4-grid@3.4.0/css/grid.min.css");
@import url("https://fonts.googleapis.com/css2?family=Manrope:wght@500&display=swap");
@import url("https://fonts.googleapis.com/icon?family=Material+Icons");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Manrope", sans-serif;
}

button {
  border: none;
  background-color: $purple;
  color: $dark;
  padding: 5px 10px;
  border-radius: 10px;
  cursor: pointer;
  outline: none;

  &:hover {
    outline: none;
  }

  &:active {
    outline: none;
    box-shadow: 0px 0px 20px 1px $purple;
    color: $white;
  }
}
</style>
