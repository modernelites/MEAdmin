<template>
  <div class="banner">
    <div class="conmon_nav">
      <ul class="common_list clearfix">
        <li class="common_item">
          <a href="javascript:;"></a>
        </li>
        <li class="common_item">
          <a href="javascript:;"></a>
        </li>
        <li class="common_item">
          <a href="javascript:;"></a>
        </li>
        <li class="common_item">
          <a href="javascript:;"></a>
        </li>
        <li class="common_item">
          <a href="javascript:;"></a>
        </li>
        <li class="common_item">
          <a href="javascript:;"></a>
        </li>
      </ul>
      <div class="right_area">
        <a href="javascript:;" class="cmomon_add_icon common_icon" @click="showBannerEdit()"></a>
        <a href="javascript:;" class="cmomon_mod_icon common_icon"></a>
        <a href="javascript:;" class="cmomon_del_icon common_icon"></a>
      </div>
    </div>
    <div class="common_wrapper">
      <div class="common_table">
        <table class="table">
          <thead>
            <tr>
              <th>
                <input type="checkbox" name="checkbox"> 序号</th>
              <th>名称</th>
              <th>内容</th>
              <th>类型</th>
              <th>显示</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody v-for="item,index in BannerList">
            <tr>
              <td>
                <input type="checkbox" name="checkbox">{{index+1}}</td>
              <td>{{item.BannerName}}</td>
              <td>{{item.BannerUrl}}</td>
              <td>{{item.BannerType}}</td>
              <td>
                <input type="checkbox" v-model="item.Is_Show" @change="Banner_Disable(item.BannerID)"/>
              </td>
              <td>
                <a href="javascript:;" class="common_icon cmomon_mod_icon" @click="showBannerEdit(index+1)"></a>
              </td>
              <td>
                <a href="javascript:;" class="common_icon cmomon_del_icon" @click="delBanner(item.BannerID)"></a>
              </td>
            </tr>

          </tbody>
        </table>
      </div>
    </div>





    <div class="modal_wrapper" v-show="banner_Show">
      <transition>
        <div v-show="banner_Show" class="mask"></div>
      </transition>
      <transition>
        <div v-show="banner_Show" class="modal_content">
          <div class="modal_header">
            <div class="title">添加Banner</div>
            <a href="javascript:;" class="modal_header_close" @click="banner_Show=false"></a>
          </div>
          <div class="modal_middle" style="height: 500px;overflow-y: scroll;">
            <div class="modal_row">
              <div class="row_left">
                名称
              </div>
              <div class="row_right">
                <input type="text" name="text" v-model="Banner.BannerName">
              </div>
            </div>
            <div class="modal_row">
              <div class="row_left">
                链接
              </div>
              <div class="row_right">
                <input type="text" name="text" v-model="Banner.BannerUrl">
              </div>
            </div>
            <div class="modal_row">
              <div class="row_left">
                类型
              </div>
              <div class="row_right">
                <select class="common_select" v-model="Banner.BannerType">
                  <option value="1">1
                  </option>
                  <option value="2">2</option>
                </select>
              </div>
            </div>
            <div class="modal_row">
              <div class="row_left">
                图片
              </div>
              <div class="row_right">

                <el-upload :action="imgUploadUrl" list-type="picture-card" :on-remove="removeLog" :on-change='fileAdd' :multiple="false" :http-request='uploadImg'
                  :file-list="imgUrlList" :show-file-list="true" class="upload">
                  <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible" size="tiny">
                  <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
              </div>
            </div>
          </div>
          <div class="modal_bottom">
            <a class="btn confirm_btn" href="javascript:;" @click="Banner_Edit()"> 确定</a>
            <a class="btn close_btn" href="javascript:;" @click="banner_Show=false"> 取消</a>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        Banner: {
          BannerID: '',
          BannerName: "name",
          BannerType: 1,
          BannerUrl: "",
          FileID: 1,
                  // Is_Show:true,
        },

        BannerList: {},
        BannerDetail: 'test',
        FilePath: "",
        imgUploadUrl: "",
        imgUrlList: [],
        dialogImageUrl: "",
        dialogVisible: false,
        banner_Show: false,
      };
    },
    methods: {
      Banner_List() {
        this.$http.get(this.ApiUrl + "me/Banner/Banner_List").then(
          response => {
            this.BannerList = response.data.Data;
            // console.log(this.BannerList)
          }
        )
      },
      Banner_Edit() {
        let params = this.Banner;
        this.$http.post(this.ApiUrl + "me/Banner/Banner_Edit", params).then(
          response => {
            console.log(response.data);
            this.banner_Show = false;
          },
          response => {
            console.log(response.data);
          }
        );
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      uploadImg(request) {
        const file = request.file;
        console.log(request);
        if (!/(.*)+\.(jpg|png)$/i.test(file.name)) {
          alert("格式错误，请上传jpg或者png格式的图片");
          return;
        } else {
          const fileName = request.file.name;
          lrz(file, {
              width: 2160
            })
            .then(rst => {
              const imgBase64 = {};
              imgBase64.base64Str = rst.base64;
              imgBase64.UserID = 0;
              imgBase64.SourceName = 'Banner';
              this.$http
                .post(this.ApiUrl + "me/File/File_Upload_Base64", imgBase64)
                .then(
                  response => {
                    this.Banner.FileID = response.data.Data.fileID;
                    console.log(this.Banner.FileID)
                  },
                  function () {
                    console.log("请求发送失败");
                  }
                );
            })
            .catch(err => {
              console.log(err);
            });
        }
      },
      removeLog(obj) {
        console.log("delete", obj.id);
        const delImgID = {
          FileID: obj.id
        };
        this.$http
          .post(this.ApiUrl + "me/File/Image_Del ", delImgID)
          .then(
            response => {
              console.log(response.body);
              alert("删除图片成功");
            },
            function () {
              console.log("请求发送失败");
            }
          );
      },
      fileAdd(file, fileList) {},
      showBannerEdit(index) {
        let _this = this;
        if (index) {
          console.log(this.BannerList[index - 1])
          _this.Banner.BannerID = this.BannerList[index - 1].BannerID;
          _this.Banner.BannerName = this.BannerList[index - 1].BannerName;
          _this.Banner.BannerType = this.BannerList[index - 1].BannerType;
          _this.Banner.BannerUrl = this.BannerList[index - 1].BannerUrl;
          _this.Banner.FileID = this.BannerList[index - 1].FileID;
          _this.banner_Show = true;
        } else {
          _this.banner_Show = true;
        }

      },
      delBanner(id) {
        var http = this.$http;
        let params = {};
        params.BannerID = id;
        this.$confirm('删除Banner, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          http.post(this.ApiUrl + "me/Banner/Banner_Del", params).then(
            response => {
              console.log(response.data);
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
            },
            response => {
              console.log(response.data);
            }
          )
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      Banner_Disable(id){
        let params={};
        params.BannerID = id;
       this.$http.post(this.ApiUrl + "me/Banner/Banner_Is_Disabled_Upd", params).then(
            response => {
              // console.log(response.data);
            },
            response => {
              // console.log(response.data);
            }
          )
      }

    },
    mounted() {
      this.Banner_List();
    },
    components: {

    }
  }

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .content_item {
    display: none;
  }

  .subberProgress {
    display: none !important;
  }

  .teacher_item {
    display: block;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #098fe7;
    position: relative;
    margin-left: 5px;
  }

  .content_item.active {
    display: block;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: all 0.3s linear;
  }

  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }

  .course-fade-con-enter-active,
  .course-fade-con-leave-active {
    transition: all 0.2s;
  }

  .course-fade-con-enter,
  .course-fade-con-leave-to {
    opacity: 0;
  }

  .modal_wrapper {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }

  .modal_wrapper .mask {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    background: rgba(0, 0, 0, 0.6);
  }

  .modal_wrapper .modal_content {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 60%;
    min-width: 760px;
    z-index: 2;
    transform: translate(-50%, -50%);
    background: #fff;
  }

  /* teacher_modal start */

  .modal_wrapper .teacher_add_btn {
    display: block;
    width: 35px;
    height: 35px;
    border-radius: 50%;
    background: #098fe7;
    position: relative;
  }

  .modal_wrapper .teacher_add_btn:after {
    content: " ";
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 20px;
    height: 2px;
    background: #fff;
    transform: translate(-50%, -50%);
  }

  .modal_wrapper .teacher_add_btn:before {
    content: " ";
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 2px;
    height: 20px;
    background: #fff;
    transform: translate(-50%, -50%);
  }

  .teacher_modal {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 300px;
    height: 300px;
    background: #fff;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.8);
    z-index: 99999;
  }

  .teacher_modal .teacher_header {
    position: relative;
    height: 40px;
    line-height: 40px;
    color: #fff;
    font-size: 16px;
    background: #098fe7;
    padding: 0 20px;
  }

  .teacher_modal .teacher_close_btn {
    position: absolute;
    top: 10px;
    right: 20px;
    width: 20px;
    height: 20px;
    opacity: 0.8;
    transition: all 0.3s ease;
  }

  .teacher_modal .teacher_close_btn:hover {
    opacity: 1;
  }

  .teacher_modal .teacher_close_btn:after {
    content: " ";
    display: block;
    width: 2px;
    height: 16px;
    background: #fff;
    position: absolute;
    left: 50%;
    transform: rotate(45deg);
  }

  .teacher_modal .teacher_close_btn:before {
    content: " ";
    display: block;
    width: 2px;
    height: 16px;
    background: #fff;
    position: absolute;
    left: 50%;
    transform: rotate(-45deg);
  }

  .teacher_modal .teacher_content {
    height: 210px;
    overflow: auto;
    padding: 20px;
  }

  .teacher_modal .teacher_row {
    display: flex;
    margin-bottom: 10px;
  }

  .teacher_modal .teacher_row .teacher_left {
    flex: 0 0 30px;
  }

  .teacher_modal .teacher_row .teacher_right {
    flex: 1;
  }

  .teacher_modal .teacher_modal_bottom {
    border-top: 1px solid #d8d8d8;
    text-align: center;
    padding-top: 10px;
  }

  .teacher_modal .teacher_modal_bottom .btn {
    display: inline-block;
    width: 80px;
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    color: #fff;
    background: #adadad;
    border-radius: 6px;
    -webkit-transition: all 0.3s ease;
    transition: all 0.3s ease;
    margin: 0 8px;
  }

  .teacher_modal .teacher_modal_bottom .btn:hover {
    background: #068fe7;
  }

  /* teacher_modal end */

  .modal_wrapper .modal_content .modal_header {
    height: 50px;
    line-height: 50px;
    color: #fff;
    font-size: 18px;
    background: #098fe7;
    padding: 0 25px;
    position: relative;
  }

  .modal_wrapper .modal_header_close {
    position: absolute;
    top: 10px;
    right: 20px;
    display: inline-block;
    width: 40px;
    height: 40px;
    opacity: 0.8;
  }

  .modal_wrapper .modal_header_close:hover {
    opacity: 1;
  }

  .modal_wrapper .modal_header_close:after {
    content: " ";
    display: block;
    width: 2px;
    height: 22px;
    background: #fff;
    position: absolute;
    left: 50%;
    transform: rotate(45deg);
  }

  .modal_wrapper .modal_header_close:before {
    content: " ";
    display: block;
    width: 2px;
    height: 22px;
    background: #fff;
    position: absolute;
    left: 50%;
    transform: rotate(-45deg);
  }

  .modal_wrapper .modal_content .modal_middle {
    padding: 25px;
  }

  .modal_wrapper .modal_row {
    display: flex;
    margin-bottom: 30px;
  }

  .modal_wrapper .modal_row .row_left {
    flex: 0 0 60px;
  }

  .modal_wrapper .modal_row .row_right {
    flex: 1;
  }

  .modal_wrapper .modal_row .row_right input {
    height: 40px;
    line-height: 40px;
    width: 100%;
    border-radius: 8px;
    outline: none;
    border: none;
    border: 1px solid #d8d8d8;
    padding-left: 15px;
  }

  .modal_wrapper .common_select {
    box-sizing: border-box;
    display: inline-block;
    /*background: #eee;*/
    outline: none;
    border: none;
    border: 1px solid #d8d8d8;
    padding-left: 20px;
    border-radius: 8px;
    height: 40px;
    line-height: 40px;
    width: 120px;
    background-image: url("./../../assets/img/downArrow.png");
    background-position: 90% center;
    background-repeat: no-repeat;
    -webkit-appearance: none;
    min-width: 200px;
    color: #656565;
  }

  .modal_bottom {
    text-align: center;
    padding-bottom: 30px;
  }

  .modal_bottom .btn {
    display: inline-block;
    width: 120px;
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    color: #fff;
    background: #adadad;
    border-radius: 8px;
    transition: all 0.3s ease;
    margin: 0 15px;
  }

  .modal_bottom .btn:hover {
    background: #068fe7;
  }

</style>
