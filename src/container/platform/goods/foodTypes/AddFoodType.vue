<template>
	<el-dialog title="新增分类" :visible="isVisible" :before-close="closeDialog" :close-on-click-modal="false" class="foodType-dialog">
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
export default {
	props: [
		'isVisible',
		'baseFoodCategoryId',
		'addLevel'
	],
	data() {
		return{
			addLoading: false,
			foodTypeForm: {
			categoryId: '001004',
			categoryName: '',
			categoryDesc: '',
			},
			foodTypeFormRules: {
				categoryId: [
					{ required: true, message: '必填项', trigger: 'blur' }
				],
				categoryName: [
					{ required: true, message: '请输入名称', trigger: 'blur' }
				]
			},
		}
	},
	methods: {
		//新增
		onSubmit: function () {
			this.$refs.foodTypeForm.validate((valid) => {
				if (valid) {
					console.log(this.baseFoodCategoryId)
					console.log(this.addLevel)
					this.addLoading = true;
					let foodTypeJson = Object.assign({}, this.foodTypeForm, {parentId: this.baseFoodCategoryId});
					let para = {foodType:foodTypeJson,level:this.addLevel}
					this.$store.dispatch('addFoodType',para).then((res)=> {
						this.addLoading = false;
						this.$message({
							message: '提交成功',
							type: 'success'
						});
						this.$refs['foodTypeForm'].resetFields();
						this.closeDialog();
						this.$router.push({ path: '/goods/food'});
					});
				}
			});
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