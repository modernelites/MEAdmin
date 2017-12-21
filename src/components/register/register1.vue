<template>
  <div>
    <div class="content_wrapper1" @click="slidShow=false">
      <div class="content_header">
        <h3 class="title_3"> 报名</h3>
        <div class="select_wrapper" id="select_wrapper">
          <div class="show_wrapper">
            <div class="show_info toggle_select" ref="option_show_info" @click.stop.prevent="slidShow = !slidShow">
              {{SelectCourseType.CourseTypeName}}
            </div>
          </div>
          <transition name="fade">
            <div class="option_wrapper" id="option_wrapper" ref="option_wrapper" v-show="slidShow">
              <div v-for="(m,index) in CourseType_Items" data-value="0" class="option">
                <a @click="changeCourse(index)">{{m.CourseTypeName}}</a>
              </div>
            </div>
          </transition>
        </div>
        <div class="course_wrapper">
          <span class="info">选择课程 :
            <u class="star">*</u>
          </span>
          <a href="javascript:;" title="选择课程" class="select_btn" @click="courseMaskShow=true"> 选择课程</a>
          <span class="show_info course_show_info" v-show="SelectCourse.CourseName" ref="course_result_info">{{SelectCourse.CourseName}}</span>
        </div>
        <!-- 助教义工无 -->
        <div class="course_wrapper" v-show="CType < 4">
          <span class="info">选择期数 :
            <u class="star">*</u>
          </span>
          <a href="javascript:;" title="选择期数" class="select_btn" @click="periodMaskShow=true"> 选择期数</a>
          <span class="show_info course_show_info" v-show="SelectPeriod.PeriodID" ref="course_result_info" v-text="'第'+SelectPeriod.PeriodNum+'期'+(SelectPeriod.PeriodName?SelectPeriod.PeriodName:'')"></span>
        </div>
      </div>
      <dl class="content_item">
        <div class="info_box">
          <label class="u_name">
            <span>姓名：
              <u class="star">*</u>
            </span>
            <input type="text" name="username" class="username" required="" v-model="CourseReg.StuName">
          </label>
          <label class="sex_label">

            <span>性别：
              <u class="star">*</u>
            </span>
            <div class="s_select">
              <input type="radio" name="radio_sex" class="sex_man sex" value="true" v-model="CourseReg.Gender">男
              <input type="radio" name="radio_sex" class="sex_girl sex" value="false" v-model="CourseReg.Gender">女
            </div>

          </label>
          <label class="grade_label gl">
            <div class="sc">
              <span>就读学校： </span>
              <i class="school">学校：</i>
              <input type="text" name="school_input" class="school_input" v-model="CourseReg.School">
            </div>

            <div class="grade_area">
              <i class="grade_i"> 年级：</i>
              <select class="grade_select gs_1" v-model="CourseReg.Grade">
                <option value="" selected>年级</option>
                <option value="一年级">一年级</option>
                <option value="二年级">二年级</option>
                <option value="三年级">三年级</option>
                <option value="四年级">四年级</option>
                <option value="五年级">五年级</option>
                <option value="六年级">六年级</option>
                <option value="初一">初一</option>
                <option value="初二">初二</option>
                <option value="初三">初三</option>
                <option value="高一">高一</option>
                <option value="高二">高二</option>
                <option value="高三">高三</option>
                <option value="大一">大一</option>
                <option value="大二">大二</option>
                <option value="大三">大三</option>
                <option value="大四">大四</option>
              </select>
            </div>
            <div class="common_area">
              <i class="common_i"> 班级：</i>
              <select class="common grade_select class_select" v-model="CourseReg.ClassName">
                <option value="" selected="selected">班级</option>
                <option value="一班">一班</option>
                <option value="二班">二班</option>
                <option value="三班">三班</option>
                <option value="四班">四班</option>
                <option value="五班">五班</option>
                <option value="六班">六班</option>
                <option value="七班">七班</option>
                <option value="八班">八班</option>
                <option value="九班">九班</option>
                <option value="十班">十班</option>
                <option value="十一班">十一班</option>
                <option value="十二班">十二班</option>
                <option value="十三班">十三班</option>
                <option value="十四班">十四班</option>
                <option value="十五班">十五班</option>
                <option value="十六班">十六班</option>
                <option value="十七班">十七班</option>
                <option value="十八班">十八班</option>
                <option value="十九班">十九班</option>
                <option value="二十班">二十班</option>
              </select>
            </div>
          </label>
          <label class="b_day">
            <span>出生日期：
              <u class="star">*</u>
            </span>
            <input type="date" name="date" class="birth_date" v-model="CourseReg.Birthday">
          </label>
          <label class="s_phone">
            <span>学员手机：</span>
            <input type="number" name="student_phone" class="student_phone" v-model="CourseReg.StuPhone">
          </label>
          <!--除集训营-->
          <label class="mail" v-show='CType!=0'>
            <span>电子邮件：</span>
            <input type="email" name="email" class="student_email" v-model="CourseReg.Email">
          </label>
          <!-- 仅集训营 -->
          <label class="grade_label common_label" v-show='CType == 0'>
            <span class="common_span">地区 ：</span>
            <region v-on:getRegion="showRegion"></region>
          </label>
          <!-- 仅集训营 -->
          <label class="c_input" v-show="CType == 0">
            <span>学员身份证:</span>
            <input type="text" name="student_phone" class="common_input" v-model="CourseReg.StuIDCardNum">
          </label>
          <!-- 仅集训营 -->
          <label class="sex_label common_label" v-show="CType == 0">
            <span>是否是老学员：
              <u class="star">*</u>
            </span>
            <div class="sel">
              <input type="radio" name="radio_OldStu" class="radio radio_1" value="true" v-model="CourseReg.Is_OldStu">是
              <input type="radio" name="radio_OldStu" class="radio radio_2" value="false" v-model="CourseReg.Is_OldStu">否
            </div>

          </label>
        </div>
        <!-- 下面是个人父母信息 集训营 游学-->
        <div class="item_bottom_con" v-show="CType==0 || CType ==2">
          <div class="parent_box">
            <label>
              <div class="f_name">
                <span>父亲：</span>
                <i class="name_i"> 姓名：</i>
                <input type="text" name="father_name" class="father_name" v-model="CourseReg.FName">
              </div>

              <div class="phone_area">
                <i class="phone_info">手机：</i>
                <input type="number" name="father_phone" class="father_phone" v-model="CourseReg.FPhone">
              </div>
              <div class="tip tip1">父亲 &nbsp; 母亲 至少填写一项 </div>
            </label>
            <label>
              <div class="m_name">
                <span>母亲：</span>
                <i class="name_i"> 姓名：</i>
                <input type="text" name="mom_name" class="mom_name" v-model="CourseReg.MName">
              </div>

              <div class="phone_area">
                <i class="phone_info">手机：</i>
                <input type="number" name="mom_phone" class="mom_phone" v-model="CourseReg.MPhone">
              </div>
              <div class="tip">父亲 &nbsp; 母亲 至少填写一项 </div>
            </label>
            <label class="address_label">
              <span class="ex_address_info">快递地址：</span>
              <input type="text" name="expressage_address" class="expressage_address" v-model="CourseReg.Address">
            </label>
          </div>
        </div>
        <!-- 集训营课程报名 新添加内容 -->
        <div class="add_wrapper">
          <!-- 仅集训营 -->
          <label class="origin_label" v-show="CType == 0">
            <div class="origin_1">
              <span>填表人 ：</span>

              <input type="radio" name="radio_origin" class="origin_man origin" value="父亲" v-model="CourseReg.RegName" @click="showRegName=false;">父亲
              <input type="radio" name="radio_origin" class="origin_girl origin" value="母亲" v-model="CourseReg.RegName" @click="showRegName=false;">母亲
            </div>
            <div class="origin_2">
              <input type="radio" name="radio_origin" class="origin_self origin" value="学生本人" v-model="CourseReg.RegName" @click="showRegName=false;">学生本人
              <input type="radio" name="radio_origin" class="originx_other origin" value="其他" @click="showRegName=true;CourseReg.RegName=''">其他</div>

            <label style="line-height: 60px; margin-bottom: 0px" v-show="showRegName">
              <span></span>
              <span class="name_i">请输入填表人姓名：</span>
              <span>
                <input type="text" v-model="CourseReg.RegName" class="regname" />
              </span>
            </label>
          </label>
          <!-- 仅集训营 -->
          <label class="know_label" v-show="CType == 0">
            <div class="know_area">
              <span>如何了解到</span>
              <select class="know_select" v-model="CourseReg.Channel">
                <option value="来源1" selected>来源1</option>
                <option value="来源2">来源2</option>
              </select>
            </div>
          </label>
          <!-- 大学生课程 网校 -->
          <label class="student_wrapper" v-show="CType == 1 || CType == 3">
            <span>学生证</span>
            <a href="javascript:;" title="学生证" class="student_file_btn">
              上传照片
              <input type="file" name="student_card" class="file student_file">
            </a>
          </label>
          <label class="reg_file_wrapper" v-show="CType == 1 || CType == 3">
            <span>报名文件</span>
            <a href="javascript:;" title="报名文件" class="reg_file_btn">
              上传文件
              <input type="file" name="reg_file" class="file reg_file">
            </a>
          </label>

          <!-- 海外游学 -->
          <div class="info_box" v-show="CType == 2">
            <label class="info_b">
              <div class="e_s">
                <span>优先条件：</span>
                <i class="name_i"> 摩英优秀学员：</i>
                <input type="radio" style="margin-left: 10px;" name="Is_Fine" class=" sex" value="true" v-model="CourseReg.Is_Fine">是
                <input type="radio" style="margin-left: 10px;" name="Is_Fine" class=" sex" value="false" v-model="CourseReg.Is_Fine">否
              </div>
              <div class="am">
                <i class="phone_info" style="margin-left: 20px">摩英星级形象大使：</i>
                <input type="radio" style="margin-left: 10px;" name="Is_Envoy" class=" sex" value="true" v-model="CourseReg.Is_Envoy">是
                <input type="radio" style="margin-left: 10px;" name="Is_Envoy" class=" sex" value="false" v-model="CourseReg.Is_Envoy">否
              </div>
            </label>
          </div>
          <!-- 助教 -->
          <label class="radio_label" v-show="CType ==4">
            <span>当过助教：
              <u class="star">*</u>
            </span>
            <input type="radio" name="Is_OldAssistant" class="radio radio_1" value="true" v-model="CourseReg.Is_OldAssistant" @click="CourseReg.Is_OldAssistant=true">是
            <input type="radio" name="Is_OldAssistant" class="radio radio_2" value="false" v-model="CourseReg.Is_OldAssistant" @click="CourseReg.Is_OldAssistant=false">否
          </label>
          <label class="know_label" v-show="CType ==4">
            <div class="know_area">
              <span>助教期数</span>
              <select class="know_select" v-model="CourseReg.Join_Period" v-bind:disabled="!CourseReg.Is_OldAssistant">
                <option value="0">请选择</option>
                <option v-for="m in Period_Items_All" v-text="m.PeriodNum+'期'" :value="m.PeriodID"></option>
              </select>
            </div>
          </label>
          <label class="student_wrapper" v-show="CType ==4">
            <span>生活照</span>
            <a href="javascript:;" title="生活照" class="student_file_btn">
              上传照片
              <input type="file" name="photooflife" class="file student_file">
            </a>
          </label>
          <label class="reg_file_wrapper" v-show="CType ==4">
            <span>中英文简历</span>
            <a href="javascript:;" title="中英文简历" class="reg_file_btn">
              上传文件
              <input type="file" name="resume" class="file reg_file">
            </a>
          </label>
          <!-- 义工 -->
          <label class="know_label" v-show="CType == 5">
            <div class="know_area">
              <span>集训营期数</span>
              <select class="know_select" v-model="CourseReg.Join_Period">
                <option value="0">请选择</option>
                <option v-for="m in Period_Items_All" v-text="m.PeriodNum+'期'" :value="m.PeriodID"></option>
              </select>
            </div>
          </label>
          <label class="radio_label" v-show="CType == 5">
            <span>当正队长：
              <u class="star">*</u>
            </span>
            <div>
              <input type="radio" name="radio" class="radio radio_1" value="true" v-model="CourseReg.Is_Leader">是
              <input type="radio" name="radio" class="sex radio radio_2" value="false" v-model="CourseReg.Is_Leader">否
            </div>

          </label>
          <label class="student_wrapper" v-show="CType == 5">
            <span>上课感悟</span>
            <a href="javascript:;" title="摩英上课感悟" class="student_file_btn">
              上传视频
              <input type="file" name="Sentiment" class="file student_file">
            </a>
          </label>
          <label class="remark_area">
            <span>备注 ：</span>
            <textarea name="textarea" class="textarea" v-model="CourseReg.Remarks"></textarea>
          </label>
          <!-- 海外游学 -->
          <div class="tips_area" v-show="CType == 2">
            <span class="tips_item tips_item_1">
              特别提醒：1：报名年龄必须满14周岁
            </span>
            <span class="tips_item tips_item_2">
              2：如果是摩英优秀学员或者星级形象大使优先录取。
            </span>
          </div>
          <!-- 义工 -->
          <div class="tips_area" v-show="CType==5">
            <span class="tips_item tips_item_1">
              特别提醒：报名参加义工必须参加过二阶课程
            </span>
          </div>
          <div class="btn_wrapper">
            <input type="submit" name="submit" class="submit_btn" value="确认报名" @click="CourseReg_Add()">
          </div>
        </div>
      </dl>
    </div>
    <transition name="fade">
      <div v-show="courseMaskShow" class="course_shade" @click="courseMaskShow=false">这是遮罩层</div>
    </transition>
    <transition name="fade">
      <div v-show="periodMaskShow" class="course_shade" @click="periodMaskShow=false">这是遮罩层</div>
    </transition>
    <transition name="course-fade-con">
      <div v-show="courseMaskShow" class="course_modal_box">
        <div class="modal_box_top">
          <h3 class="title_3">选择课程</h3>
          <a href="javascript:;" class="close_btn" @click="courseMaskShow=false"></a>
        </div>
        <div class="modal_box_middle">
          <label v-for="m in Course_Items_Fillter" @click="Period_Fillter_List(m)">
            <input type="radio" name="course" class="radio radio_1">
            <span class="text" v-text="m.CourseName"></span>
          </label>
        </div>
        <div class="modal_box_bottom">
          <input type="submit" name="submit" class="submit_btn btn" value="确认" @click="courseMaskShow=false">
          <input type="reset" name="reset" class="reset_btn btn" value="取消" @click="courseMaskShow=false">
        </div>
      </div>
    </transition>
    <transition name="course-fade-con">
      <div v-show="periodMaskShow" class="course_modal_box">
        <div class="modal_box_top">
          <h3 class="title_3">选择期数</h3>
          <a href="javascript:;" class="close_btn" @click="periodMaskShow=false"></a>
        </div>
        <div class="modal_box_middle">
          <label v-for="m in Period_Items_Fillter" @click="Period_Select(m)" style="height: auto;line-height: 30px">
            <input type="radio" name="period" class="radio radio_1">
            <span class="text" v-text="'第'+m.PeriodNum+'期'+(m.PeriodName?m.PeriodName:'')" style="margin-left: 5px"></span>
            <div style="font-size: 14px;margin-left: 25px;">
              开始时间:
              <span class="text">{{m.StartDate | datefmt}}</span>
            </div>
            <div style="font-size: 14px;margin-left: 25px;">
              结束时间:
              <span class="text">{{m.EndDate | datefmt }}</span>
            </div>
          </label>
        </div>
        <div class="modal_box_bottom">
          <input type="submit" name="submit" class="submit_btn btn" value="确认" @click="periodMaskShow=false">
          <input type="reset" name="reset" class="reset_btn btn" value="取消" @click="periodMaskShow=false">
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
  import region from "@/components/region/region";

  export default {
    data() {
      return {
        CType: 0,
        showRegName: false,
        CourseReg: {
          CourseID: 0,
          UserID: 0,
          StuName: "",
          Gender: true,
          School: "",
          Grade: "",
          ClassName: "",
          Birthday: "",
          StuPhone: "",
          Email: "",
          FName: "",
          FPhone: "",
          MName: "",
          MPhone: "",
          Address: "",
          Remarks: "",
          Area: "",
          Is_Fine: false,
          Is_Envoy: false,
          Honor: "",
          Self_Des: "",
          Is_OldStu: false,
          StuIDCardNum: "",
          RegName: "母亲",
          Channel: "",
          CourseTypeID: 1
        },
        slidShow: false,
        courseMaskShow: false,
        periodMaskShow: false,
        CourseTypeID: 1,
        Course_Items: [],
        Course_Items_Fillter: [],
        Period_Items: [],
        Period_Items_Fillter: [],
        SelectCourse: {
          CourseName: "",
          CourseID: 0
        },
        SelectPeriod: {
          PeriodName: "",
          PeriodID: 0
        },
        SelectCourseType: {},
        CourseType_Items: [],
        Period_Items_All: []
      };
    },
    methods: {
      changeCourse(id) {
        this.CType = id;
        this.SelectCourseType = this.CourseType_Items[id];
        // console.log(this.SelectCourseType);
      },
      showRegion(data) {
        let dataString = data.Province + data.City + data.County;
        this.CourseReg.Area = dataString;
        console.log(this.CourseReg.Area);
      },
      selectOption(m) {
        this.slidShow = false;
        this.SelectCourseType = m;
        this.SelectCourse = {
          CourseName: "",
          CourseID: 0
        };
        this.SelectPeriod = {
          PeriodName: "",
          PeriodID: 0
        };
        this.Course_Items_Fillter = this.Course_List_Fillter(m.CourseTypeID);
      },
      CourseType_List() {
        this.$http.get(this.ApiUrl + "/me/CourseType/CourseType_List").then(
          response => {
            response = response.data;
            this.CourseType_Items = response.Data;
            this.SelectCourseType = response.Data[0];
          },
          response => {
            console.log("请求发送失败");
          }
        );
      },
      // 获取课程列表
      Course_List() {
        this.$http
          .get(this.ApiUrl + "/me/Course/Course_List?CourseTypeID=0")
          .then(
            response => {
              this.Course_Items = response.data.Data;
              this.Course_Items_Fillter = this.Course_List_Fillter(1);
            },
            response => {
              console.log("请求发送失败");
            }
          );
      },
      //过滤课程
      Course_List_Fillter(p) {
        var arr = [];
        for (var i = 0; i < this.Course_Items.length; i++) {
          if (this.Course_Items[i].CourseTypeID == p) {
            arr.push(this.Course_Items[i]);
          }
        }
        return arr;
      },
      // 获取期数列表
      Period_List() {
        this.$http.get(this.ApiUrl + "/me/Period/Period_List?CourseID=0").then(
          response => {
            response = response.data;
            this.Period_Items = response.Data;
          },
          response => {
            console.log("请求发送失败");
          }
        );
      },
      Period_Fillter_List(m) {
        this.SelectCourse = {
          CourseName: "",
          CourseID: 0
        };
        this.SelectPeriod = {
          PeriodName: "",
          PeriodID: 0
        };
        this.SelectCourse = m;
        var arr = [];
        for (var i = 0; i < this.Period_Items.length; i++) {
          if (this.Period_Items[i].CourseID == m.CourseID) {
            arr.push(this.Period_Items[i]);
          }
        }
        this.Period_Items_Fillter = arr;
      },
      Period_Select(m) {
        this.SelectPeriod = {
          PeriodName: "",
          PeriodID: 0
        };
        this.SelectPeriod = m;
      },
      /** 课程报名*/
      CourseReg_Add() {
        // let user = JSON.parse(window.localStorage.getItem("user"));
        let user = '1';
        this.CourseReg.CourseID = this.SelectCourse.CourseID;
        this.CourseReg.PeriodID = this.SelectPeriod.PeriodID;
        this.CourseReg.UserID = user.UserID;
        if (this.CourseReg.CourseID == 0) {
          this.$alert("请选择课程!");
          return;
        }
        if (this.CourseReg.PeriodID == 0) {
          this.$alert("请选择期数!");
          return;
        }
        if (!this.CourseReg.StuName) {
          this.$alert("请输入学员姓名!");
          return;
        }
        if (!this.CourseReg.Birthday) {
          this.$alert("请选择出生日期!");
          return;
        }
        if (!this.CourseReg.FPhone && !!this.CourseReg.MPhone) {
          this.$lalert("父母手机号请至少填写一个!");
          return;
        }
        this.$http
          .post(this.ApiUrl + "/me/Course/CourseReg_Add", this.CourseReg)
          .then(
            response => {
              response = response.data;
              this.$alert("报名成功!");
            },
            response => {
              console.log("请求发送失败");
            }
          );
      },
      Period_List_All() {
        this.$http
          .get(this.ApiUrl + "me/Period/Period_List_All?Type=2")
          .then(
            response => {
              response = response.body;
              this.Period_Items_All = response.Data;
            },
            function () {
              console.log("请求发送失败");
            }
          );
      }
    },
    mounted() {
      this.Course_List();
      this.Period_List();
      this.CourseType_List();
    },
    components: {
      region: region
    }
  };

</script>
<style>
  .regname {
    box-sizing: border-box;
    display: inline-block;
    background: #eee;
    outline: none;
    border: none;
    padding-left: 10px;
    border-radius: 8px;
    height: 40px;
    line-height: 40px;
  }

</style>
