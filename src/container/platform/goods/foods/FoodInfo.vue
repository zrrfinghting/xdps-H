<template>
		<el-dialog title="食物详情"  :visible.sync="dialogFormVisible1"  class="user-info" :before-close="hiddenInfo">
	        <div class="line"></div>
	        <el-form label-width="100px" >
	        	<el-row>
				 	<div align="center">
				 		<img :src="url" ></img>
				 	</div>
				</el-row>
	            <el-row>
				 <el-col :span="12">
				 	<el-form-item label="食物编号：">
						<div class="content-info">{{foodInfo.foodId}}</div>
					</el-form-item>
				 </el-col>
				 <el-col :span="12">
				 	<el-form-item label="食物名称：">
						<div class="content-info">{{foodInfo.foodName}}</div>
					</el-form-item>
				 </el-col>
			</el-row>
			<el-row>
				 <el-col :span="12">
				 	<el-form-item label="来源：">
				 		<div class="content-info">{{foodInfo.source}}</div>
					</el-form-item>
				 </el-col>
				 <el-col :span="12">
				 	<el-form-item label="价格：">
						<div class="content-info">{{foodInfo.price}}</div>
					</el-form-item>
				 </el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item label="食物简介：">
					<div class="content-info">{{foodInfo.foodDes}}</div>
				    </el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="库存量：">
					<div class="content-info">{{foodInfo.storage}}</div>
				</el-form-item>
				</el-col>
			 	
			</el-row>
	        </el-form>
	        <span slot="footer" class="dialog-footer">
	            <el-button type="primary" @click="hiddenInfo">确 定</el-button>
	        </span>
	    </el-dialog>
</template>

<script>
  	import { mapGetters } from 'vuex';
  	import {Host} from '../../../../api/Host';
	export default {
		props: [
			'foodInfo',
			'dialogFormVisible'
		],
		data() {
			return {
				dialogFormVisible1:false,
			}
		},
		methods: {
			//隐藏子组件
			hiddenInfo() {
                this.$emit('hiddenInfo', false);
            }
		},
		computed: {
		 ...mapGetters([
	   		 ]),
	   		 url(){
	   		 	return Host+`bookpicture/`+this.foodInfo.image_l;
	   		 }
	    },
		mounted() {
		},
		components: {
		},
		watch:{
			dialogFormVisible(){
				return this.dialogFormVisible1 = this.dialogFormVisible;
			}
		}
	}
</script>
<style scoped lang="scss">
.user-info{
	img{
		width:100px;
		height:150px;
	}
	.line {
	    border-bottom: 1px solid #e4e4e4;
        margin-top: -17px;
        margin-bottom: 20px;
	}
	.content-info{
		border-bottom: 1px solid;
	    width: 80%;
	    text-align: center;
        height: 30px;
	}
}
</style>

