<template>
  <div class="common_wrapper">
    <caption class="table_title">{{courseID}}</caption>
    <el-table :data="tableData" border style="width: 80%" stripe>
      <el-table-column fixed type="selection"
      width="55">
      </el-table-column>
      <el-table-column fixed prop="index" label="序号" width="80">
      </el-table-column>
      <el-table-column fixed prop="name" label="姓名" width="120">
      </el-table-column>
      <el-table-column prop="gender" label="性别" width="120">
      </el-table-column>
      <el-table-column prop="city" label="学校" width="120">
      </el-table-column>
      <el-table-column prop="address" label="年龄" width="300">
      </el-table-column>
      <el-table-column prop="zip" label="手机号" width="120">
      </el-table-column>
      <el-table-column prop="zip" label="邮箱" width="120">
      </el-table-column>
      <el-table-column prop="zip" label="地区" width="120">
      </el-table-column>
      <el-table-column prop="zip" label="身份证号" width="120">
      </el-table-column>
      <el-table-column prop="zip" label="老学员" width="120">
      </el-table-column>
      <el-table-column prop="zip" label="父亲" width="120">
      </el-table-column>
      <el-table-column prop="zip" label="父亲电话" width="120">
      </el-table-column>
      <el-table-column prop="zip" label="母亲" width="120">
      </el-table-column>
      <el-table-column prop="zip" label="母亲电话" width="120">
      </el-table-column>
      <el-table-column prop="zip" label="快递地址" width="120">
      </el-table-column>
      <el-table-column prop="zip" label="填表人" width="120">
      </el-table-column>
      <el-table-column prop="zip" label="如何了解到" width="120">
      </el-table-column>
      <el-table-column prop="zip" label="备注" width="120">
      </el-table-column>
      <el-table-column prop="zip" label="学费" width="120">
      </el-table-column>
      <el-table-column fixed="right"  label="已支付" width="80" v-if="playType">
      </el-table-column>
      <el-table-column fixed="right" prop="zip" label="已联系" width="80">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="66">
        <template slot-scope="scope">
          <el-button @click="show('edit')" type="text"  size="small"><i class="edit"></i></el-button>
          <el-button @click="show('del')" type="text" size="small"><i class="del"></i></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    name: "adminDetail",
    data() {
      return {
        play:'false',
        courseID: "0",
        playType:true,
        tableData: [{
          index:'1',
            date: "2016-05-03",
            name: "王小虎",
            province: "上海",
            city: "普陀区",
            address: "上海市普陀区金沙江路 1518 弄",
            zip: 200333
          },
          {
            index:'2',
            date: "2016-05-02",
            name: "王小虎",
            province: "上海",
            city: "普陀区",
            address: "上海市普陀区金沙江路 1518 弄",
            zip: 200333
          },
          {
            index:'3',
            date: "2016-05-04",
            name: "王小虎",
            province: "上海",
            city: "普陀区",
            address: "上海市普陀区金沙江路 1518 弄",
            zip: 200333
          },
          {
            index:'4',
            date: "2016-05-01",
            name: "王小虎",
            province: "上海",
            city: "普陀区",
            address: "上海市普陀区金沙江路 1518 弄",
            zip: 200333
          }
        ]
      };
    },
    mounted() {
      let _this = this;
      eventBus.$on("course", function (val) {
        _this.courseID = val;
      });
      eventBus.$on("courseType", function (val) {
        if (val == 0) {
          _this.playType = true
        } else {
          _this.playType = false;
        }
      });
    },
    methods:{
      show:function(msg){
        console.log(msg);
      }
    }
  };

</script>
