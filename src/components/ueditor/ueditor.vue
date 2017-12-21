<template>
      <div>
 <script id="editor" type="text/plain" ></script>
            <!-- <button @click="getUEContent()">获取内容</button> -->
    </div>
</template>

<script>
export default {   
  name: "UE",
  data() {
    return {
      editor: null
    };
  },
  props: {
    defaultMsg: {
      // type: String
    },
    config: {
      type: Object
    }
  },
  mounted () {
    const _this = this;
    this.editor = UE.getEditor("editor", this.config); // 初始化UE
    this.editor.addListener("ready", function() {
      _this.editor.setContent(_this.defaultMsg); // 确保UE加载完成后，放入内容。
      // console.log('ueditor',this.defaultMsg);
    });
  },
  methods: {
    getUEContent() {
      // 获取内容方法
      this.$emit("listenCourseBrief", this.editorContent);
      return this.editor.getContent();
    }
  },
  watch:{
      defaultMsg: {
        handler: (val, oldVal) => {
          let _this = this;
            _this.editor.setContent(val);
      // console.log('ueditorWatch',val);
          // console.log('editorWatch',val);
        },
        // 深度观察
        deep: true
      }
  },
  destroyed() {
    this.editor.destroy();
  }
};
</script>