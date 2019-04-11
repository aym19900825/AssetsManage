<template>
	<div style="position: relative;">
		<div style="position: absolute; top:-50px; right:40px;">
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
</template>

<script>
	import Config from '../../config.js'
	export default {
		name: 'premainHistory',
		// props: ['detailData'],
		data() {
			return{
				selectData: [],
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
				],
				tableHeader: [ 
					{ label: '序号', prop: 'param1' },
					{ label: '任务编号', prop: 'param2' },
					{ label: '工具编码', prop: 'param3' },
					{ label: '工具数量', prop: 'param4' },
					{ label: '工具小时数', prop: 'param5' },
					{ label: '费率', prop: 'param6' },
					{ label: '成本', prop: 'param7' }
				]
			}
		},
		methods: {
			
		},
	}
</script>