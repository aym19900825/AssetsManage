<template>
	<div>
		<el-form inline-message 
					:model="dataInfo" 
					ref="dataInfo" 
					label-width="120px" 
					class="demo-user">
			<h3 class="tit">设备信息</h3>
			<div>
				<el-form-item v-for="item in basicInfo" :key="item.id" :label="item.label" :prop="item.prop" :style="{ width: item.width,display: item.displayType}">
					<el-input v-model="dataInfo[item.prop]" :type="item.type"></el-input>
				</el-form-item>
			</div>
			<h3 class="tit">维修信息</h3>
			<el-table :data="list" border stripe :fit="true" max-height="260" style="width: 100%;">
				<el-table-column label="工单编号" prop="param1" sortable width="260px">
					<template slot-scope="scope">
						<el-input size="small" v-model="scope.row.param1" placeholder="请输入">	
						</el-input>
					</template>
				</el-table-column>

				<el-table-column prop="param2" label="作业计划" sortable width="240px">
					<template slot-scope="scope">
						<el-input size="small" v-model="scope.row.param2" placeholder="请输入">	
						</el-input>
					</template>
				</el-table-column>
				<el-table-column prop="param3" label="维修类型" sortable width="240px">
					<template slot-scope="scope">
						<el-input size="small" v-model="scope.row.param3" placeholder="请输入">	
						</el-input>
					</template>
				</el-table-column>

				<el-table-column prop="param4" label="开始时间" sortable  width="200px">
					<template slot-scope="scope">
						<el-input size="small" v-model="scope.row.param4" placeholder="请输入"></el-input>
					</template>
				</el-table-column>

				<el-table-column prop="param5" label="完成时间" sortable  width="200px">
					<template slot-scope="scope">
						<el-input size="small" v-model="scope.row.param5" placeholder="请输入"></el-input>
					</template>
				</el-table-column>

				<el-table-column prop="param6" label="创建人" sortable width="100px">
					<template slot-scope="scope">
						<el-input size="small" v-model="scope.row.param6" placeholder="请输入"></el-input>
					</template>
				</el-table-column>

				<el-table-column prop="param7" label="创建时间" sortable>
					<template slot-scope="scope">
						<el-input size="small" v-model="scope.row.param7" placeholder="请输入"></el-input>
					</template>
				</el-table-column>

				<el-table-column fixed="right" label="操作" width="120" v-if="!viewtitle">
					<template slot-scope="scope">
							<el-button title="删除" type="text" size="small">
							<i class="icon-trash red"></i>
						</el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-form>
	</div>
</template>

<script>
	import Config from '../../config.js'
	export default {
		name: 'premainHistory',
		// props: ['detailData'],
		data() {
			return{
				basicInfo: [
					{
                        label: '资产编码',
                        prop: 'info1',
                        width: '30%',
                        type: 'input',						
                        displayType: 'inline-block'
					},{
                        label: '资产名称',
                        prop: 'info2',
                        width: '30%',
                        type: 'input',						
                        displayType: 'inline-block'
					},{
                        label: '状态',
                        prop: 'info3',
                        width: '30%',
                        type: 'input',						
                        displayType: 'inline-block'
					},{
                        label: '类型',
                        prop: 'info4',
                        width: '30%',
                        type: 'input',						
                        displayType: 'inline-block'
					},{
                        label: '公司编号',
                        prop: 'info5',
                        width: '30%',
                        type: 'input',						
                        displayType: 'inline-block'
					},
					{
                        label: '公司名称',
                        prop: 'info6',
                        width: '30%',
                        type: 'input',						
                        displayType: 'inline-block'
					}
				],
				dataInfo: {
					info1: '',
					info2: '',
					info3: '',
					info4: '',
					info5: '',
					info6: '',
				},
				list: [
					{
						param1: '',
						param2: '',
						param3: '',
						param4: '',
						param5: '',
						param6: '',
						param7: '',
					}
				]
			}
		},
		methods: {
			
		},
	}
</script>
<style>
	.tit{
		font-size: 16px;
	}
</style>