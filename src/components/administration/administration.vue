<template>
  <div class="wrapper">
    <my-header></my-header>
    <div class="admin">
      <div class="content_wrapper">
        <div class="content_left">
          <ul class="list" v-for="item in course" :key="item.index">
            <li class="item" :class="{'active':selectType === item.index}">
              <span @click="passValue(item.CourseID,1)">{{item.CourseName}}</span>
              <ul>
                <li v-for="i in item.period" :key='i.index' @click="passValue(item.CourseID,2,i.PeriodID,i.PeriodNum)" class="courseStage">第{{i.PeriodNum}}期</li>
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
              <li>
                <el-cascader expand-trigger="hover" :options="displayList" v-model="selectedOptions2" @change="handleChange">
                </el-cascader>
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
  import index from 'vue';
  export default {
    name: "administration",
    data() {
      const item = {};
      return {
        tableData: Array(20).fill(item),
        selectType: 0,
        courseType: 0,
        course: [],
        periodList: [],
        display: false,
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
            value: "身份",
            id: 3
          },
          {
            value: "地区",
            id: 4
          }
        ],
        multipleSelection: [],
        course_list: [],
        options: [],
        ageList: [],
        areaList: [],
        selectedOptions: [],
        selectedOptions2: [],
        displayList: [{
          label: '已付款',
          value: 'is_fine_true'
        }, {
          label: '未付款',
          value: 'is_fine_false'
        }]
      };
    },

    components: {
      myHeader,
      adminDetail,
      enrol
    },
    methods: {
      handleChange(value) {
        eventBus.$emit("selectedValue", value[0]);
      },
      type: function (num) {
        // console.log()
        this.courseType = num;
        if (num === 0) {
          this.displayList = [{
            label: '已付款',
            value: 'is_fine_true'
          }, {
            label: '未付款',
            value: 'is_fine_false'
          }]
        } else if (num === 1) {
          this.displayList = [{
            label: '已联系',
            value: 'is_contact_true'
          }, {
            label: '未联系',
            value: 'is_contact_false'
          }]
        } else if (num === 2) {
          this.displayList = this.ageList;
        } else if (num === 3) {
          this.displayList = [{
            label: '老学员',
            value: 'is_old_true'
          }, {
            label: '新学员',
            value: 'is_old_false'
          }]
        } else if (num === 4) {
          this.displayList = this.areaList;
        }
        eventBus.$emit("courseType", num);
      },
      log: function (item) {
        this.selectType = item;
        eventBus.$emit("course", item);
      },
      print: function (str) {},
      enrolDisplay: function (state) {
        this.display = state;
        eventBus.$emit("enrolDisplay", state);
      },
      getPeriod: function (CourseID) {
        let id = CourseID ? CourseID : 1
        this.$http.get(this.ApiUrl + "me/Period/Period_List_All?Type=" + id).then(
          response => {
            this.periodList = response.data.Data[0];
          },
          response => {
            console.log('period error');
          }
        );
      },
      getClass: function () {
        this.$http.get(this.ApiUrl + "me/Course/Course_List?CourseTypeID=1").then(
          response => {
            let temp = response.data.Data;
            this.course = temp;
            let period = this.periodList
            var map = {},
              dest = [];
            for (var i = 0; i < period.length; i++) {
              var ai = period[i];
              if (!map[ai.CourseID]) {
                dest.push({
                  CourseID: ai.CourseID,
                  data: [ai]
                });
                map[ai.CourseID] = ai;
              } else {
                for (var j = 0; j < dest.length; j++) {
                  var dj = dest[j];
                  if (dj.CourseID == ai.CourseID) {
                    dj.data.push(ai);
                    break;
                  }
                }
              }
            }
            this.course.forEach((e) => {
              dest.forEach((f) => {
                if (e.CourseID == f.CourseID) {
                  e.period = f.data;
                }
              })
            })
            console.log(this.course)
          },
          response => {
            console.log('class error');
          }
        );
      },
      passValue(i, type, p, pnum) { //iCourseID  type 1course 2Period  p期数id pnum期数num
        eventBus.$emit("CourseID", [i, p]);
        this.course.forEach((e) => {
          if (e.CourseID === i) {
            if (pnum) {
              eventBus.$emit("CourseName", [e.CourseName, pnum]);
            } else {
              eventBus.$emit("CourseName", [e.CourseName]);
            }
          }
        })
      },
      sortNumber(a, b) {
        return a - b;
      }
    },
    beforeUpdate() {
      let _this = this
      eventBus.$emit("loginType", 0);
      eventBus.$on("ageList", function (val) {
        _this.ageList = [];
        val.forEach((e, index) => {
          let temp = {
            value: e,
            label: e
          }
          _this.ageList.push(temp)
        })
      });
      eventBus.$on("areaList", function (val) {
        _this.areaList = [];
        val.forEach((e, index) => {
          let temp = {
            value: e,
            label: e
          }
          _this.areaList.push(temp)
        })
      });
    },
    mounted() {
      //权限验证
      // if (window.localStorage.getItem('user')) {
      //   let url = "/index",
      //     user = JSON.parse(window.localStorage.getItem('user'));
      //   console.log(user.DEP)
      //   switch (user.DEP) {
      //     case "1":
      //       url = "/management";
      //       break;
      //     case "2":
      //       url = "/teaching";
      //       break;
      //     case "0":
      //       url = "/administration";
      //   }
      //   this.$router.push({
      //     path: url
      //   });
      // } else {
      //   this.$router.push({
      //     path: "/index"
      //   });
      // }
      // this.getPeriod();
      // this.getClass()
      let periodID, periodN;
      var map = {},
        dest = [];
      this.$http.get(this.ApiUrl + "me/Period/Period_List_All?Type=1").then(
        response => {
          this.periodList = response.data.Data[0];
        },
        response => {
          console.log('period error');
        }
      );
      this.$http.get(this.ApiUrl + "me/Course/Course_List?CourseTypeID=1").then(
        response => {
          let temp = response.data.Data;
          this.course = temp;
          let period = this.periodList

          for (var i = 0; i < period.length; i++) {
            var ai = period[i];
            if (!map[ai.CourseID]) {
              dest.push({
                CourseID: ai.CourseID,
                data: [ai]
              });
              map[ai.CourseID] = ai;
            } else {
              for (var j = 0; j < dest.length; j++) {
                var dj = dest[j];
                if (dj.CourseID == ai.CourseID) {
                  dj.data.push(ai);
                  break;
                }
              }
            }
          }
          this.course.forEach((e) => {
            dest.forEach((f) => {
              if (e.CourseID == f.CourseID) {
                e.period = f.data;
              }
            })
          })
        },
        response => {
          console.log('class error');
        }
      );

    },
    beforeDestroy() {
      eventBus.$off('areaList')
      eventBus.$off('ageList')
    }
  }

