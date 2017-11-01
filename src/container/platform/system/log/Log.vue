<template>
	<section>
		<!--工具条-->
		<el-col :span="18" class="toolbar" style="padding-bottom: 0px;">
			<!--<el-tabs v-model="activeName" type="card" @tab-click="handleClick">
			    <el-tab-pane label="操作日志" name="columnsOperate"></el-tab-pane>
			    <el-tab-pane label="数据库日志" name="columnsDb"></el-tab-pane>
			    <el-tab-pane label="系统日志" name="columnsSys"></el-tab-pane>
			  </el-tabs>-->
		</el-col>
		<el-col :span="6" class="toolbar" style="padding-bottom: 0px;">
			<el-input
				title="关键字查询（操作用户，日志级别，日志内容）"
			  	placeholder="关键字查询（操作用户，日志级别，日志内容）"
			  	icon="search"
			  	v-model="filters.keyword"
			  	:on-icon-click="getLogs"
			  	@keyup.enter.native="getLogs">
			</el-input>
		</el-col>
		<!--列表-->
		<CommTable  :tableConfig="tableConfig"></CommTable>
	</section>
	
</template>

<script>
	import CommTable from '../../../../components/CommTable';
    import { mapGetters } from 'vuex'       
	export default {
		computed: {
		 ...mapGetters([
	   		 ])
	    },
		data() {
			const columns= [{
					key:1,
			        label:'操作日志编号',
			        prop:'logId',
		        },
		        {
				  	key:2,
		          	label:'日志内容',
		          	prop:'content',
		        },
		        {
			 	 	key:3,
		          	label:'操作用户',
		          	prop:'userCode',
		        },
		        {
			 	 	key:4,
		          	label:'操作时间',
		          	prop:'actionTime',
		        },
		        {
				  	key:5,
		          	label:'操作类型',
		          	prop:'type',
		          	formatter:this.formatType,
		        }];
			
	        //方法名
	        const dispatch = 'getLogList';
	        //查询参数
	        let params = {
	        	pageNum: 1,
				pageSize:10,
				keyword: ''
	        }
			return {
				logList:[],
				tableConfig:{
					dataList:[],
					columns,
					params,
					dispatch:dispatch,
					rowOptions:this.handleSelectionChange,
					listLoading:true,
				},
				
				filters: {
					keyword: ''
				},
				sels: [],//列表选中列
			}
		},
		methods: {
			//状态显示转换
			formatType: function (row, column) {
				let str = '';
				switch(row.type)
					{
					case 0:
					  str='停用';
					  break;
					case 1:
					  str='启用';
					  break;
				    case 2:
				      str='新增';
				      break;
				    case 3:
					  str='修改';
					  break;
					case 4:
					  str='删除';
					  break;
					case 5:
					  str='登录';
					  break;
					case 6:
					  str='上传文件';
					  break;
					default:
					  str='未知';
					}
				return str;
			},
			//获取选中的列
			handleSelectionChange(val) {
		        this.sels = val;
	      	},
	      	
			//获取日志列表
			getLogs() {
				this.tableConfig.params = {
					pageNum: 1,
					pageSize:10,
					keyword: this.filters.keyword
				};
				this.listLoading = true;
				this.$store.dispatch('getLogList',this.tableConfig.params).then((res) => {  
					console.log(this.tableConfig.params)
					this.logList = res;
					this.listLoading = false;
		        });  
			},
		},
		watch:{
		  	logList(){
		  		this.$set(this.tableConfig, "dataList", this.logList);
		  		this.$set(this.tableConfig, "params", this.tableConfig.params);
		  	}
		},
		mounted() {
			this.getLogs();
		},
		components: {
			CommTable,
		}
	}

</script>

<style scoped>
.toolbar{
	background: white;
}
</style>
