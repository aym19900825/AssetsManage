<template>
	<div>
		<el-form inline-message 
				:model="dataInfo" 
				ref="dataInfo" 
				label-width="120px" 
				class="demo-user">
			<h3 class="tit">资产信息</h3>
			<div>
				<el-form-item v-for="item in basicInfo" :key="item.id" :label="item.label" :prop="item.prop" :style="{ width: item.width,display: item.displayType}">
					<el-input v-model="dataInfo[item.prop]" :type="item.type"></el-input>
				</el-form-item>
			</div>
			<h3 class="tit">工作资产</h3>
			<div style="position: relative;">
				<div style="position: absolute; top:-35px; right:40px;">
					<el-button type="success" size="mini" round>
						<i class="icon-add"></i>
						<font>新建行</font>
					</el-button>
				</div>
				<el-table :data="list" border stripe :fit="true" max-height="260" style="width: 100%;">
					<el-table-column  v-for="(item, index) in tableHeader" :key="index" :label="item.label" :prop="item.prop" sortable>
						<template slot-scope="scope">
							<el-input size="small" v-model="scope.row[item.prop]" placeholder="请输入">	
							</el-input>
						</template>
					</el-table-column>
					<el-table-column fixed="right" label="操作" width="120">
						<template slot-scope="scope">
								<el-button title="删除" type="text" size="small">
								<i class="icon-trash red"></i>
							</el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>
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
                        label: '作业计划',
                        prop: 'info1',
                        width: '30%',
                        type: 'input',						
                        displayType: 'inline-block'
					},{
                        label: '描述',
                        prop: 'info2',
                        width: '30%',
                        type: 'input',						
                        displayType: 'inline-block'
					},{
                        label: '组织机构',
                        prop: 'info3',
                        width: '30%',
                        type: 'input',						
                        displayType: 'inline-block'
					},{
                        label: '站点',
                        prop: 'info4',
                        width: '30%',
                        type: 'input',						
                        displayType: 'inline-block'
					},
				],
				dataInfo: {
					info1: '',
					info2: '',
					info3: '',
					info4: '',
				},
				list: [
					{ 
						param1: '',
						param2: '',
						param3: '',
						param4: '',
						param5: '',
					}
				],
				tableHeader: [
					{ label: '工单编号', prop: 'param1' },
					{ label: '工单描述', prop: 'param2' },
					{ label: '资产编号', prop: 'param3' },
					{ label: '资产名称', prop: 'param4' },
					{ label: '位置', prop: 'param5' }
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