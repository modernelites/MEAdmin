<template>
  <div class="wrapper">
    <my-header></my-header>
    <div class="admin">
      <div class="content_wrapper">
        <div class="content_left">
          <ul class="list" v-for="item in course_list" :key="item.index">
            <li class="item" :class="{'active':selectType === item.index}">
              <router-link to="" >{{item.CourseName}}</router-link>
              <ul>
                <li v-for="item in item.stage" :key='item.index' @click="log(item.index)" class="courseStage">{{item.value}}</li>
              </ul>
            </li>
          </ul>
        </div>
        <div class="content_right">
          <div class="common_nav">
            <ul class="common_left">
              <li @click="type(item.id)" class="common_item" :class="{'active':courseType === item.id}" v-for="item in nav_list" :key="item.index">
                <a href="javascript:;">{{item.value}}</a>
              </li>
            </ul>
            <div class="common_right">
              <a href="javascript:;" @click="print('del')" class="common_del_icon common_icon"></a>
              <a href="javascript:;" @click="print('edit')" class="common_mod_icon common_icon"></a>
              <a href="javascript:;" @click="enrolDisplay(true)" class="common_add_icon common_icon"></a>


            </div>
          </div>

          <!-- 信息列表 -->
          <div class="common_right_detail">
            <admin-detail></admin-detail>
            <admin-detail></admin-detail>
            <admin-detail></admin-detail>
            <admin-detail></admin-detail>
            <admin-detail></admin-detail>
            <admin-detail></admin-detail>
          </div>

        </div>
        <enrol v-show="display"></enrol>
      </div>

    </div>

  </div>

</template>

<script>
  import myHeader from "@/components/header/header";
  import adminDetail from "@/components/administration/adminDetail";
  import enrol from "@/components/enrol/enrol";
  export default {
    name: "administration",
    data() {
      return {

        selectType: 0,
        courseType: 0,
        display: false,
        courses: [{
            value: "摩英青少年领袖特训营",
            index: 0,
            stage: [{
                value: "stage1",
                index: 0.0
              },
              {
                value: "stage2",
                index: 0.1
              },
              {
                value: "stage3",
                index: 0.2
              }
            ]
          },
          {
            value: "智慧家长",
            index: 1,
            stage: [{
                value: "stage1",
                index: 1.0
              },
              {
                value: "stage2",
                index: 1.1
              },
              {
                value: "stage3",
                index: 1.2
              }
            ]
          },
          {
            value: "摩英性格分析",
            index: 2,
            stage: [{
                value: "stage1",
                index: 2.0
              },
              {
                value: "stage2",
                index: 2.1
              },
              {
                value: "stage3",
                index: 2.2
              }
            ]
          },
          {
            value: "摩英超级记忆力",
            index: 3,
            stage: [{
                value: "stage1",
                index: 3.0
              },
              {
                value: "stage2",
                index: 3.1
              },
              {
                value: "stage3",
                index: 3.2
              }
            ]
          },
          {
            value: "摩英学习力特训营",
            index: 4,
            stage: [{
                value: "stage1",
                index: 4.0
              },
              {
                value: "stage2",
                index: 4.1
              },
              {
                value: "stage3",
                index: 4.2
              }
            ]
          },
          {
            value: "摩英梦想风暴",
            index: 5,
            stage: [{
                value: "stage1",
                index: 5.0
              },
              {
                value: "stage2",
                index: 5.1
              },
              {
                value: "stage3",
                index: 5.2
              }
            ]
          },
          {
            value: "摩英全脑开发",
            index: 6,
            stage: [{
                value: "stage1",
                index: 6.0
              },
              {
                value: "stage2",
                index: 6.1
              },
              {
                value: "stage3",
                index: 6.2
              }
            ]
          },
          {
            value: "摩英领袖风暴",
            index: 7,
            stage: [{
                value: "stage1",
                index: 7.0
              },
              {
                value: "stage2",
                index: 7.1
              },
              {
                value: "stage3",
                index: 7.2
              }
            ]
          }
        ],
        nav_list: [{
            value: "支付完成",
            id: 0
          },
          {
            value: "已联系",
            id: 1
          },
          {
            value: "年龄",
            id: 2
          },
          {
            value: "学校",
            id: 3
          },
          {
            value: "身份",
            id: 4
          },
          {
            value: "地区",
            id: 5
          }
        ],
        multipleSelection: [],
        course_list:[]
      };
    },
    components: {
      myHeader,
      adminDetail,
      enrol
    },
    methods: {
      type: function (num) {
        this.courseType = num;
        eventBus.$emit("courseType", num);
        // console.log("courseType", this.courseType);
      },
      log: function (item) {
        this.selectType = item;
        // console.log("selectType", this.selectType);
        eventBus.$emit("course", item);
      },
      print: function (str) {
        console.log(str);
      },
      enrolDisplay: function (state) {
        this.display = state;
        eventBus.$emit("enrolDisplay", state);
      },
      getPeriod: function (CourseID) {
        console.log('1',this.course_list[0]);
        this.$http.get(this.ApiUrl + "/me/Period/Period_List?CourseID=0").then(
          response => {
            // console.log('period');
            // console.log(response.data.Data)
            response.data.Data.forEach(element => {
              // console.log(element.CourseID);
            })
          },
          response => {
            // error callback
            console.log('period error');
          }
        );
      },
      getClass: function () {
        this.$http.get(this.ApiUrl + "/me/Course/Course_List?CourseTypeID=1").then(
          response => {
            this.course_list = response.data.Data;
            // console.log(this.course_list);
            this.course_list.forEach(element => {
              // console.log(element.CourseID);
            });
},
          response => {
            // error callback
            console.log('class error');
          }
        );
      }
    },
    mounted() {
      this.getClass();
      this.getPeriod();
            eventBus.$emit("loginType", 0);
    }

  }

