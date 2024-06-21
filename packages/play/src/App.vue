<script setup lang="ts">
</script>

<template>
  <div class="app">
    <yo-button type="default" size="primary"> Test </yo-button>
    <yo-collapse  :modelValue="['a']">
      <yo-collapse-item title="标题1" name="a">
        <div>内容1</div>
      </yo-collapse-item>
      <yo-collapse-item title="标题2" name="b">
        <div>内容2</div>
      </yo-collapse-item>
      <yo-collapse-item title="标题3" name="c" disabled>
        <div>内容3</div>
      </yo-collapse-item>
      <yo-collapse-item title="标题4" name="d">
        <div>内容4</div>
      </yo-collapse-item>
    </yo-collapse>
  </div>
</template>

<style scoped>
.app {
  display: flex;
  justify-content: center
}
</style>
