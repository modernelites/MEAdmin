<template>
  <div>
    <div id="fileUploadContent" class="fileUploadContent">
      <!--<div class="uploadBts">
            <div>
                <div class="selectFileBt">选择文件</div>
            </div>
            <div>
            <i class="iconfont icon-shangchuan"></i>
            </div>
        </div>
        <div class="subberProgress">
            <div class="progress">
                <div>30%</div>
            </div>
        </div>
        <div class="box">
            <div class="fileItem">
                <div class="imgShow">
                    <div class="fileType">txt</div>
                    <i class="iconfont icon-wenjian"></i>
                </div>
                <div class="progress">
                    <div class="progress_inner error"></div>
                </div>
                <div class="status">
                    <i class="iconfont icon-shanchu"></i>
                </div>
                <div class="fileName">
                   qwertyuiopasdfghjklzxcvbnm.jpg
                </div>
            </div>
            <div class="fileItem">
                <div class="imgShow">
                    <div class="fileType">jpg</div>
                    <i class="iconfont icon-wenjian"></i>
                </div>
                <div class="progress">
                    <div class="progress_inner error"></div>
                </div>
                <div class="status">
                    <i class="iconfont icon-shanchu"></i>
                </div>
                <div class="fileName">
                    qwertyuiopasdfghjklzxcvbnm.jpg
                </div>
            </div>
            <div class="fileItem">
                <div class="imgShow">
                    <img src="404bg.jpg"/>
                </div>
                <div class="progress">
                    <div class="progress_inner error"></div>
                </div>
                <div class="status">
                    <i class="iconfont icon-shanchu"></i>
                </div>
                <div class="fileName">
                    qwertyuiopasdfghjklzxcvbnm.jpg
                </div>
            </div>

        </div>-->
    </div>
    <!--<div id="filepath">{{FilePath}}</div>-->
  </div>
</template>
<script>
  import myfun1 from './../../../static/lib/FileUpload/js/fileUpload.js';

  export default {
    props: ['FilePath'],
    data() {
      return {
        //FilePath:""
      }
    },
    methods: {
      fileUploadInit() {
        $("#fileUploadContent").initUpload({
          "uploadUrl": "http://172.16.0.111:2017/me/file/File_Upload", //上传文件信息地址
          //"progressUrl": "#", //获取进度信息地址，可选，注意需要返回的data格式如下（{bytesRead: 102516060, contentLength: 102516060, items: 1, percent: 100, startTime: 1489223136317, useTime: 2767}）
          "showSummerProgress": false,//总进度条，默认限制
          //"size":350,//文件大小限制，单位kb,默认不限制
          "maxFileNumber": 1,//文件个数限制，为整数
          //"filelSavePath":"",//文件上传地址，后台设置的根目录
          //"beforeUpload":beforeUploadFun,//在上传前执行的函数
          "onUpload": this.onUploadFun,//在上传后执行的函数
          autoCommit: true,//文件是否自动上传
          "fileType": ['png', 'jpg']//文件类型限制，默认不限制，注意写的是文件后缀
        }),
          function beforeUploadFun(opt) {
            //opt.otherData = [{ "name": "你要上传的参数", "value": "你要上传的值" }];
          }

      },
      onUploadFun(opt, data) {
        this.$emit('listenFileUpload', data);
      }
    },
    watch: {
      // 通过这种语法来watch就行，文档里有。。。看需求，还可以直接watch data，使用deep:true来深度观察
      FilePath: {
        handler: (val, oldVal) => {
          $(".box").html("<img style='width: 100%;height: 100%' src='" + val + "' >");
          //要执行的任务
          //这里不知道怎么才能修改到this.data的数据，有知道的麻烦告知
          //现在知道的就是通过直接修改Store.state的方式来更新数据，当然效果和修改this.data是一样的
        },
        // 深度观察
        deep: true
      }
    },
    mounted() {
      this.fileUploadInit();
    //   console.log(this.FilePath)
    }
  }

</script>
<style>
  @import "./../../../static/lib/FileUpload/css/iconfont.css";
  @import "./../../../static/lib/FileUpload/css/fileUpload.css";

  #fileUploadContent {
    width: 80%;
    margin: 20px auto;
  }
</style>
