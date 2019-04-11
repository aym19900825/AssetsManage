<template>
	<div>
		<h3 class="tit">资产信息</h3>
		<el-form inline-message :model="dataInfo" ref="dataInfo" label-width="120px" class="demo-user">
			<div>
				<el-form-item v-for="item in basicInfo" :key="item.id" :label="item.label" :prop="item.prop" :style="{ width: item.width, display: item.displayType}">
					<el-input v-model="dataInfo[item.prop]" :type="item.type" v-if="item.type=='input'"></el-input>
					<el-input v-model="dataInfo[item.prop]" :type="item.type" v-if="item.type=='inputSelect'" disabled>
						<el-button slot="append" icon="el-icon-search"></el-button>
					</el-input>
					<el-input v-model="dataInfo[item.prop]" :type="item.type" v-if="item.type=='textarea'"></el-input>
					<el-date-picker v-model="dataInfo[item.prop]" value-format="yyyy-MM-dd" v-if="item.type=='date'">
					</el-date-picker>
					<el-select clearable v-model="dataInfo[item.prop]"  v-if="item.type=='select'" filterable allow-create default-first-option placeholder="请选择">
						<el-option v-for="(data,index) in selectData" :key="index" :value="data.id" :label="data.fullname"></el-option>
					</el-select>
				</el-form-item>
			</div>
		</el-form>
		<h3 class="tit">部件信息</h3>
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
	</div>
</template>

<script>
	import Config from '../../config.js'
	export default {
		name: 'premainHistory',
		// props: ['detailData'],
		data() {
			return{
				selectData: [],
				basicInfo: [
					{
                        label: '工单编号',
                        prop: 'param1',
                        width: '30%',
                        type: 'input',						
                        displayType: 'inline-block'
                    },
                    {
                        label: '工单描述',
                        prop: 'param2',
                        width: '30%',
                        type: 'input',
                        displayType: 'inline-block'
                    },
                    {
                        label: '工单类型',
                        prop: 'param3',
                        width: '30%',
                        type: 'select',
                        displayType: 'inline-block'
                    },
                    {
                        label: '状态',
                        prop: 'param4',
                        width: '30%',
                        type: 'input',
						displayType: 'inline-block'
					},
					{
                        label: '故障代码',
                        prop: 'param5',
                        width: '30%',
                        type: 'inputSelect',
						displayType: 'inline-block'
					}
				],
				dataInfo: {
					param1: '',
					param2: '',
					param3: '',
					param4: '',
					param5: '',
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
					{ label: '序号', prop: 'param1' },
					{ label: '资产编码', prop: 'param2' },
					{ label: '故障代码', prop: 'param3' },
					{ label: '故障类型', prop: 'param4' },
					{ label: '故障描述', prop: 'param5' }
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