<template>
	<div class="food-container" id="food-container">
		<div id="food-left">
		 	<el-tree
			  :data="foodTypeTree"
			  :props="defaultProps"
			  node-key="categoryId"
			  default-expand-all
			  :expand-on-click-node="false"
			  :highlight-current= true
			  @node-click="handleClick"
		  	>
			</el-tree>
		</div>
		<div id="food-middle"></div>
		<div id="food-right">
		 	<div class="food-top">
				<el-button type="primary" @click="addSubmit">新增</el-button>
				<el-button type="primary" :disabled="this.sels.length===0" @click="batchRemove">删除</el-button>
				<el-input
					title="请输入关键字（编号，名称，类别）"
				  	placeholder="请输入关键字（编号，名称，类别，）"
				  	icon="search"
				  	v-model="searchVaule"
				  	:on-icon-click="handleSearch"
				  	@keyup.enter.native="handleSearch"
				  >
				</el-input>
			</div>
			<CommTable  :tableConfig="tableConfig"></CommTable>
			<FoodInfo :dialogFormVisible="dialogFormVisible" :foodInfo="foodInfo" @hiddenInfo="hiddenInfo"></FoodInfo>
		</div>
	</div>
</template>

<script>
import CommTable from '../../../../components/CommTable';
import FoodInfo from './FoodInfo';
import DivideUtil from '../../../../util/divideUtil';
import { mapGetters } from 'vuex'
 export default {
 	components:{
 		CommTable,
 		FoodInfo
 	},
    data() {
    	const columns = [{
		        label:'食物编号',
		        prop:'foodId',
		        handelLink:this.clickLick,
	        },
	        {
	          	label:'食物名称',
	          	prop:'foodName',
	        },
	        {
	          	label:'食物单价(元/斤)',
	          	prop:'price',
	        },
	        {
	          	label:'来源',
	          	prop:'source',
	        },
	        {
	          	label:'库存量(斤)',
	          	prop:'storage',
	        },
	        {
	          	label: "操作",
	          	width: 190,
		  		operations: [
			  		{
			          label: '修改',
			          butType: 'info',
			          func: this.handleEdit,
			          flag:this.butIsShow,
		        	},
		        	{
			          label: this.labelFun,
			          butType: 'info',
			          func: this.handleAction,
			          flag:this.butIsShow,
		        	},
		        	{
			          label: '删除',
			          butType: 'danger',
			          func: this.handleDelete,
			          flag:this.butIsShow,
		        	}
		        ]
	        }];
	    //查询参数
        let params = {
        	pageNum: 1,
			pageSize:10,
			keyword: ''
        }
      	return {
      		foodInfo:'',
      		dialogFormVisible:false,//详情
      		tableConfig: {
		      	columns,
		      	dispatch: 'getByPage',
		      	params,
		      	dataList: [],
		      	rowOptions:this.handleSelectionChange,
		      	listLoading:true,
		      	butIsShow:true,
    		},
    		searchVaule: '',//检索值
    		sels: [],//列表选中列
    		categoryId:'',//分类id
		    defaultProps: {
		      	children: 'children',
		      	label: 'categoryName'
		    }
  		}
	},
	computed: {
	 	...mapGetters([
			'getByPage',
			'foodTypeTree'
   		])
	},
	watch: {
		getByPage() {
            this.$set(this.tableConfig, "dataList", this.getByPage);
            this.$set(this.tableConfig, "listLoading", false);
		}
	},
	methods: {
		//子组件控制父组件隐藏
		hiddenInfo(visible){
			this.dialogFormVisible = visible;
		},
		//点击链接显示详情
		clickLick(row){
			this.dialogFormVisible=true;
			this.foodInfo=row;
		},
		//是否在操作列中显示删除(true-显示, false-不显示)
		butIsShow(index, row,label) {
			//console.log(1111)
			if(label == '修改'){
				return true;
			}else if(label == '删除'){
				return true;
			}else{
				return false;
			}
		},
		//初始化或者刷新表格
		getFoods() {
			let para = {
				pageNum: this.getByPage.pageNum ? this.getByPage.pageNum : 1,
				pageSize: this.getByPage.pageSize ? this.getByPage.pageSize : 10,
				keyword: this.searchVaule
			};
			this.$store.dispatch('getByPage',para);
		},
		//点击分类
		handleClick(data) {
			let para = {
				pageNum:  1,
				pageSize: 10,
				categoryId: data.categoryId,
				keyword:'',
			};
			this.$store.dispatch('getByCategoryIdAndKeyword', para);
			this.categoryId = data.categoryId;
		},
		//新增
		addSubmit() {
			if(this.categoryId == ''){
				this.$message({
					message: '请先选择食物分类',
					type: 'error'
				});
				return;
			}
			this.$router.push({ path: '/goods/book/addBook' ,query: { categoryId: this.categoryId }});
		},
		//关键字检索
		handleSearch(ev) {
			let para = {
				pageNum: this.getByPage.pageNum ? this.getByPage.pageNum : 1,
				pageSize: this.getByPage.pageSize ? this.getByPage.pageSize : 10,
				keyword: this.searchVaule,
				categoryId: this.categoryId
			};
			this.$store.dispatch('getByPage',para);
		},
		//行中修改
		handleEdit(index, row) {
			this.$router.push({ path: '/goods/book/editBook' ,query: { bookId: row.bookId }});
		},
		//行中删除
		handleDelete(index, row) {
			this.$confirm('确认删除该记录吗?', '提示', {
				type: 'error'
			}).then(() => {
				let para = { foodId: row.foodId };
				this.$store.dispatch('removeBook',para).then((res) => {
					if(res.status==200){
						this.$message({
							message: '删除成功！',
							type: 'success'
						});
						this.getFoods();
					}else{
						this.$message({
							message: '删除失败！',
							type: 'error'
						});
					}
			    });  
			});
		},
		//批量删除
		batchRemove() {
			let bookIds = this.sels.map(item => item.bookId).toString();
			let para = {bookId:bookIds}
			this.$confirm('确认删除选中记录吗？', '提示', {
				type: 'error'
			}).then(() => {
				this.$store.dispatch('removeBook',para).then((res) => {
					if(res.status==200){
						this.$message({
							message: '删除成功！',
							type: 'success'
						});
						this.getFoods();
					}else{
						this.$message({
							message: '删除失败！',
							type: 'error'
						});
					}
			    });
			})
		},
		//列表勾选的行
		handleSelectionChange(val) {
		    this.sels = val;
	    },
	    //状态不同显示不同操作
	    labelFun(index,row) {
	    	let str = '下架';
	    	if(row.state == 0){
	    		str = '上架';
	    	}else if(row.state ==1){
	    		str = '下架';
	    	}
	    	return str;
	    },
	    //上/下架操作
	    handleAction(index, row) {
	    	let tempState =0;
	    	if(row.state==0){
	    		tempState = 1;
	    	}
	    	let para = { foodId: row.foodId, state: tempState };
			this.$store.dispatch('changeState',para).then((res) => {
				if(res.status==200){
					this.$message({
						message: '操作成功！',
						type: 'success'
					});
					this.getFoods();
				}else{
					this.$message({
						message: '操作失败！',
						type: 'error'
					});
				}
		    });
	    },
	},
	mounted() {
		let para = {
				pageNum: 1,
				pageSize:  10,
				keywrd: ''
			};
		this.$store.dispatch('getFoodTypeTree',para);
		let user = JSON.parse(sessionStorage.getItem('user'));
		this.getFoods();
		//分栏拖拽
		DivideUtil.divideFun("food-container", "food-left", "food-middle", "food-right");
	},
};
</script>

<style scoped lang="scss">
.food-container {
	margin-top: 10px;
	position: relative;
	height: 50em;
	/*overflow: hidden;*/
	#food-left, #food-right, #food-middle { 
		height:100%; 
		position:absolute;
	}
	#food-left {
		width:300px;
	}
	#food-middle {
		width:9px;
		left:300px;
	}
	#food-middle:hover{ cursor:col-resize;}
	#food-right {
		right:0; 
		left:309px; 
		width:auto;
	}
	.food-top{
		margin-bottom: 5px;
		float: left;
		width:100%;
		.el-input{
			width: 20%;
			display: inline-block;
			float: right;
		}
	}
}
</style>