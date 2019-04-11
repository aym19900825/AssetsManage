<template>
	<div>
		<el-table :data="list" border stripe :fit="true" max-height="260" style="width: 100%;">
			<el-table-column label="预防性维护编号" prop="param1" sortable width="260px">
				<template slot-scope="scope">
					<el-input size="small" v-model="scope.row.param1" placeholder="请输入">	
					</el-input>
				</template>
			</el-table-column>

			<el-table-column prop="param2" label="描述" sortable width="240px">
				<template slot-scope="scope">
					<el-input size="small" v-model="scope.row.param2" placeholder="请输入">	
					</el-input>
				</template>
			</el-table-column>

			<el-table-column prop="param3" label="上一完成日期" sortable  width="200px">
				<template slot-scope="scope">
					<el-input size="small" v-model="scope.row.param3" placeholder="请输入"></el-input>
				</template>
			</el-table-column>

			<el-table-column prop="param4" label="最早下一个截止日期" sortable  width="200px">
				<template slot-scope="scope">
					<el-input size="small" v-model="scope.row.param4" placeholder="请输入"></el-input>
				</template>
			</el-table-column>

			<el-table-column prop="param5" label="频率" sortable width="100px">
				<template slot-scope="scope">
					<el-input size="small" v-model="scope.row.param5" placeholder="请输入"></el-input>
				</template>
			</el-table-column>

			<el-table-column prop="param6" label="状态" sortable>
				<template slot-scope="scope">
					<el-input size="small" v-model="scope.row.param6" placeholder="请输入"></el-input>
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
						param1: '' ,
						param2: '' ,
						param3: '' ,
						param4: '' ,
						param5: '' ,
						param6: '' 
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