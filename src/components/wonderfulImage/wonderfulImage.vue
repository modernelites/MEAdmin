<template>
  <div class="image_wrapper">
    <div class="conmon_nav">
      <div class="right_area">
        <a href="javascript:;" class="cmomon_add_icon common_icon" @click="play=true" />
        <!-- <a href="javascript:;" class="cmomon_mod_icon common_icon" />
        <a href="javascript:;" class="cmomon_del_icon common_icon" @click="deleteTypeMul"/> -->
      </div>
    </div>
    <div class="common_wrapper">
      <div class="common_table">
        <table class="table">
          <thead> 
            <tr>
              <th>
                <input type="checkbox" name="checkbox">
              </th>
              <th>名称</th>
              <th>数量</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in imgList" :key="item.index">
              <td>
                <input type="checkbox" name="imgTypeName" :value="item.ImgTypeID" >
              </td>
              <!-- <td @click="imgDetail(item.ImgTypeID)">{{item.ImgTypeName}}</td> -->
              <td><router-link :to="'wonderfulImage/detail/'+item.ImgTypeID">{{item.ImgTypeName}}</router-link></td>
              <td>{{item.Img_List.length}}</td>
              <!-- <td>
                <a href="javascript:;" class="common_icon cmomon_mod_icon" @click="p(item)"></a>
              </td> -->
              <td>
                <a href="javascript:;" class="common_icon cmomon_del_icon" @click="deleteType(item)"></a>
              </td>
              <td></td>
            </tr>
          </tbody>
        </table>

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
                <el-upload :action="imgUploadUrl" list-type="picture-card" 
                  :on-remove="removeLog" 
                  :on-change='fileAdd'
                  :multiple="true" 
                  :http-request='uploadImg'
                  :file-list="d_imgList"
                  :show-file-list="true" 
                  class="upload">
                  <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible" size="tiny">
                  <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
  
                <div class="tips">*1,请上传jpg或png格式的图片。2,建议上传宽度大于1920px的图片</div>
              </div>
              
              <button class="confirm" @click="confirm_upload" >确认</button>
            </div>
          </div>
        </div>
      </div>


<!-- <img-detail></img-detail> -->

    </div>
  </div>
</template>

<script>
import lrz from "../../../node_modules/lrz/dist/lrz.all.bundle";
import imgDetail from "../wonderfulImage/wonderfulImageDetail"
export default {
  name: "wonderfulImage",
  data() {
    return {
      play: false,
      courseID: "0",
      playType: true,
      imgList: {},
      imgUrl: "",
      dialogImageUrl: "",
      dialogVisible: false,
      imgUploadUrl: "",
      imgTypeName: "",
      d_imgList: []
    };
  },
  mounted() {
    this.$http.get(this.ApiUrl + "/me/file/Images_List").then(
      response => {
        this.imgList = response.data.Data;
        console.log(this.imgList);
      },
      response => {
        // error callback
      }
    );
  },
  components:{
    imgDetail
  }
  ,
  methods: {
    show: function(msg) {
      console.log(msg);
      if (this.multipleSelection[0] === undefined) {
        console.log("no one");
      } else {
        console.log(this.multipleSelection[0].index);
      }
    },
    selectChange: function(val) {
      this.multipleSelection = val;
      console.log(this.multipleSelection);
      // console.log(this.multipleSelection[0].name);
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
      if (!/(.*)+\.(jpg|png)$/i.test(file.name)) {
        alert("格式错误，请上传jpg或者png格式的图片");
        return;
      } else {
        const fileName = request.file.name;
        lrz(file, { width: 1920 })
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
      imgDetail.ImgTypeID = this.ImgTypeID;
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
      const delTypeID = { ImgTypeID: item.ImgTypeID };
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
    deleteTypeMul() {},
    removeLog(obj) {
      console.log("delete", obj.id);
      const delImgID = { FileID: obj.id };
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
    imgDetail(id){
      
      console.log(id);
    }
  }
};
</script>
<style scoped>
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
.imgUpload .content .img-upload .img .tips{
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
</style>
