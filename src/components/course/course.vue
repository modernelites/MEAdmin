<template>
  <div class="courseList">
    <div class="conmon_nav">
      <ul class="common_list clearfix">
        <li v-for="m in CourseType_Items" :key="m.index" class="common_item" @click="CourseTypeSelect(m.CourseTypeID)" :class="{active:selectType===m.CourseTypeID}">
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
                <th>当前期数</th>
                <th>价格</th>
                <th>推荐课程</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="m in Course_Items_Fillter" :key="m.index">
                <td>
                  <input type="checkbox" name="checkbox">
                </td>
                <td>{{m.CourseName}}</td>
                <td>
                  <span>{{m.Period}}</span>
                  <a href="javascript:;" class="common_icon cmomon_mod_icon" @click="periodEdit(m)"></a>
                </td>
                <td>{{m.Price}}</td>
                <td>
                  <input type="checkbox" v-model="m.Is_Recomme" @change="Course_Is_Recomme_Upd(m)" />
                </td>
                <td>
                  <a href="javascript:;" class="common_icon cmomon_mod_icon" @click="showCourseEdit(m)"></a>
                </td>
                <td>
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
                  <option v-for="m in CourseType_Items" :key="m.index" v-bind:value="m.CourseTypeID">{{m.CourseTypeName}}
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
              <div class="row_right teacher_item" style="width: 35px;height: 35px;flex: 0;border-radius: 50%;border: 1px solid #eee;background-size: cover;"
                v-for="m in Teacher_Items" :key='m.index' v-if="m.Selected" v-bind:style="{background:'url('+m.FilePath+')'}">
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
                <!-- <editor v-on:listenCourseBrief="GetCourseBrief" :Brief="Brief"></editor> -->
                <UEditor :defaultMsg=Brief :config=config ref="ue"></UEditor>
                <!-- 富文本 end -->
              </div>
            </div>
            <!-- 选择教师弹出框 -->
            <transition name="fade">
              <div class="teacher_modal" v-show="teacherShow">
                <div class="teacher_header">
                  <h3 class="title">添加教师</h3>
                  <a href="javascript:;" class="teacher_close_btn" @click="teacherShow=false"></a>
                </div>
                <div class="teacher_content">
                  <div class="teacher_row" v-for="m in Teacher_Items" :key="m.index">
                    <div class="teacher_left">
                      <input type="checkbox" name="checkbox" v-bind:value="m.TeacherID" v-model="m.Selected">
                    </div>
                    <div class="teacher_right" v-text="m.TeacherName"></div>
                  </div>
                </div>
                <div class="teacher_modal_bottom">
                  <!--<a href="javascript:;" class="btn confirm_btn" @click="teacherShow=false"> 确定</a>-->
                  <a href="javascript:;" class="btn close_btn" @click="teacherShow=false" style="height: 20px;line-height: 25px;width: 70px;padding: 6px;">
                    关闭</a>
                </div>
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


    <div class="modal_wrapper" v-show="periodShow">
      <div v-show="periodShow" class="mask"></div>
      <div class="period_modal_middle">
        <div class="period_table">
          <el-table :data="periodList" style="width: 760px;text-align:center" height="320">
            <el-table-column fixed label="期数" width="110" header-align="center">
              <template slot-scope="scope">
                <input type="text" class="periodNumEdit" v-model="scope.row.PeriodNum">
              </template>
            </el-table-column>
            <el-table-column label="开始时间" width="170" header-align="center">
              <template slot-scope="scope">
                <el-date-picker v-model="scope.row.StartDate" type="date" placeholder="选择日期" size="small" value-format="yyyy-MM-dd">
                </el-date-picker>
              </template>
            </el-table-column>
            <el-table-column label="结束时间" width="170" header-align="center">
              <template slot-scope="scope">
                <el-date-picker v-model="scope.row.EndDate" type="date" placeholder="选择日期" value-format="yyyy-MM-dd">
                </el-date-picker>
              </template>
            </el-table-column>
            <el-table-column label="期数阶段" width="80" header-align="center">
              <template slot-scope="scope">
                <input type="text" class="checkbox" v-model="scope.row.PhaseType">
              </template>
            </el-table-column>
            <el-table-column label="期数名称" width="150" header-align="center">
              <template slot-scope="scope">
                <input type="text" name="" class="periodNumEdit" v-model="scope.row.PeriodName">
              </template>
            </el-table-column>
            <el-table-column label="选中状态" width="76" header-align="center">
              <template slot-scope="scope">
                <input type="checkbox" class="checkbox" name="periodSelect" :value="scope.row.PeriodID">
              </template>
            </el-table-column>
          </el-table>
          <div class="edit">
            <a href="javascript:;" @click="addPeriod()">
            </a>
            <a href="javascript:;" @click="delPeriod()"></a>
          </div>
          <div class="button">
            <button @click="submitEdit()">确定</button>
            <button @click="periodShow = !periodShow">取消</button>
          </div>
        </div>



      </div>


    </div>


  </div>