</script>

<style>
  .admin .content_wrapper {
    display: flex;
    height: calc(100vh - 80px);
  }

  .admin .content_wrapper .content_left {
    flex: 0 0 200px;
    background: linear-gradient(180deg, #008ae5, #078ee7);
    padding-top: 44px;
  }

  .admin .content_wrapper .content_left .list li a {
    display: block;
    height: 60px;
    line-height: 60px;
    color: #fff;
    font-size: 16px;
    font-weight: 300;
    text-align: center;
    border-left: 8px solid transparent;
    transition: all.3s ease;
  }

  .admin .content_wrapper .content_left li.item {
    height: 60px;
  }

  .admin .content_wrapper .content_left li.active a {
    border-left: 8px solid #063a5d;
    background: #0c75ba;
  }

  .admin .content_wrapper .content_left li:hover a {
    border-left: 8px solid #063a5d;
    background: #0c75ba;
  }

  .admin .content_wrapper .content_left .list .item ul {
    display: none;
    position: relative;
    left: 200px;
    top: -48px;
    background-color: #078ee7;
    z-index: 10;
    color: #fff;
    padding-left: 10px;
    width: 150px;
  }

  .admin .content_wrapper .content_left .list .item ul li {
    height: 36px;
    line-height: 36px;
  }

  .admin .content_wrapper .content_left li .courseStage:hover {
    color: #f00;
  }

  .admin .content_wrapper .content_left li:hover ul {
    display: block !important;
  }

  .admin .content_wrapper .content_right {
    width: calc(100% - 200px);
    background: #efefef;
  }

  .admin .content_wrapper .content_right .common_nav {
    height: 44px;
    width: 100%;
    line-height: 44px;
    border-bottom: 4px solid #dedddd;
    position: relative;
  }

  .admin .content_wrapper .content_right .common_right_detail {
    height: calc(100vh - 144px);
    overflow: auto;
    margin: 20px 20px 0;
  }

  .admin .content_wrapper .content_right .common_right_detail .common_wrapper {
    margin-bottom: 20px;
  }

  .admin .content_wrapper .content_right .common_nav li {
    float: left;
    font-size: 18px;
    margin: 0 20px;
    text-align: center;
  }

  .admin .content_wrapper .content_right .common_nav .common_right {
    float: right;
    padding: 0 20px;
  }

  .admin .content_wrapper .content_right .common_nav .common_right .common_icon {
    float: right;
    margin-top: 12px;
    padding: 0 5px;
  }

  .admin .content_wrapper .content_right .common_nav .common_right .common_add_icon {
    background: url("./../../assets/img/add.png") no-repeat center;
    width: 14px;
    height: 14px;
    display: block;
  }

  .admin .content_wrapper .content_right .common_nav .common_right .common_mod_icon {
    background: url("./../../assets/img/modification.png") no-repeat center;
    width: 14px;
    height: 14px;
    display: block;
  }

  .admin .content_wrapper .content_right .common_nav .common_right .common_del_icon {
    background: url("./../../assets/img/delete@2x.png") no-repeat center;
    width: 14px;
    height: 14px;
    display: block;
  }

  .conmon_nav .common_list .common_item {
    float: left;
    position: relative;
  }

  .conmon_nav .common_list .common_item+.common_item {
    margin-left: 20px;
  }

  .admin .content_wrapper .common_left li a {
    display: block;
    font-size: 18px;
    color: #000;
  }

  .admin .content_wrapper .common_left .common_item.active::after {
    content: " ";
    display: block;
    width: 144px;
    position: relative;
    left: 0;
    bottom: 4px;
    height: 4px;
    background: #fff;
  }

  .admin .content_wrapper .common_left .common_item.active::after {
    background: #068de7;
    width: 100%;
  }

  .admin .content_wrapper .common_left .common_item.active a {
    color: #068de7;
  }

  .admin .content_wrapper .common_wrapper .el-table {
    width: 100% !important;
  }

  .admin .content_wrapper .common_wrapper .table_title {
    display: block;
    text-align: left;
    padding: 0 20px;
    height: 40px;
    line-height: 40px;
    background-color: #a4c8df;
  }

  .admin .content_wrapper .common_wrapper .edit {
    background: url("./../../assets/img/modification.png") no-repeat center;
    width: 14px;
    height: 14px;
    display: block;
  }

  .admin .content_wrapper .common_wrapper .del {
    background: url("./../../assets/img/delete@2x.png") no-repeat center;
    width: 14px;
    height: 14px;
    display: block;
  }

</style>
