<template>
  <section class="comment-preview">
    <div class="user-img">{{(comment.user.length) ? comment.user[0].emoji : '?'}}</div>
    <div>
      <div>
        <p class="user-name">{{(comment.user.length) ? comment.user[0].name : 'guest'}}</p>
        <p class="comment-time">{{comment.at | relative-time}}</p>
      </div>
      <p class="comment-txt">{{comment.txt}}</p>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    comment: Object
  }
};
</script>

<style>
</style>
