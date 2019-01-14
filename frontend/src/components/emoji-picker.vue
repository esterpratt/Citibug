<template>
  <div class="emoji-picker">
    <div v-for="emoji in emojis" :key="emoji" @click="pickEmoji(emoji)">{{emoji}}</div>
  </div>
</template>

<script>
export default {
  props: {
    value: String
  },

  data() {
    return {
      emojis: [
        "👳",
        "🧕",
        "👵",
        "👴",
        "👧🏿",
        "👨🏿",
        "🧑",
        "👩",
        "👶",
        "😺",
        "🤖",
        "👽"
      ]
    };
  },

  methods: {
    pickEmoji(emoji) {
      this.$emit("input", emoji);
    }
  }
};
</script>

<style>
</style>