</script>

<style lang="scss">
  // @import url("../../../static/css/reset.scss");
  .admin .content_wrapper {
    display: flex;
    height: calc(100vh - 80px);
  }

  .admin .content_wrapper .content_left {
    flex: 0 0 200px;
    background: linear-gradient(180deg, #008ae5, #078ee7);
    padding-top: 44px;
  }

  .admin .content_wrapper .content_left .list li span {
    box-sizing: border-box;
    display: block;
    height: 60px;
    padding-top: 10%;
    padding-left: 8px;
    padding-right: 8px;
    color: #fff;
    font-size: 16px;
    font-weight: 300;
    text-align: center;
    border-left: 8px solid transparnt;
    transition: all.3s ease;
    margin-bottom: 19px;
  }

  .admin .content_wrapper .content_left li.item {
    height: 60px;
  }

  .admin .content_wrapper .content_left li:hover span {
    border-left: 8px solid #063a5d;
    background: #0c75ba;
  }

  .admin .content_wrapper .content_left .list .item ul {
    display: none;
    position: relative;
    left: 200px;
    top: -82px;
    background-color: #fff;
    z-index: 10;
    color: #0581d4;
    width: 110px;
    text-align: center;
    cursor: pointer;
  }

  .admin .content_wrapper .content_left .list .item ul li {
    height: 36px;
    line-height: 36px;
  }

  .admin .content_wrapper .content_left li .courseStage:hover {
    // color: #f00;
    background-color: #efefef;
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

  .el-table td,
  .el-table th.is-leaf {
    border: none;
  }

  .el-table--striped .el-table__body tr.el-table__row--striped td {
    background-color: #fff;
  }

  tbody tr:nth-child(n) {
    background-color: #efefef;
  }

</style>
