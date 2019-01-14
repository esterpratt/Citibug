<template>
  <div class="sure-validation">
    <h2>Are you sure?</h2>
    <div class="sure-btns">
      <button @click="$emit('closeModal', 'isSureModalOpen')">Cancel</button>
      <button @click="yesCB">Yes</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    yesCB: Function
  }
};
</script>

<style>
</style>
