<template>
	<el-dialog title="修改分类" :visible="isVisible" :before-close="closeDialog" :close-on-click-modal=false class="foodType-dialog">
		<el-form :model="foodTypeForm" label-width="100px" :rules="foodTypeFormRules" ref="foodTypeForm" class="foodType-form">
			<el-form-item label="分类编号:" prop="categoryId">
				<el-input :disabled="true" v-model="foodTypeForm.categoryId" auto-complete="off" class="foodType-input"></el-input>
				<span class="foodType-note">(自动生成)</span>
			</el-form-item>
			<el-form-item label="分类名称:" prop="categoryName">
				<el-input v-model="foodTypeForm.categoryName" auto-complete="off" class="foodType-input"></el-input>
			</el-form-item>
			<el-form-item label="分类描述:">
				<el-input type="textarea" v-model="foodTypeForm.categoryDesc" class="foodType-desc"></el-input>
			</el-form-item>
		</el-form>
		<div slot="footer" class="dialog-footer">
			<el-button type="primary" @click.native="closeDialog">取消</el-button>
			<el-button type="primary" @click.native="onSubmit" :loading="addLoading">提交</el-button>
		</div>
	</el-dialog>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
	props: [
		'isVisible',
		'foodTypeData'
	],
	data() {
		return{
			addLoading: false,
			foodTypeFormRules: {
				categoryId: [
					{ required: true, message: '必填项', trigger: 'blur' }
				],
				typeName: [
					{ required: true, message: '请输入名称', trigger: 'blur' }
				]
			},
		}
	},
	computed: {
		...mapGetters([
			'foodTypeTree'
   		]),
		foodTypeForm() {
			console.log(this.foodTypeData.categoryId)
			return {
				categoryId: this.foodTypeData.categoryId? this.foodTypeData.categoryId: '',
				categoryName: this.foodTypeData.categoryName? this.foodTypeData.categoryName: '',
				categoryDesc: this.foodTypeData.categoryDesc? this.foodTypeData.categoryDesc: '',
			}
		}
	},
	methods: {
		//提交
		onSubmit: function () {
			this.$refs.foodTypeForm.validate((valid) => {
				if (valid) {
					this.addLoading = true;
					let para = Object.assign({},this.foodTypeData, {createDate:'', updateDate:''}, this.foodTypeForm);
					this.$store.dispatch('editFoodType',para).then((res) => {
						this.addLoading = false;
						this.editFormVisible = false;
						if(res.status==200){
							this.$message({
								message: '修改分类成功！',
								type: 'success'
							});
							this.getFoodType();//刷新父页面
							this.closeDialog();//关闭窗口
						}else{
							this.$message({
								message: '修改分类失败！',
								type: 'error'
							});
						}
			    	});  
				}
			});
		},
		getFoodType() {
			let para = {
				pageNum: this.foodTypeTree.pageNum ? this.getByPage.pageNum : 1,
				pageSize: this.foodTypeTree.pageSize ? this.getByPage.pageSize : 10,
				keyWord: this.foodTypeTree.keyWord ? this.getByPage.keyWord : '',
			};
			this.$store.dispatch('getFoodTypeTree',para);
		},
		//触发调用父组件关闭窗口方法
		closeDialog() {
			this.$emit("close");
		}
	}
}
</script>

<style lang="scss" scoped>
.foodType-dialog{
	.foodType-form{
		.foodType-note{
			color: #4db3ff;
			margin-left: 1em;
		}
		.foodType-input{
			width: 40% !important;
		}
		.foodType-desc{
			width:70% !important;
		}
	}
	.dialog-footer{
		text-align: center;
	}
}
</style>