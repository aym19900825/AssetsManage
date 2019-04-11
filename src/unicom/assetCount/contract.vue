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
			<h3 class="tit">部件信息</h3>
			<el-table :data="list" border stripe :fit="true" max-height="260" style="width: 100%;">
				<el-table-column label="物资编码" prop="S_NAME" sortable width="260px">
					<template slot-scope="scope">
						<el-input size="small" v-model="scope.row.parm1" placeholder="请输入">	
						</el-input>
					</template>
				</el-table-column>

				<el-table-column prop="parm2" label="资产名称" sortable width="240px">
					<template slot-scope="scope">
						<el-input size="small" v-model="scope.row.parm2" placeholder="请输入">	
						</el-input>
					</template>
				</el-table-column>
				<el-table-column prop="parm3" label="规格型号" sortable width="240px">
					<template slot-scope="scope">
						<el-input size="small" v-model="scope.row.parm3" placeholder="请输入">	
						</el-input>
					</template>
				</el-table-column>

				<el-table-column prop="parm4" label="成本" sortable  width="200px">
					<template slot-scope="scope">
						<el-input size="small" v-model="scope.row.parm4" placeholder="请输入"></el-input>
					</template>
				</el-table-column>
				<el-table-column prop="parm5" label="状态" sortable>
					<template slot-scope="scope">
						<el-input size="small" v-model="scope.row.parm5" placeholder="请输入"></el-input>
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

			<h3 class="tit">备件信息</h3>
			<el-table :data="list1" border stripe :fit="true" max-height="260" style="width: 100%;">
				<el-table-column label="序号" prop="S_NAME" sortable width="260px">
					<template slot-scope="scope">
						<el-input size="small" v-model="scope.row.parm1" placeholder="请输入">	
						</el-input>
					</template>
				</el-table-column>

				<el-table-column prop="parm2" label="物资编码" sortable width="240px">
					<template slot-scope="scope">
						<el-input size="small" v-model="scope.row.parm2" placeholder="请输入">	
						</el-input>
					</template>
				</el-table-column>
				<el-table-column prop="parm3" label="资产名称" sortable width="240px">
					<template slot-scope="scope">
						<el-input size="small" v-model="scope.row.parm3" placeholder="请输入">	
						</el-input>
					</template>
				</el-table-column>

				<el-table-column prop="parm4" label="规格型号" sortable  width="200px">
					<template slot-scope="scope">
						<el-input size="small" v-model="scope.row.parm4" placeholder="请输入"></el-input>
					</template>
				</el-table-column>
				<el-table-column prop="parm5" label="数量" sortable  width="200px">
					<template slot-scope="scope">
						<el-input size="small" v-model="scope.row.parm5" placeholder="请输入"></el-input>
					</template>
				</el-table-column>
				<el-table-column prop="parm6" label="单位" sortable  width="200px">
					<template slot-scope="scope">
						<el-input size="small" v-model="scope.row.parm6" placeholder="请输入"></el-input>
					</template>
				</el-table-column>
				<el-table-column prop="parm7" label="库存" sortable  width="200px">
					<template slot-scope="scope">
						<el-input size="small" v-model="scope.row.parm7" placeholder="请输入"></el-input>
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
					},
				],
				dataInfo: {
					info1: '',
					info2: '',
					info3: '',
					info4: '',
				},
				list1: [
					{
						parm1: '',
						parm2: '',
						parm3: '',
						parm4: '',
						parm5: '',
					}
				],
				list2: [
					{
						parm1: '',
						parm2: '',
						parm3: '',
						parm4: '',
						parm5: '',
						parm6: '',
						parm7: '',
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