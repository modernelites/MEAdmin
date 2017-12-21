<template>
  <div>
      <UEditor :defaultMsg=defaultMsg :config=config ref="ue"></UEditor>
          <button @click="getUEContent()">获取内容</button>
  </div>
</template>

<script>
import UEditor from "@/components/ueditor/ueditor";
export default {
  name: "teaching",
  data(){
    return{
      defaultMsg: '',
        config: {
          // initialFrameWidth: null,
          // initialFrameHeight: 350
        }
    }
  },
  components: {
    UEditor
  },
  methods: {
      getUEContent() {
        let content = this.$refs.ue.getUEContent();
        console.log(content)
      }
  }
};
</script>

<style>

</style>
