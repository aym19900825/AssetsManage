<template>
	<div>
		<el-table :data="list" border stripe :fit="true" max-height="260" style="width: 100%;">
			<el-table-column label="工单编号" prop="S_NAME" sortable width="260px">
				<template slot-scope="scope">
					<el-input size="small" v-model="scope.row.S_NAME" placeholder="请输入">	
					</el-input>
				</template>
			</el-table-column>

			<el-table-column prop="P_DESC" label="作业计划" sortable width="240px">
				<template slot-scope="scope">
					<el-input size="small" v-model="scope.row.P_DESC" placeholder="请输入">	
					</el-input>
				</template>
			</el-table-column>
			<el-table-column prop="P_DESCs" label="维修类型" sortable width="240px">
				<template slot-scope="scope">
					<el-input size="small" v-model="scope.row.P_DESCs" placeholder="请输入">	
					</el-input>
				</template>
			</el-table-column>

			<el-table-column prop="REMARKS" label="开始时间" sortable  width="200px">
				<template slot-scope="scope">
					<el-input size="small" v-model="scope.row.COMPLETE_DATE" placeholder="请输入"></el-input>
				</template>
			</el-table-column>

			<el-table-column prop="COMPLETE_DATE" label="完成时间" sortable  width="200px">
				<template slot-scope="scope">
					<el-input size="small" v-model="scope.row.COMPLETE_DATE" placeholder="请输入"></el-input>
				</template>
			</el-table-column>

			<el-table-column prop="LEADER" label="创建人" sortable width="100px">
				<template slot-scope="scope">
					<el-input size="small" v-model="scope.row.LEADER" placeholder="请输入"></el-input>
				</template>
			</el-table-column>

			<el-table-column prop="STATE" label="创建时间" sortable>
				<template slot-scope="scope">
					<el-input size="small" v-model="scope.row.ASSIST_PERSION" placeholder="请输入"></el-input>
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
	</div>
</template>

<script>
	import Config from '../../config.js'
	export default {
		name: 'premainHistory',
		// props: ['detailData'],
		data() {
			return{
				list: [
					{
						S_NAME: '',
						P_DESC: '',
						P_DESCs: '',
						REMARKS: '',
						COMPLETE_DATE: '',
						LEADER: '',
						STATE: '',
					}
				]
			}
		},
		methods: {
			
		},
	}
</script>