<template>
  <div>
    <div id="editorElem" style="text-align:left" @input="result"></div>
    <!-- <button v-on:click="getContent">查看内容</button> -->
  </div>
</template>

<script>
  import E from 'wangeditor'
  var editor = new E('#editorElem')
  export default {
    name: 'editor',
    props: ['Brief'],
    data() {
      return {
        editorContent: ''
      }
    },
    methods: {
      result() {
        this.$emit('input', this.editorContent)
      }
    },
    mounted() {
      editor.customConfig.onchange = (html) => {
        this.editorContent = html
        this.$emit('listenCourseBrief', this.editorContent)
      }
      editor.customConfig.uploadImgShowBase64 = true;
      editor.create()
      editor.txt.html(this.Brief);
    },
    watch: {
      // 通过这种语法来watch就行，文档里有。。。看需求，还可以直接watch data，使用deep:true来深度观察
      Brief: {
        handler: (val, oldVal) => {
          editor.txt.html(val);
          //要执行的任务
          //这里不知道怎么才能修改到this.data的数据，有知道的麻烦告知
          //现在知道的就是通过直接修改Store.state的方式来更新数据，当然效果和修改this.data是一样的
        },
        // 深度观察
        deep: true
      }
    }
  }
</script>

<style scoped>
</style>
