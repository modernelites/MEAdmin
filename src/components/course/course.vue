<template>
  <div class="courseList">
    <div class="conmon_nav">
      <ul class="common_list clearfix">
        <li v-for="m in CourseType_Items" class="common_item" @click="CourseTypeSelect(m.CourseTypeID)"
            :class="{active:selectType===m.CourseTypeID}">
            <a href="javascript:;">{{m.CourseTypeName}}</a>
        </li>
      </ul>
      <div class="right_area">
        <a href="javascript:;" class="cmomon_add_icon common_icon" @click="showCourseEdit()"></a>
        <a href="javascript:;" class="cmomon_mod_icon common_icon"></a>
        <a href="javascript:;" class="cmomon_del_icon common_icon"></a>
      </div>
    </div>
    <!--列表-->
    <div class="common_wrapper">
      <div class="content_item active">
        <div class="common_table">
          <table class="table">
            <thead>
            <tr>
              <th>
                <input type="checkbox" name="checkbox">
              </th>
              <th>课程名称</th>
              <th>价格</th>
              <th>推荐课程</th>
              <th></th>
              <th></th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="m in Course_Items_Fillter">
              <td>
                <input type="checkbox" name="checkbox">
              </td>
              <td>{{m.CourseName}}</td>
              <td>{{m.Price}}</td>
              <td><input type="checkbox" v-model="m.Is_Recomme" @change="Course_Is_Recomme_Upd(m)"/></td>
              <td><a href="javascript:;" class="common_icon cmomon_mod_icon" @click="showCourseEdit(m)"></a></td>
              <td>
                <a href="javascript:;" class="common_icon cmomon_del_icon" @click="Course_Del(m)"></a>
                <a href="javascript:;" class="common_icon cmomon_del_icon" @click="Course_Del(m)"></a>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <!--课程编辑-->
    <div class="modal_wrapper" v-show="course_Show">
      <transition name="fade">
        <div v-show="course_Show" class="mask"></div>
      </transition>
      <transition name="course-fade-con">
        <div v-show="course_Show" class="modal_content">
          <div class="modal_header">
            <div class="title">添加课程 </div>
            <a href="javascript:;" class="modal_header_close" @click="course_Show=false"></a>
          </div>
          <div class="modal_middle" style="height: 500px;overflow-y: scroll;">
            <div class="modal_row">
              <div class="row_left">
                名称
              </div>
              <div class="row_right">
                <input type="text" name="text" v-model="Course.CourseName">
              </div>
            </div>
            <div class="modal_row">
              <div class="row_left">
                类型
              </div>
              <div class="row_right">
                <select class="common_select" v-model="Course.CourseTypeID">
                  <option v-for="m in CourseType_Items" v-bind:value="m.CourseTypeID">{{m.CourseTypeName}}
                  </option>
                </select>
              </div>
            </div>
            <div class="modal_row">
              <div class="row_left">
                价格
              </div>
              <div class="row_right">
                <input type="text" name="text" v-model="Course.Price">
              </div>
            </div>
            <div class="modal_row">
              <div class="row_left">
                教师
              </div>
              <div class="row_right" style="width: 40px;height: 40px;flex: 0;">
                <a href="javascript:;" class="teacher_add_btn" @click="teacherShow=true"></a>
              </div>
              <div class="row_right teacher_item" style="width: 35px;height: 35px;flex: 0;border-radius: 50%;border: 1px solid #eee;background-size: cover;" v-for="m in Teacher_Items"
                   v-if="m.Selected" v-bind:style="{background:'url('+m.FilePath+')'}">
                <div style="width: 36px"></div>
              </div>
            </div>
            <div class="modal_row">
              <div class="row_left">
                课程图片
              </div>
              <div class="row_right">
                <file-upload v-on:listenFileUpload="GetFileID" :FilePath="Course.FilePath"></file-upload>
              </div>
            </div>

            <div class="modal_row">
              <div class="row_left">
                简介
              </div>
              <div class="row_right">
                <!-- 富文本 start -->
                <editor v-on:listenCourseBrief="GetCourseBrief" :Brief="Brief"></editor>
                <!-- 富文本 end -->
              </div>
            </div>
            <!-- 选择教师弹出框 -->
            <transition name-fade>
              <div class="teacher_modal" v-show="teacherShow">
                <div class="teacher_header">
                  <h3 class="title">添加教师</h3>
                  <a href="javascript:;" class="teacher_close_btn" @click="teacherShow=false"></a>
                </div>
                <div class="teacher_content">
                  <div class="teacher_row" v-for="m in Teacher_Items">
                    <div class="teacher_left">
                      <input type="checkbox" name="checkbox" v-bind:value="m.TeacherID" v-model="m.Selected">
                    </div>
                    <div class="teacher_right" v-text="m.TeacherName"></div>
                  </div>
                </div>
                <div class="teacher_modal_bottom">
                  <!--<a href="javascript:;" class="btn confirm_btn" @click="teacherShow=false"> 确定</a>-->
                  <a href="javascript:;" class="btn close_btn" @click="teacherShow=false"
                     style="height: 20px;line-height: 25px;width: 70px;padding: 6px;"> 关闭</a></div>
              </div>
            </transition>
            <!-- 选择教师弹出框 -->
          </div>
          <div class="modal_bottom">
            <a class="btn confirm_btn" href="javascript:;" @click="Course_Edit()"> 确定</a>
            <a class="btn close_btn" href="javascript:;" @click="course_Show=false"> 取消</a>
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
    data() {
      return {
        selectType: 1,
        CourseType: {},
        Brief: '',
        //path: '/api/v1/help/upload/wangEditorH5File',
        Course: {
          CourseID: 0,
          CourseName: "",
          Price: 0,
          Brief: "",
          CourseTypeID: 1,
          Teachers: "",
          FileID: 0,
          FilePath: ""
        },
        CourseType_Items: [],
        Course_Items: [],
        Course_Items_Fillter: [],
        Teacher_Items: [],
        course_Show: false,
        teacherShow: false
      }
    },
    methods: {
      // 课程类型切换事件
      CourseTypeSelect(type) {
        this.selectType = type;
        this.Course_Items_Fillter = this.Course_Filler(type);
      },
      // 获取课程类型列表
      CourseType_List() {
        this.$http.get(this.ApiUrl + "/me/CourseType/CourseType_List").then(response => {
          this.CourseType_Items = response.data.Data;
          this.selectType = this.CourseType_Items[0].CourseTypeID;
          this.Course_List();
        }, response => {
          // error callback
        })
      },
      // 获取教师列表
      Teacher_List() {
        this.$http.get(this.ApiUrl + "/me/Teacher/Teacher_List?Teachers=").then(response => {
          this.Teacher_Items = response.data.Data;
        }, response => {
          // error callback
        })
      },
      // 显示课程编辑层
      showCourseEdit(m) {
        this.course_Show = true;
        if (m) {
          this.Brief = m.Brief;
          this.Course = m;
          for (var i = 0; i < this.Teacher_Items.length; i++) {
            this.Teacher_Items[i].Selected = false;
          }
          if (this.Course.Teachers) {
            var tarr = this.Course.Teachers.split(",");
            for (var j = 0; j < tarr.length - 1; j++)
              for (var i = 0; i < this.Teacher_Items.length; i++) {
                if (this.Teacher_Items[i].TeacherID == tarr[j]) {
                  this.Teacher_Items[i].Selected = true;
                }
              }
          }
        } else {
          this.Brief = "";
          this.Course = {
            CourseID:0,
            CourseName: "",
            Price: 0,
            Brief: "nihao",
            CourseTypeID: 1,
            Teachers: "",
            FileID: 0,
            FilePath: ""
          }
        }
      },
      // 课程编辑
      Course_Edit() {
        if (!this.Course.CourseName) {
          this.$layer.alert("请输入课程名称!");
          return;
        }
        if (this.Course.CourseTypeID == 0) {
          this.$layer.alert("请选择课程类型!");
          return;
        }

        var Teachers = "";
        for (var i = 0; i < this.Teacher_Items.length; i++) {
          if (this.Teacher_Items[i].Selected) {
            Teachers += this.Teacher_Items[i].TeacherID + ',';
          }
        }
        this.Course.Teachers = Teachers;
        var param = this.Course;
        this.$http.post(this.ApiUrl + "/me/Course/Course_Edit", param).then(response => {
          if (this.Course.CourseID == 0) {
            this.Course_Items.push(this.Course);
          } else {
            this.Course.CourseID = response.data.Data;
          }
          this.course_Show = false;
          this.Course_Items_Fillter = this.Course_Filler(this.selectType);
          this.Course = {CourseID:0,CourseName: "", Price: 0, Brief: "", CourseTypeID: 1, Teachers: "", FileID: 0}
        }, response => {
          // error callback
        })
      },
      //获取课程列表
      Course_List() {
        this.$http.get(this.ApiUrl + "/me/Course/Course_List?CourseTypeID=0").then(response => {
          this.Course_Items = response.data.Data;
          this.Course_Items_Fillter = this.Course_Filler(this.selectType);
        }, response => {
          // error callback
        })
      },
      // 过滤课程
      Course_Filler(type) {
        var arr = [];
        for (var i = 0; i < this.Course_Items.length; i++) {
          if (this.Course_Items[i].CourseTypeID == type) {
            arr.push(this.Course_Items[i]);
          }
        }
        return arr;
      },
      // 获取课程的简介
      GetCourseBrief(data) {
        this.Course.Brief = data;
      },
      // 获取组件上传的文件ID
      GetFileID(data) {
        this.Course.FileID = data.Data[0];
      },
      // 删除课程
      Course_Del(m) {
        var obj = this;
        var param = m;
        var ApiUrl = this.ApiUrl;
        var http = this.$http;
        var layer = this.$layer;
        var id = layer.confirm("确定要删除吗?", {title: '删除课程'}, function () {
          http.post(ApiUrl + "/me/Course/Course_Del", param).then(response => {
            obj.Course_List();
            obj.Course_Items_Fillter = obj.Course_Filler(obj.selectType);
            layer.closeAll();
          }, response => {
            // error callback
          })
        }, function () {
          layer.closeAll();
        });
      },
      // 推荐课程设置
      Course_Is_Recomme_Upd(m) {
        var param = m;
        var ApiUrl = this.ApiUrl;
        var http = this.$http;
        http.post(ApiUrl + "/me/Course/Course_Is_Recomme_Upd", param).then(response => {
          console.log(response)
        }, response => {
          // error callback
        })
      }
    },
    created: function () {

    },
    mounted() {
      this.CourseType_List();
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
