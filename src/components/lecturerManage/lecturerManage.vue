<template>
  <div class="lecturerManage">
    <div class="conmon_nav">
      <ul class="common_list clearfix">
        <li class="common_item"><a href="javascript:;"></a></li>
        <li class="common_item"><a href="javascript:;"></a></li>
        <li class="common_item"><a href="javascript:;"></a></li>
        <li class="common_item"><a href="javascript:;"></a></li>
        <li class="common_item"><a href="javascript:;"></a></li>
        <li class="common_item"><a href="javascript:;"></a></li>
      </ul>
      <div class="right_area">
        <a href="javascript:;" class="cmomon_add_icon common_icon" @click="showTeacherEdit()"></a>
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
              <input type="checkbox" name="checkbox"> 序号
            </th>
            <th>姓名</th>
            <!--<th>头像</th>-->
            <th>联系方式</th>
            <!--<th>介绍</th>-->
            <th></th>
            <th></th>
            <th></th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(m,index) in Teacher_Items">
            <td>
              <input type="checkbox" name="checkbox">{{index + 1}}
            </td>
            <td v-text="m.TeacherName"></td>
            <td v-text="m.Phone"></td>
            <!--<td>圆圈图标</td>-->
            <td></td>
            <td><a href="javascript:;" class="common_icon cmomon_mod_icon" @click="showTeacherEdit(m)"></a></td>
            <td><a href="javascript:;" class="common_icon cmomon_del_icon" @click="Teacher_Del(m)"></a></td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!--教师编辑-->
    <div class="modal_wrapper" v-show="showEdit">
      <transition name="fade">
        <div v-show="showEdit" class="mask"></div>
      </transition>
      <transition name="course-fade-con">
        <div v-show="showEdit" class="modal_content">
          <div class="modal_header">
            <div class="title">添加/编辑教师 </div>
            <a href="javascript:;" class="modal_header_close" @click="showEdit=false"></a>
          </div>
          <div class="modal_middle" style="height: 500px;overflow-y: scroll;">
            <div class="modal_row">
              <div class="row_left">
                教师名称
              </div>
              <div class="row_right">
                <input type="text" name="text" v-model="Teacher.TeacherName">
              </div>
            </div>
            <div class="modal_row">
              <div class="row_left">
                联系方式
              </div>
              <div class="row_right">
                <input type="text" name="text" v-model="Teacher.Phone">
              </div>
            </div>
            <div class="modal_row">
              <div class="row_left">
                教师图片
              </div>
              <div class="row_right">
                <file-upload v-on:listenFileUpload="GetFileID" :FilePath="Teacher.FilePath"></file-upload>
              </div>
            </div>
            <div class="modal_row">
              <div class="row_left">
                简介
              </div>
              <div class="row_right">
                <!-- 富文本 start -->
                <editor v-on:listenCourseBrief="GetBrief" :Brief="Brief"></editor>
                <!-- 富文本 end -->
              </div>
            </div>
          </div>
          <div class="modal_bottom">
            <a class="btn confirm_btn" href="javascript:;" @click="Teacher_Edit()"> 确定</a>
            <a class="btn close_btn" href="javascript:;" @click="showEdit=false"> 取消</a>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
  import Editor from '../Editor/Editor.vue';
  import fileUpload from '@/components/fileUpload/fileUpload';

  export default {
    name: 'hello',
    data() {
      return {
        Teacher_Items: [],
        showEdit: false,
        Teacher: {TeacherID: 0, TeacherName: '', Phone: '', FilePath: '', Brief: "", FileID: 0},
        Brief: ""
      }
    },
    methods: {
      Teacher_List: function () {
        this.$http.get(this.ApiUrl + "/me/Teacher/Teacher_List?Teachers=").then(response => {
          this.Teacher_Items = response.data.Data;
        }, response => {
          // error callback
        })
      },
      GetBrief: function (data) {
        this.Teacher.Brief = data;
      },      // 获取组件上传的文件ID
      GetFileID: function (data) {
        this.Teacher.FileID = data.Data[0];
      },
      Teacher_Edit: function () {
        if (!this.Teacher.TeacherName) {
          this.$layer.alert("请输入教师名称!");
          return;
        }
        this.$http.post(this.ApiUrl + "/me/Teacher/Teacher_Edit", this.Teacher).then(response => {
          if (this.Teacher.TeacherID == 0) {
            this.Teacher_Items.push(this.Teacher);
          } else {
            this.Teacher.TeacherID = response.data.Data;
          }
          this.showEdit = false;
          this.Teacher = {TeacherID: 0, TeacherName: '', Phone: '', FilePath: '', Brief: "", FileID: 0};
        }, response => {
          // error callback
        })
      },
      showTeacherEdit: function (m) {
        this.showEdit = true;
        this.Brief = "";
        this.Teacher = {TeacherID: 0, TeacherName: '', Phone: '', FilePath: '', Brief: "", FileID: 0};
        if (m) {
          this.Brief = m.Brief;
          this.Teacher = m;
        }
      },
      Teacher_Del:function (m) {
        let obj=this;
        let param = m;
        let ApiUrl = this.ApiUrl;
        let http = this.$http;
        let layer = this.$layer;
        let id = layer.confirm("确定要删除吗?", {title: '删除课程'}, function (id) {
          http.post(ApiUrl + "/me/Teacher/Teacher_Del", param).then(response => {
            obj.Teacher_List();
            layer.closeAll();
          }, response => {
            // error callback
          })
        }, function () {
          layer.closeAll();
        });
      }
    },
    mounted() {
      this.Teacher_List();
    },
    components: {
      editor: Editor,
      fileUpload: fileUpload
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
    transition: all .3s linear;
  }

  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }

  .course-fade-con-enter-active,
  .course-fade-con-leave-active {
    transition: all .2s
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
    background: rgba(0, 0, 0, .6);
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
    content: ' ';
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
    content: ' ';
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
    z-index: 99999
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
    opacity: .8;
    transition: all .3s ease;
  }

  .teacher_modal .teacher_close_btn:hover {
    opacity: 1;
  }

  .teacher_modal .teacher_close_btn:after {
    content: ' ';
    display: block;
    width: 2px;
    height: 16px;
    background: #fff;
    position: absolute;
    left: 50%;
    transform: rotate(45deg);
  }

  .teacher_modal .teacher_close_btn:before {
    content: ' ';
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
    -webkit-transition: all .3s ease;
    transition: all .3s ease;
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
    opacity: .8;
  }

  .modal_wrapper .modal_header_close:hover {
    opacity: 1;
  }

  .modal_wrapper .modal_header_close:after {
    content: ' ';
    display: block;
    width: 2px;
    height: 22px;
    background: #fff;
    position: absolute;
    left: 50%;
    transform: rotate(45deg);
  }

  .modal_wrapper .modal_header_close:before {
    content: ' ';
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
    background-image: url('./../../assets/img/downArrow.png');
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
    transition: all .3s ease;
    margin: 0 15px;
  }

  .modal_bottom .btn:hover {
    background: #068fe7;
  }

</style>