</template>
<script>
  import UEditor from "@/components/ueditor/ueditor";
  import Editor from "../Editor/Editor.vue";
  import fileUpload from "@/components/fileUpload/fileUpload";

  export default {
    data() {
      return {
        defaultMsg: "",
        config: {
          // initialFrameWidth: null,
          // initialFrameHeight: 350
        },
        selectType: 1,
        CourseType: {},
        Brief: "",
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
        teacherShow: false,
        periodShow: false,
        periodList: [],
        periodListAll: [],
        options: [],
        courseNow: ''
      };
    },
    methods: {
      // 课程类型切换事件
      CourseTypeSelect(type) {
        this.selectType = type;
        this.Course_Items_Fillter = this.Course_Filler(type);
      },
      // 获取课程类型列表
      CourseType_List() {
        this.$http.get(this.ApiUrl + "me/CourseType/CourseType_List").then(
          response => {
            this.CourseType_Items = response.data.Data[0];
            this.selectType = this.CourseType_Items[0].CourseTypeID;
            this.Course_List();
          },
          response => {
            // error callback
          }
        );
      },
      // 获取教师列表
      Teacher_List() {
        this.$http.get(this.ApiUrl + "me/Teacher/Teacher_List?Teachers=").then(
          response => {
            this.Teacher_Items = response.data.Data;
          },
          response => {
            // error callback
          }
        );
      },
      // 显示课程编辑层
      showCourseEdit(m) {
        let _this = this;
        this.course_Show = true;
        if (m) {
          this.$http.get(this.ApiUrl + 'me/Course/Course_Get?CourseID=' + m.CourseID).then(response => {
            this.defaultMsg = response.data.Data.Brief;
            this.Brief = response.data.Data.Brief;
          }, response => {})
          // this.Brief = m.Brief;
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
            CourseID: 0,
            CourseName: "",
            Price: 0,
            Brief: "nihao",
            CourseTypeID: 1,
            Teachers: "",
            FileID: 0,
            FilePath: ""
          };
        }
      },
      // 课程编辑
      Course_Edit() {
        if (!this.Course.CourseName) {
          this.$alert("请输入课程名称!");
          return;
        }
        if (this.Course.CourseTypeID == 0) {
          this.$alert("请选择课程类型!");
          return;
        }

        let content = this.$refs.ue.getUEContent();
        this.Course.Brief = content;
        let Teachers = "";
        for (let i = 0; i < this.Teacher_Items.length; i++) {
          if (this.Teacher_Items[i].Selected) {
            Teachers += this.Teacher_Items[i].TeacherID + ",";
          }
        }
        this.Course.Teachers = Teachers;
        let param = this.Course;
        this.$http.post(this.ApiUrl + "me/Course/Course_Edit", param).then(
          response => {
            if (this.Course.CourseID == 0) {
              this.Course_Items.push(this.Course);
            } else {
              this.Course.CourseID = response.data.Data;
            }
            this.course_Show = false;
            this.Course_Items_Fillter = this.Course_Filler(this.selectType);
            this.Course = {
              CourseID: 0,
              CourseName: "",
              Price: 0,
              Brief: "",
              CourseTypeID: 1,
              Teachers: "",
              FileID: 0
            };
          },
          response => {
            // error callback
          }
        );
        console.log(content);
      },
      Period_List() {
        this.Course_List();
        this.$http.get(this.ApiUrl + "me/Period/Period_List_All?Type=0").then(
          response => {
            this.periodListAll = response.data.Data[0];
          },
          response => {
            console.log('period error');
          }
        );
      },
      //获取课程列表
      Course_List() {
        function sortNumber(a, b) {
          return a - b;
        }
        this.$http
          .get(this.ApiUrl + "me/Course/Course_List?CourseTypeID=0")
          .then(
            response => {
              this.Course_Items = response.data.Data;
              var map = {},
                dest = [];
              for (var i = 0; i < this.periodListAll.length; i++) {
                var ai = this.periodListAll[i];
                if (!map[ai.CourseID]) {
                  dest.push({
                    CourseID: ai.CourseID,
                    period: ai.PeriodNum
                  });
                  map[ai.CourseID] = ai;
                } else {
                  for (var j = 0; j < dest.length; j++) {
                    var dj = dest[j];
                    if (dj.CourseID == ai.CourseID) {
                      dj.period += ',' + ai.PeriodNum
                      break;
                    }
                  }
                }
              }

              for (let i = 0; i < this.Course_Items.length; i++) {
                for (let j = 0; j < dest.length; j++) {
                  if (this.Course_Items[i].CourseID === dest[j].CourseID) {
                    this.Course_Items[i].Period = dest[j].period
                  }
                }
              }
              this.Course_Items_Fillter = this.Course_Filler(this.selectType);
            },
            response => {
              // error callback
            }
          );
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
        // var layer = this.$layer;
        var id = this.$confirm(
          "确定要删除吗?", {
            title: "删除课程"
          },
          function () {
            http.post(ApiUrl + "me/Course/Course_Del", param).then(
              response => {
                obj.Course_List();
                obj.Course_Items_Fillter = obj.Course_Filler(obj.selectType);
                layer.closeAll();
              },
              response => {
                // error callback
              }
            );
          },
          function () {
            layer.closeAll();
          }
        );
      },
      // 推荐课程设置
      Course_Is_Recomme_Upd(m) {
        var param = m;
        var ApiUrl = this.ApiUrl;
        var http = this.$http;
        http.post(ApiUrl + "me/Course/Course_Is_Recomme_Upd", param).then(
          response => {
            console.log(response);
          },
          response => {
            // error callback
          }
        );
      },
      editorReady(instance) {
        instance.setContent("");
        instance.addListener("contentChange", () => {
          this.content = instance.getContent();
        });
      },
      getUEContent() {
        let content = this.$refs.ue.getUEContent();
        // console.log(content);
      },
      periodEdit(o) {
        console.log(o)
        this.courseNow = o.CourseID;
        this.$http.get(this.ApiUrl + "me/Period/Period_List?CourseID=" + o.CourseID).then(
          response => {
            console.log(response.data.Data[0])
            this.periodList = response.data.Data[0];
            this.periodList.forEach(e => {
              e.StartDate = new Date(e.StartDate).format("yyyy-MM-dd");
              e.EndDate = new Date(e.EndDate).format("yyyy-MM-dd");
            });
          },
          response => {
            console.log('period error');
          }
        );
        this.periodShow = true;
      },
      addPeriod() {
        this.periodList.push({
          PeriodID: 0,
          EndDate: '',
          StartDate: '',
          PhaseType: '',
          Address: '',
          PeriodNum: '请输入期数',
          PeriodName: '',
          CourseID: this.courseNow
        })
      },
      delPeriod() {
        let a = this.getCheckBoxVal('periodSelect');
        if (a.length > 0) {
          this.$confirm('删除期数, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            a.forEach((e) => {
              let params = {};
              params.PeriodID = e;
              this.$http.post(this.ApiUrl + "me//Period/Period_Del", params).then(
                response => {
                  console.log(response)
                  this.$message({
                    type: 'success',
                    message: '删除成功!'
                  });
                  this.periodShow = false;
                },
                response => {
                  console.log('period error');
                }
              );
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        } else {
          this.$message({
            type: 'info',
            message: '请选择要删除的期数!'
          });
        }

      },
      SelectedPeriod(i) {

        console.log(i)
      },
      submitEdit() {
        if (this.periodList.length >= 1) {
          this.$confirm('提交期数信息, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.periodList.forEach((e) => {
              let params = e;
              console.log(params)
              this.$http.post(this.ApiUrl + "me/Period/Period_Edit", params).then(
                response => {
                  console.log(response)
                  this.$message({
                    type: 'success',
                    message: '修改成功!'
                  });
                },
                response => {
                  console.log('period error');
                }
              );
            });
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消提交'
            });
          })
        } else {
          this.$message({
            type: 'info',
            message: '当前课程没有期数信息!'
          });
        }
        this.periodShow = false;
      },
      getCheckBoxVal(nameVal) {
        var inputs = document.getElementsByName(nameVal);
        var checkVal = [];
        var k = 0; //用来作checkVal数组的下标
        for (var i = 0, len = inputs.length; i < len; i++) {
          if (inputs[i].checked) {
            checkVal[k] = inputs[i].value;
            k++;
          }
        }
        return checkVal;
      }

    },
    mounted() {
      this.Period_List();
      this.CourseType_List();
      this.Teacher_List();
    },
    components: {
      editor: Editor,
      fileUpload: fileUpload,
      UEditor
    }
  };

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

  .modal_wrapper .period_modal_middle {
    width: 800px;
    height: 440px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #fff;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.8);
    z-index: 999;
    padding-bottom: 70px;
  }

  .modal_wrapper .period_modal_middle .period_table {
    margin: 22px;
  }

  .modal_wrapper .period_modal_middle .period_table .el-table th,
  .el-table tr {
    background-color: #a4c8df;
  }

  .modal_wrapper .period_modal_middle .period_table .table_title {
    display: block;
    text-align: center;
    padding: 0 20px;
    height: 40px;
    line-height: 40px;
    background-color: #a4c8df;
  }

  .modal_wrapper .period_modal_middle .period_table .edit {

    margin-left: 20px;
    margin-top: 14px;
  }

  .modal_wrapper .period_modal_middle .period_table .edit a:first-child {
    display: inline-block;
    margin-right: 16px;
    background: url("./../../assets/img/add@2x.png") no-repeat center;
    width: 14px;
    height: 14px;
  }

  .modal_wrapper .period_modal_middle .period_table .edit a:last-child {
    display: inline-block;
    background: url("./../../assets/img/minus@2x.png") no-repeat center;
    width: 14px;
    height: 14px;
  }

  .modal_wrapper .period_modal_middle .period_table .button {
    margin-left: 204px;
  }

  .modal_wrapper .period_modal_middle .period_table .button button {
    display: inline-block;
    height: 40px;
    width: 120px;
    margin-right: 28px;
    border-radius: 4px;
    border: none;
    outline: none;
    background-color: #098fe7;
    color: #fff;
    cursor: pointer;
  }

  .modal_wrapper .period_modal_middle .period_table .button button:last-child {
    background-color: #adadad;

  }

  .modal_wrapper .period_modal_middle .period_table input {
    border: none;
    outline: none;
    text-align: center;
    width: 100px;
  }

  .modal_wrapper .period_modal_middle .period_table .el-table_2_column_12 input {
    width: 30px;
  }

  .el-picker-panel__body-wrapper {
    z-index: 99999
  }

  .el-date-editor.el-input,
  .el-date-editor.el-input__inner {
    width: 150px;
  }


</style>
