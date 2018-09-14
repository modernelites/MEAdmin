<template>
  <div class="common_wrapper">
    <div class="table_t">
      <caption class="table_title">{{courseName}}</caption>
      <el-table :data="stuDis" style="width: 80%;text-align:center" stripe @selection-change="selectChange" size="small">
        <el-table-column fixed type="selection" width="55" header-align="center">
        </el-table-column>
        <el-table-column fixed prop="UserID" sortable label="序号" width="80" header-align="center">
        </el-table-column>
        <el-table-column fixed label="姓名" width="120" header-align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.StuName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="支付完成" width="90" header-align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.Pay_Status=== '已支付'" style="color: #00FF00">{{scope.row.Pay_Status}}</span>
            <span v-else style="color: red">{{scope.row.Pay_Status}}</span>
          </template>
        </el-table-column>
        <el-table-column label="已联系" width="90" header-align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.Is_Contact=== '已联系'" style="color: #00FF00">{{scope.row.Is_Contact}}</span>
            <span v-else style="color: red">{{scope.row.Is_Contact}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="Gender" label="性别" width="120" header-align="center">
        </el-table-column>
        <el-table-column prop="School" sortable label="学校" width="120" header-align="center">
        </el-table-column>
        <el-table-column prop="Grade" label="年级" width="100" header-align="center">
        </el-table-column>
        <el-table-column prop="Birthday" label="年龄" width="100" header-align="center">
        </el-table-column>
        <el-table-column prop="StuPhone" label="手机号" width="120" header-align="center">
        </el-table-column>
        <el-table-column prop="Email" label="邮箱" width="220" header-align="center">
        </el-table-column>
        <el-table-column prop="Area" label="地区" width="120" header-align="center">
        </el-table-column>
        <el-table-column prop="StuIDCardNum" label="身份证号" width="150" header-align="center">
        </el-table-column>
        <el-table-column prop="Is_OldStu" label="身份" width="120" header-align="center">
        </el-table-column>
        <el-table-column prop="FName" label="父亲" width="120" header-align="center">
        </el-table-column>
        <el-table-column prop="FPhone" label="父亲电话" width="120" header-align="center">
        </el-table-column>
        <el-table-column prop="MName" label="母亲" width="120" header-align="center">
        </el-table-column>
        <el-table-column prop="MPhone" label="母亲电话" width="120" header-align="center">
        </el-table-column>
        <el-table-column prop="Address" label="快递地址" width="120" header-align="center">
        </el-table-column>
        <el-table-column prop="RegName" label="填表人" width="120" header-align="center">
        </el-table-column>
        <el-table-column prop="zip" label="如何了解到" width="120" header-align="center">
        </el-table-column>
        <el-table-column prop="zip" label="学费" width="120" header-align="center">
        </el-table-column>
        <el-table-column prop="Remarks" label="备注" width="720" header-align="center">
        </el-table-column>
        <el-table-column fixed="right" label="支付完成" width="90" v-if="playType" header-align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.Pay_Status=== '已支付'" style="color: #00FF00" @click="editFine(scope.row)">{{scope.row.Pay_Status}}</span>
            <span v-else style="color: red" @click="editFine(scope.row)">{{scope.row.Pay_Status}}</span>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="已联系" width="90" v-if="playType" header-align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.Is_Contact=== '已联系'" style="color: #00FF00" @click="editContact(scope.row)">{{scope.row.Is_Contact}}</span>
            <span v-else style="color: red" @click="editContact(scope.row)">{{scope.row.Is_Contact}}</span>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="106" header-align="center">
          <template slot-scope="scope">
            <el-button @click="show('edit')" type="text" size="small">
              <i class="edit"></i>
            </el-button>
            <el-button @click="del(scope.row.CourseRegID)" type="text" size="small">
              <i class="del"></i>
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="pageSizes"
        :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalItems" small>
      </el-pagination>
    </div>
  </div>
</template>

<script>
  export default {
    name: "adminDetail",
    data() {
      return {
        totalItems: 0,
        pageSize: 10,
        pageSizes: [10, 20, 30, 40],
        currentPage: 1,
        currentDisplayS: 0,
        currentDisplayE: 9,
        play: 'false',
        courseID: "0",
        courseName: "",
        playType: false,
        stu: [], //完整列表
        stuLis: [], //当前选择分类的列表 未分页
        stuDis: [], //分页完成 当前显示的内容
        multipleSelection: [],
        courseType: '',
        ageList: [],
        areaList: [],
        displayState: ''
      };
    },
    mounted() {
      let _this = this;
      eventBus.$on("course", function (val) {
        _this.courseID = val;
      });


      eventBus.$on("CourseID", function (val) {
        this.ageList = [];
        this.areaList = [];
        if (val[1] === undefined) {
          _this.getList(val[0]);
        } else {
          _this.getListByPeriod(val[1]);
        }
      });

      eventBus.$on("CourseName", function (val) {
        if (val[1]) {
          _this.courseName = val[0] + ' 第' + val[1] + '期';
        } else {
          _this.courseName = val[0];
        }

      });

      eventBus.$on("courseType", function (val) {
        _this.courseType = val;
        if (val == 0) {
          _this.playType = true
        } else {
          _this.playType = false;
        }
        if (val == 0) {
          _this.stu.forEach(e => {});
        }
      });

      eventBus.$on("selectedValue", function (val) {
        let temp = [];
        console.log('currentdisplay', val)
        if (val === 'is_fine_true') {
          // debugger
          _this.stu.forEach((e) => {
            if (e.Pay_Status === "已支付") {
              temp.push(e);
            }
          })
          _this.stuLis = temp;
          _this.currentPage = 1;
          _this.totalItems = temp.length;
          console.log(_this.temp)
        } else if (val === 'is_fine_false') {
          _this.stu.forEach((e) => {
            if (e.Pay_Status === "已支付") {} else {
              temp.push(e);
            }
          })
          _this.stuLis = temp;
          _this.totalItems = temp.length;
        } else if (val === 'is_contact_true') {
          _this.stu.forEach((e) => {
            if (e.Is_Contact === "已联系") {
              temp.push(e);
            }
          })
          _this.stuLis = temp;
          _this.totalItems = temp.length;
        } else if (val === 'is_contact_false') {
          _this.stu.forEach((e) => {
            if (e.Is_Contact === "已联系") {} else {
              temp.push(e);
            }
          })
          _this.stuLis = temp;
          _this.totalItems = temp.length;
        } else if (val === 'is_old_true') {
          _this.stu.forEach((e) => {
            if (e.Is_OldStu === "老学员") {
              temp.push(e);
            }
          })
          _this.stuLis = temp;
          _this.totalItems = temp.length;
        } else if (val === 'is_old_false') {
          _this.stu.forEach((e) => {
            if (e.Is_OldStu === "老学员") {} else {
              temp.push(e);
            }
          })
          _this.stuLis = temp;
          _this.totalItems = temp.length;
        } else if (_this.ageList.indexOf(val) != (-1)) {
          _this.stu.forEach((e) => {
            if (e.Birthday == val) {
              temp.push(e);
            }
          })
          _this.stuLis = temp;
          _this.totalItems = temp.length;
        } else if (_this.areaList.indexOf(val) != (-1)) {
          _this.stu.forEach((e) => {
            if (e.Area == val) {
              temp.push(e);
            }
          })
          _this.stuLis = temp;
          _this.totalItems = temp.length;
        }
        _this.handleCurrentChange(1);
      });
      _this.getListByPeriod(-1);
    },
    beforeDestroy() {
      eventBus.$off('selectedValue')
      eventBus.$off('course')
      eventBus.$off('courseType')
    },
    methods: {
      filter(k, v) {
        console.log(k, v)
        let temp = [];
        this.stu.forEach((e) => {
          if (e.Pay_Status === "已支付") {
            temp.push(e);
          }
        })
        this.stuLis = temp;
        this.currentPage = 1;
        this.totalItems = temp.length;
      },
      show() {
        this.playType = !this.playType;
      },
      del(id) {
        let params = {
          CourseRegID: id
        };
        this.$confirm('删除报名信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.post(this.ApiUrl + "me/Course/CourseReg_Del", params).then(
            response => {
              console.log(response)
              if (response.data.IsSuccess === false) {
                this.$message({
                  type: 'false',
                  message: response.data.Msg
                });
              } else {
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
              }
            },
            response => {
              console.log('period error');
            }
          );
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      editFine(row) {
        let params = {},
          page = this.currentPage,
          periodID = this.stuDis[0].PeriodID;
        params.Pay_Status = row.Pay_Status === "已支付" ? 0 : 1;
        params.CourseRegID = row.CourseRegID;
        params.Is_Contact = row.Is_Contact === "已联系" ? 1 : 0;
        this.$confirm('修改支付状态, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.post(this.ApiUrl + "me/Course/CourseReg_PayStatusAndIs_Contact_Upd", params).then(
            response => {
              console.log(response)
              if (response.data.IsSuccess === false) {
                this.$message({
                  type: 'false',
                  message: response.data.Msg
                });
              } else {
                this.$message({
                  type: 'success',
                  message: '修改成功!'
                });
                this.getListByPeriod(periodID, page); //更新页面
              }
            },
            response => {
              console.log('period error');
            }
          );
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消修改'
          });
        });
      },
      editContact(row) {
        let params = {},
          page = this.currentPage,
          periodID = this.stuDis[0].PeriodID;
        params.Pay_Status = row.Pay_Status === "已支付" ? 1 : 0;
        params.CourseRegID = row.CourseRegID;
        params.Is_Contact = row.Is_Contact === "已联系" ? 0 : 1;
        this.$confirm('修改联系状态, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.post(this.ApiUrl + "me/Course/CourseReg_PayStatusAndIs_Contact_Upd", params).then(
            response => {
              console.log(response)
              // debugger
              if (response.data.IsSuccess === false) {
                this.$message({
                  type: 'false',
                  message: response.data.Msg
                });
              } else {
                this.$message({
                  type: 'success',
                  message: '修改成功!'
                });
                this.getListByPeriod(periodID, page);
              }

            },
            response => {
              console.log('period error');
            }
          );
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消修改'
          });
        });
      },
      selectChange: function (val) {
        this.multipleSelection = val;
      },
      getList(id, page) { //课程id获取报名列表
        this.$http.get(this.ApiUrl + "me/Course/Course_SignUp_List?CourseID=" + id).then(
          response => {
            this.ListFilter(response.data.Data);
          },
          response => {
            console.log('period error');
          }
        );
      },
      getListByPeriod(periodID, page) { //期数id获取报名列表
        this.$http.get(this.ApiUrl + "me/Course/Period_SignUp_List?PeriodID=" + periodID).then(
          response => {
            this.stu = response.data.Data;
            if (periodID < 0) {
              this.ListFilter(this.stu, 1, page ? page : 1);
            } else {
              this.ListFilter(this.stu, 0, page ? page : 1);
            }

          },
          response => {
            console.log('period error');
          })
      },
      //报名学员列表·格式化处理 列表初始化
      ListFilter(list, type, page) {
        function sortNumber(a, b) {
          return a - b;
        }
        const s = new Set();
        const l = new Set();
        list.forEach((e) => {
          if (e.Birthday < 120) {} else {
            var nowdate = new Date().getTime();
            var date = new Date(e.Birthday).getTime();
            e.Birthday = parseInt((nowdate - date) / (24 * 3600 * 1000 * 365))
            e.Is_OldStu = e.Is_OldStu ? '新学员' : "老学员";
            e.Pay_Status = e.Pay_Status === 1 ? "已支付" : "未支付";
            e.Is_Contact = e.Is_Contact ? "已联系" : "未联系"
            if (e.Birthday > 115) {
              e.Birthday = '未填写'
            }
            s.add(e.Birthday)
            l.add(e.Area)
          }
        })
        if (type === 1) {
          this.courseName = '摩英青少年领袖特训营' + ' 第' + list[0].PeriodNum + '期';
        }
        this.stuLis = list;
        this.totalItems = this.stuLis.length;
        this.handleCurrentChange(page ? page : 1);
        this.areaList = Array.from(l);
        this.ageList = Array.from(s);
        eventBus.$emit("ageList", this.ageList.sort(sortNumber));
        eventBus.$emit("areaList", this.areaList.sort(sortNumber));
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.pageSize = val;
        this.handleCurrentChange(this.currentPage);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.currentPage = val;
        this.currentDisplayS = (val - 1) * this.pageSize;
        this.currentDisplayE = val * this.pageSize;
        this.stuDis = this.stuLis.slice(this.currentDisplayS, this.currentDisplayE);
      },
      currentChangePage(list) {
        let from = (this.currentPage - 1) * this.pageSize;
        let to = this.currentPage * this.pageSize;
        this.tableDataEnd = [];
        for (; from < to; from++) {
          if (list[from]) {
            this.tableDataEnd.push(list[from]);
          }
        }
      }
    }
  };

</script>
