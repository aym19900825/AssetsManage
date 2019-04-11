<template>
	<div style="position: relative;">
		<div style="position: absolute; top:-50px; right:40px;">
			<el-button type="success" size="mini" round>
				<i class="icon-add"></i>
				<font>新建行</font>
			</el-button>
		</div>
		<el-table :data="list" border stripe :fit="true" max-height="260" style="width: 100%;">
			<el-table-column label="物资编码" prop="S_NAME" sortable width="260px">
				<template slot-scope="scope">
					<el-input size="small" v-model="scope.row.parm1" placeholder="请输入">	
					</el-input>
				</template>
			</el-table-column>

			<el-table-column prop="parm2" label="位置" sortable width="240px">
				<template slot-scope="scope">
					<el-input size="small" v-model="scope.row.parm2" placeholder="请输入">	
					</el-input>
				</template>
			</el-table-column>
			<el-table-column prop="parm3" label="资产父级" sortable width="240px">
				<template slot-scope="scope">
					<el-input size="small" v-model="scope.row.parm3" placeholder="请输入">	
					</el-input>
				</template>
			</el-table-column>

			<el-table-column prop="parm4" label="是否固定" sortable  width="200px">
				<template slot-scope="scope">
					<el-input size="small" v-model="scope.row.parm4" placeholder="请输入"></el-input>
				</template>
			</el-table-column>

			<el-table-column prop="parm5" label="采购订单" sortable  width="200px">
				<template slot-scope="scope">
					<el-input size="small" v-model="scope.row.parm5" placeholder="请输入"></el-input>
				</template>
			</el-table-column>

			<el-table-column prop="parm6" label="责任人" sortable width="100px">
				<template slot-scope="scope">
					<el-input size="small" v-model="scope.row.parm6" placeholder="请输入"></el-input>
				</template>
			</el-table-column>

			<el-table-column prop="parm7" label="出厂序列号" sortable>
				<template slot-scope="scope">
					<el-input size="small" v-model="scope.row.parm7" placeholder="请输入"></el-input>
				</template>
			</el-table-column>
			<el-table-column prop="parm8" label="规格型号" sortable>
				<template slot-scope="scope">
					<el-input size="small" v-model="scope.row.parm8" placeholder="请输入"></el-input>
				</template>
			</el-table-column>
			<el-table-column prop="parm9" label="采购价格" sortable>
				<template slot-scope="scope">
					<el-input size="small" v-model="scope.row.parm9" placeholder="请输入"></el-input>
				</template>
			</el-table-column>
			<el-table-column prop="parm10" label="运行情况" sortable>
				<template slot-scope="scope">
					<el-input size="small" v-model="scope.row.parm10" placeholder="请输入"></el-input>
				</template>
			</el-table-column>
			<el-table-column prop="parm11" label="状态" sortable>
				<template slot-scope="scope">
					<el-input size="small" v-model="scope.row.parm11" placeholder="请输入"></el-input>
				</template>
			</el-table-column>
			<el-table-column prop="parm12" label="修改人" sortable>
				<template slot-scope="scope">
					<el-input size="small" v-model="scope.row.parm12" placeholder="请输入"></el-input>
				</template>
			</el-table-column>
			<el-table-column prop="parm13" label="修改时间" sortable>
				<template slot-scope="scope">
					<el-input size="small" v-model="scope.row.parm13" placeholder="请输入"></el-input>
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
						parm1: '',
						parm2: '',
						parm3: '',
						parm4: '',
						parm5: '',
						parm6: '',
						parm7: '',
						parm8: '',
						parm9: '',
						parm10: '',
						parm11: '',
						parm12: '',
						parm13: '',
					}
				]
			}
		},
		methods: {
			
		},
	}
</script>