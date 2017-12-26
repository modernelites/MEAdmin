<template>
  <div class="wrapper">
    <div class="conmon_nav">
      <div class="right_area">
        <a href="javascript:;" class="cmomon_add_icon common_icon" />
        <a href="javascript:;" class="cmomon_mod_icon common_icon" />
        <a href="javascript:;" class="cmomon_del_icon common_icon" />
      </div>
    </div>
    <div class="common_wrapper">
      <div class="common_table">
        <div class="common_title">精彩图集>>
          <span>{{imgTypeName}}</span>
          <a href="javascript:;" class="cmomon_mod_icon common_icon" @click="del_display = !del_display" />
          <a href="javascript:;" class="cmomon_del_icon common_icon" v-show="del_display" @click="removeImg" />
        </div>
        <div class="common_content" >
          <div class="content_wrapper" >
            <ul>
              <li v-for="item in imgUrlList">
                <input type="checkbox" class="selectItem hide" :id="item.id" :value="item.id" v-model="selectImgs" >
                <a href="javascript:;" @keydown.space.prevent="printInfo(item.id)">
                <label :for="item.id">
                     <img :src="item.url" :alt="item.NewFileName" >
                </label>
                </a>
              </li>
            </ul>
          </div>
          <button @click="printImg,play=true">添加图片</button>
          <!-- <button @click="imgDetail()">123</button> -->
        </div>
      </div>
    </div>
    <div class="msk imgUpload" v-show="play">
      <div class="content">
        <div class="title">
          <span>标题</span>
          <input type="text" v-model="imgTypeName">
          <button @click="play = false">x</button>
        </div>
        <div class="img-upload">
          <div class="img">
            <span>图片</span>
            <el-upload :action="imgUploadUrl" list-type="picture-card" :on-remove="removeLog" :on-change='fileAdd' :multiple="true" :http-request='uploadImg'
              :file-list="imgUrlList" :show-file-list="true" class="upload">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible" size="tiny">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
            <div class="tips">*1,请上传jpg或png格式的图片。2,建议上传宽度大于1920px的图片</div>
          </div>
          <button class="confirm" @click="confirm_upload">确认</button>
        </div>
      </div>
    </div>

    <div class="msk img-detail" v-show="img_detail_display">
        <button @click="img_detail_display = false">x</button>
            <div class="img_detail_wrapper">
                <img :src="img_detail_src">
            </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "wonderfulImageDetail",
  data() {
    return {
      imgList: {},
      imgUrlList: [],
      imgUploadUrl: "",
      imgTypeName: "",
      selectImgs: [],
      del_display: false,
      play: false,
      courseID: "0",
      playType: true,
      imgUrl: "",
      dialogImageUrl: "",
      dialogVisible: false,
      imgUploadUrl: "",
      img_detail_display:false,
      img_detail_src:''
    };
  },
  mounted() {
    this.$http.get(this.ApiUrl + "/me/file/Images_List").then(
      response => {
        this.imgList = response.data.Data;
        this.imgList.forEach(ele => {
          if (ele.ImgTypeID == this.$route.params.id) {
            this.imgList = ele.Img_List;
            this.imgTypeName = ele.ImgTypeName;
          }
        });
        this.imgList.forEach(ele => {
          this.imgUrlList.push({
            name: ele.NewFileName,
            url: ele.FilePath,
            id: ele.FileID
          });
        });
      },
      response => {
        // error callback
      }
    );
  },
  directives: {
  focus: {
    // 指令的定义
    inserted: function (el) {
      el.focus()
    }
  }
}
,
  methods: {
    printImg() {
      console.log(this.selectImgs);
    },
    printInfo(id) {
    //   console.log(id);
    //   console.log(this.imgUrlList);
      this.imgUrlList.forEach(ele=>{
          if (ele.id == id) {
             this.img_detail_src = ele.url;
          }
      })
      this.img_detail_display = true;
    },
    removeImg() {
      if (this.selectImgs.length > 0) {
        let delImgID = {};
        this.selectImgs.forEach(element => {
          const delImgID = {
            FileID: element
          };
          console.log(delImgID);
          this.$http
            .post(this.ApiUrl + "/me/File/Image_Del ", delImgID)
            .then(
              response => {
                console.log(response.data);
                console.log("删除图片成功");
              },
              function() {
                console.log("请求发送失败");
              }
            );
        });
        window.location.reload();
      } else {
      }
    },

    handleRemove(file, fileList) {
      // console.log("remove", file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    uploadImg(request) {
      const file = request.file;
      //   console.log(file);
      if (!/(.*)+\.(jpg|png)$/i.test(file.name)) {
        alert("格式错误，请上传jpg或者png格式的图片");
        return;
      } else {
        const fileName = request.file.name;
        lrz(file, {
          width: 1920
        })
          .then(rst => {
            console.log(rst);
            const imgBase64 = {};
            imgBase64.base64Str = rst.base64;
            this.$http
              .post(this.ApiUrl + "/me/File/File_Upload_Base64", imgBase64)
              .then(
                response => {
                  this.imgUrl += response.data.Data + ",";
                  console.log(this.imgUrl);
                },
                function() {
                  console.log("请求发送失败");
                }
              );
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    fileAdd(file, fileList) {},
    confirm_upload() {
      const imgDetail = {};
      imgDetail.ImgTypeID = this.$route.params.id;
      imgDetail.FileIDs = this.imgUrl;
      imgDetail.ImgTypeName = this.imgTypeName;
      console.log("detail", imgDetail);
      this.$http
        .post(this.ApiUrl + "/me/File/Image_Add", imgDetail)
        .then(
          response => {
            console.log(response.body);
            this.play = false;
            window.location.reload();
          },
          function() {
            console.log("请求发送失败");
          }
        );
    },
    p(obj) {
      console.log("obj", obj);
      this.d_imgList = [];
      this.ImgTypeID = obj.ImgTypeID;
      obj.Img_List.forEach(element => {
        this.d_imgList.push({
          name: element.NewFileName,
          url: element.FilePath,
          id: element.FileID
        });
      });
      this.imgTypeName = obj.ImgTypeName;
      this.play = true;
    },
    deleteType(item) {
      console.log(item.ImgTypeID);
      const delTypeID = {
        ImgTypeID: item.ImgTypeID
      };
      this.$http
        .post(this.ApiUrl + "/me/file/ImgType_Del", delTypeID)
        .then(
          response => {
            console.log(response.body);
            alert("删除成功");
          },
          function() {
            console.log("请求发送失败");
          }
        );
    },
    removeLog(obj) {
      console.log("delete", obj.id);
      const delImgID = {
        FileID: obj.id
      };
      this.$http
        .post(this.ApiUrl + "/me/File/Image_Del ", delImgID)
        .then(
          response => {
            console.log(response.body);
            alert("删除图片成功");
          },
          function() {
            console.log("请求发送失败");
          }
        );
    },
    imgDetail(id) {
      console.log(this.selectImgs);
    }
  }
};
</script>

<style>
.wrapper {
  height: 100%;
  overflow: auto;
}

.wrapper .common_wrapper .common_table .common_title {
  height: 40px;
  line-height: 40px;
  background-color: #a5c8dc;
  padding-left: 40px;
}

.wrapper .common_wrapper .common_table .common_title .common_icon {
  float: right;
  padding-top: 26px;
  margin-right: 13px;
}

.wrapper .common_wrapper .common_table .common_content {
  padding-top: 10px;
  width: 96%;
  margin: 0 auto;
}

.wrapper .common_wrapper .common_table .common_content .content_wrapper {
  height: 100%;
  position: relative;
  /* background-color: #fff; */
}

.wrapper .common_wrapper .common_table .common_content li {
  float: left;
  padding: 5px;
  position: relative;
}

.wrapper .common_wrapper .common_table .common_content li .selectItem {
  position: absolute;
  bottom: 10px;
  right: 7px;
}

.wrapper .common_wrapper .common_table .common_content li .selectItem:checked {
  display: block;
}

.wrapper .common_wrapper .common_table .common_content li img {
  width: 172px;
  height: 140px;
}

.wrapper .common_wrapper .common_table button {
  margin-left: 38%;
  width: 120px;
  height: 40px;
  border: none;
  outline: none;
  background-color: #1c91e4;
  color: #fff;
  font-size: 14px;
  border-radius: 6px;
}

.hide {
  display: none;
}

.msk {
  background: rgba(0, 0, 0, 0.6);
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
}

.imgUpload .content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 720px;
  height: 542px;
  background-color: #fff;
  padding: 10px;
  z-index: 10;
}

.imgUpload .content .title,
.imgUpload .content .img-upload .img {
  width: 88%;
  margin: 0 auto;
  display: flex;
  height: 40px;
  line-height: 40px;
  margin-top: 20px;
}

.imgUpload .content .title span {
  flex: 1;
  font-size: 14px;
}

.imgUpload .content .title input {
  flex: 10;
  background-color: #efefef;
  border: none;
  outline: none;
  border-radius: 4px;
  height: 30px;
  margin-top: 5px;
  padding: 8px;
}

.imgUpload .content .title button {
  border: none;
  outline: none;
  position: absolute;
  top: 10px;
  right: 16px;
  font-size: 18px;
}

.imgUpload .content .img-upload .img .tips {
  color: #f00;
  position: absolute;
  bottom: 80px;
  left: 120px;
  font-size: 12px;
}

.imgUpload .content .img-upload .img .upload {
  flex: 8;
  margin-left: 26px;
  height: 330px;
  overflow: auto;
  background-color: #efefef;
  padding: 10px;
  border-radius: 6px;
}

.imgUpload .content .img-upload .confirm {
  position: absolute;
  left: 50%;
  bottom: 30px;
  transform: translateX(-50%);
  border: none;
  outline: none;
  width: 160px;
  height: 46px;
  background-color: #f7e53b;
  font-weight: bold;
  font-size: 16px;
  border-radius: 10px;
}

.wrapper .img-detail .img_detail_wrapper{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  
}
.wrapper .img-detail button{
    position: absolute;
    right: 10px;
    border: none;
    outline: none;
    background-color: transparent;
    color: #fff;
    display: inline;
    font-size: 24px;
    z-index: 999;
}
</style>
