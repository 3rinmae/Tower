<template>
  <!-- <div v-if="commentProp.eventId == " class="bg-light shadow">
    <div class="col-1">
      <img :src="commentProp.creator.imgUrl" alt="comment creator picture" :title="commentProp.creator.name"
        class="creatorImg rounded-circle">
    </div>
    <div class="col-11">
      <p>
        {{ commentProp.creator.name }}
      </p>
      <p>
        {{ commentProp.body }}
      </p>
    </div>
  </div> -->
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
export default {
  props: { commentProp: { type: Comment, required: true } },
  setup(props) {
    return {
      account: computed(() => AppState.account)
    }
  }
};
</script>


<style lang="scss" scoped>
.creatorImg {
  height: 5rem;
  width: 5rem;
  object-fit: cover;
  position: center;
}
</style>