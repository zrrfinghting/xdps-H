<template>
	<div class="bookType-container">
		<div class="bookType-top">
			<el-dropdown @command="handleAdd" v-if="foodTypeTree.length!=0">
			 	<el-button type="primary"> 新增<i class="el-icon-caret-bottom el-icon--right"></i>
			 </el-button>
			  <el-dropdown-menu slot="dropdown">
			    <el-dropdown-item command=1 :disabled="this.sels.length===0">同级分类</el-dropdown-item>
			    <el-dropdown-item command=0 :disabled="this.sels.length===0">下级分类</el-dropdown-item>
			  </el-dropdown-menu>
			</el-dropdown>
			<!--<el-button type="primary" @click="addBaseFoodType">新增</el-button>-->
			<el-button type="primary" :disabled="this.sels.length===0" @click="batchRemove">删除</el-button>
			<el-input
				title="请输入关键字（分类编号，分类名称,分类描述）"
			  	placeholder="请输入关键字（分类编号，分类名称,分类描述）"
			  	icon="search"
			  	v-model="searchVaule"
			  	:on-icon-click="getFoodType"
			  	@keyup.enter.native="getFoodType">
			</el-input>
		</div>
		<TreeGrid :columns="columns" :treeStructure="true" :dataSource="dataSource" :rowOptions="handleSelectionChange" @refresh="getFoodType"></TreeGrid>
		<!--新增界面-->
	  	<AddFoodType :isVisible='addFormVisible' @close="closeDialog" :baseFoodCategoryId='baseFoodCategoryId' :addLevel="addLevel" ></AddFoodType>
	</div>
</template>

<script>
import TreeGrid from './TreeGrid'
import AddFoodType from './AddFoodType'
import { mapGetters } from 'vuex'
export default {
	components: {
		TreeGrid,
		AddFoodType
	},
	data() {
		return {
			searchVaule:'',//检索值
    		sels: [],//列表选中列
    		addFormVisible: false,
    		baseFoodCategoryId: '',
    		addLevel: '',
	        columns: [
	          {
	            label: '分类编号',
	            prop: 'categoryId'
	          },
	          {
	            label: '分类名称',
	            prop: 'categoryName'
	          },
	          {
	            label: '分类人',
	            prop: 'createUser'
	          },
	          {
	            label: '分类描述',
	            prop: 'categoryDesc'
	          },
	          {
	            label: '分类时间',
	            prop: 'createDate'
	          }
	        ],
		}
	},
	computed: {
	 	...mapGetters([
			'foodTypeTree'
   		]),
   		dataSource() {
   			return this.foodTypeTree;
   		},
	},
	methods: {
		//初始化或者刷新表格
		getFoodType() {
			let para = {
				pageNum: this.foodTypeTree.pageNum ? this.getByPage.pageNum : 1,
				pageSize: this.foodTypeTree.pageSize ? this.getByPage.pageSize : 10,
				keyword: this.searchVaule,
			};
			this.$store.dispatch('getFoodType',para);
		},
		handleAdd(command) {
			if(this.sels.length != 1){
				this.$confirm('请选择一个分类!', '提示', {
		            confirmButtonText: '确定',
		            showCancelButton: false,
		            type: 'warning'
		        })
			}else{
				this.baseFoodCategoryId = this.sels[0].categoryId;
				this.addLevel = command;
				this.addFormVisible = true;
			}
		},
		//新增根分类
		addBaseFoodType() {
			this.baseFoodCategoryId = '';
			this.addLevel = -1;
			this.addFormVisible = true;
		},
		//列表勾选的行
		handleSelectionChange(val) {
			
		    this.sels = val;
	    },
	    //批量删除
		batchRemove: function () {
//			var codes = this.sels.map(item => item.reclaimCode).toString();
			this.$confirm('确认删除选中记录吗？', '提示', {
				type: 'error'
			}).then(() => {
				alert(this.getFoodType())
				this.getFoodType();
			})
		},
		closeDialog() {
			this.addFormVisible = false;
		}
	},
	mounted() {
		this.getFoodType();
	},
}
</script>

<style scoped lang="scss">
.bookType-container{
	margin-top: 1em;
	width: 100%;
	.bookType-top{
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