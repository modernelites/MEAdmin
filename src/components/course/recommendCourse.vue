<template>
  <div class="recommendCourse">
    <div class="conmon_nav">
      <ul class="common_list clearfix">
        <li class="common_item"><a href="javascript:;"></a></li>
        <li class="common_item"><a href="javascript:;"></a></li>
        <li class="common_item"><a href="javascript:;"></a></li>
        <li class="common_item"><a href="javascript:;"></a></li>
        <li class="common_item"><a href="javascript:;"></a></li>
        <li class="common_item"><a href="javascript:;"></a></li>
      </ul>
      <!--<div class="right_area">-->
      <!--<a href="javascript:;" class="cmomon_add_icon common_icon"></a>-->
      <!--<a href="javascript:;" class="cmomon_mod_icon common_icon"></a>-->
      <!--<a href="javascript:;" class="cmomon_del_icon common_icon"></a>-->
      <!--</div>-->
    </div>
    <div class="common_wrapper">
      <div class="common_table">
        <table class="table">
          <thead>
          <tr>
            <th><input type="checkbox" name="checkbox"> 序号</th>
            <th>名称</th>
            <!--<th>内容</th>-->
            <th>课程类型</th>
            <th></th>
            <th></th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(m,index) in Course_Items_Fillter">
            <td><input type="checkbox" name="checkbox">&nbsp;{{index + 1}}</td>
            <td v-text="m.CourseName"></td>
            <!--<td>22222222222222222222222</td>-->
            <td>
              <div v-show="m.CourseTypeID==1">集训营课程</div>
              <div v-show="m.CourseTypeID==2">大学生课程</div>
              <div v-show="m.CourseTypeID==3">海外游学课程</div>
              <div v-show="m.CourseTypeID==4">摩英网校</div>
              <div v-show="m.CourseTypeID==5">助教</div>
              <div v-show="m.CourseTypeID==6">义工</div>
            </td>
            <td><a href="javascript:;" class="common_icon cmomon_mod_icon" @click="editimg_show(m)"></a>
            </td>
            <td></td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!--<div class="modal_wrapper" v-show="editimg">-->
    <!--<transition name="fade">-->
    <!--<div v-show="editimg" class="mask"></div>-->
    <!--</transition>-->
    <!--<transition>-->
    <!--<div v-show="editimg" class="modal_content">-->
    <!---->
    <!--</div>-->
    <!--</transition>-->
    <!--</div>-->
    <div class="modal_wrapper" v-show="editimg">
      <transition name="fade">
        <div v-show="editimg" class="mask"></div>
      </transition>
      <transition name="course-fade-con">
        <div v-show="editimg" class="modal_content">
          <div class="modal_header">
            <div class="title">修改推荐课程图片 </div>
            <a href="javascript:;" class="modal_header_close" @click="editimg=false"></a>
          </div>
          <div class="modal_middle" style="height: 500px;overflow-y: scroll;">
            <div class="modal_row">
              <div class="row_left">
                课程图片:
              </div>
              <div class="row_right">
                <div v-show="editimg">
                  <file-upload v-on:listenFileUpload="GetFileID" :FilePath="Course.RecommendImg"></file-upload>
                </div>
              </div>
            </div>
          </div>
          <div class="modal_bottom">
            <a class="btn confirm_btn" href="javascript:;" @click="Course_RecommendImg_Edit()"> 确定</a>
            <a class="btn close_btn" href="javascript:;" @click="editimg=false"> 取消</a>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
  import fileUpload from '@/components/fileUpload/fileUpload';

  export default {
    name: 'hello',
    data() {
      return {
        editimg: false,
        Course: {
          CourseID: 0,
          CourseName: "",
          Price: 0,
          Brief: "",
          CourseTypeID: 1,
          Teachers: "",
          FileID: 0,
          FilePath: "",
          RecommendImg: ''

        },
        Course_Items: [],
        Course_Items_Fillter: [],
      }
    },
    methods: {
      //获取课程列表
      Course_List() {
        this.$http.get(this.ApiUrl + "/me/Course/Course_List?CourseTypeID=0").then(response => {
          this.Course_Items = response.data.Data;
          this.Course_Items_Fillter = this.Course_Filler();
        }, response => {
          // error callback
        })
      },
      // 过滤推荐课程
      Course_Filler() {
        var arr = [];
        for (var i = 0; i < this.Course_Items.length; i++) {
          if (this.Course_Items[i].Is_Recomme == 1) {
            arr.push(this.Course_Items[i]);
          }
        }
        console.log(arr);
        return arr;
      },
      // 获取组件上传的文件ID
      GetFileID(data) {
        this.Course.FileID = data.Data[0];
      },
      editimg_show(m) {
        this.Course = {CourseID: 0, FileID: 0}
        this.editimg = true;
        this.Course = m;
      },
      Course_RecommendImg_Edit() {
        this.editimg = false;
        this.$http.post(this.ApiUrl + "/me/Course/Course_Recomme_Set", this.Course).then(response => {
          //this.Course_Items = response.data.Data;
          //this.Course_Items_Fillter = this.Course_Filler();
          this.Course_List();
        }, response => {
          // error callback
        })
      }
    },
    mounted() {
      this.Course_List();
    },
    components: {
      fileUpload: fileUpload
    }
  }

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
    width: 600px;
    /*min-width: 760px;*/
    z-index: 2;
    transform: translate(-50%, -50%);
    background: #fff;
  }

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
