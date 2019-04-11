<template>
<div>
	<div class="wrapper wrapper-content">
        <div class="ibox-content">
            <div class="fixed-table-toolbar clearfix">
                <div class="bs-bars pull-left">
                    <div class="hidden-xs" id="roleTableToolbar" role="group">
                        <button  class="btn mr5 btn-green" @click="add">
                            <i class="icon-add"></i>添加
                        </button>
                        <button  class="btn mr5 btn-blue" @click="modify">
                            <i class="icon-edit"></i>修改
                        </button>
                        <button  class="btn mr5 btn-purple">
                            <i class="icon-trash"></i>删除
                        </button>
                    </div>
                </div>
                <div class="columns columns-right btn-group pull-right">
                    <div id="refresh" title="刷新" class="btn btn-default btn-refresh"><i class="icon-refresh"></i></div>
                    <tableControle :tableHeader="tableHeader" :checkedName="checkedName"  ref="tableControle"></tableControle>
                </div>
            </div>
            <el-row class="relative">
                <el-col :span="24" class="leftcont" id="right">
                    <!-- 表格 Begin-->
                    <v-table ref="table" :appName="appName"  @getSelData="setSelData">
                        <el-table-column label="资产编码" width="130" sortable prop="ASSETNUM" v-if="this.checkedName.indexOf('设备编号')!=-1">
                            <template slot-scope="scope">
                                <p class="blue" title="点击查看详情" @click=view(scope.row)>{{scope.row.ASSETNUM}}
                                </p>
                            </template>
                        </el-table-column>
                        <el-table-column label="父级资产" width="200" sortable prop="DESCRIPTION" v-if="this.checkedName.indexOf('设备名称')!=-1">
                        </el-table-column>
                        <el-table-column label="资产名称" width="160" sortable prop="MODEL" v-if="this.checkedName.indexOf('型号')!=-1">
                        </el-table-column>
                        <el-table-column label="规格型号" width="140" sortable prop="ASSET_KPI" v-if="this.checkedName.indexOf('技术指标')!=-1">
                        </el-table-column>						
                        <el-table-column label="出厂序列号" width="140" sortable prop="VENDOR" v-if="this.checkedName.indexOf('制造商')!=-1">
                        </el-table-column>
                        <el-table-column label="井号" width="160" sortable prop="FACTOR_NUM" v-if="this.checkedName.indexOf('出厂编号')!=-1">
                        </el-table-column>
                        <el-table-column label="位置" width="140" sortable prop="A_PRICE" v-if="this.checkedName.indexOf('价格(万元)')!=-1">
                        </el-table-column>
                        <el-table-column label="责任人" width="140" sortable prop="ACCEPT_DATE"  v-if="this.checkedName.indexOf('接受日期')!=-1">
                        </el-table-column>
                        <el-table-column label="生产厂家" width="140" sortable prop="S_DATE"  v-if="this.checkedName.indexOf('启用日期')!=-1">
                        </el-table-column>						
                        <el-table-column label="报废日期" width="140" sortable prop="C_ADDRESS" v-if="this.checkedName.indexOf('配置地址')!=-1">
                        </el-table-column>
                        <el-table-column label="创建人" width="120" sortable prop="A_STATUS" v-if="this.checkedName.indexOf('接收状态')!=-1">
                        </el-table-column>
                        <el-table-column label="创建日期" width="200" sortable prop="KEEPER" v-if="this.checkedName.indexOf('保管人')!=-1">
                        </el-table-column>						
                        <el-table-column label="状态" width="200" sortable prop="MEMO" v-if="this.checkedName.indexOf('备注')!=-1">
                        </el-table-column>
                    </v-table>
                    <!-- 表格 End-->
                </el-col>
            </el-row>
        </div>
    </div>
    <!--右侧内容显示 End-->
    <detail ref="detailPage"></detail>
    <!--报表-->
    <!-- <reportmask :reportData="reportData" ref="reportChild" ></reportmask> -->
</div>
</template>
<script>
	import Config from '../../config.js'
	import tableControle from '@/components/plugin/table-controle/controle.vue'
	import detail from './detail.vue'
	// import reportmask from'../reportDetails/reportMask.vue'
	import vTable from '@/components/plugin/table/table.vue'
	export default {
		name: 'instruments',
		components: {
			'detail': detail,
			'tableControle': tableControle,
			// 'reportmask': reportmask,
			'v-table': vTable
		},
		data() {
			return {
                isShow: true,
                appName: 'asset',
				searchData: {
			        page: 1,
			        limit: 10,//分页显示数
			        A_NAME: '',
			        VENDOR: '',
			        KEEPER: '',
			        STATE: '',
			        OPTION_STATUS: ''
		        },
				checkedName: [
					'资产编码',
					'设备名称',
					'型号',
					'技术指标',
					'制造商',
					'出厂编号',
					'价格（万元）',
					'接受日期',
					'启用日期',
					'配置地址',
					'接收状态',
					'保管人',
					'备注',
				],
				tableHeader: [
					{
						label: '资产编码',
						prop: 'ASSETNUM'
					},
					{
						label: '设备名称',
						prop: 'DESCRIPTION'
					},
					{
						label: '型号',
						prop: 'MODEL'
					},
					{
						label: '技术指标',
						prop: 'ASSET_KPI'
					},
					{
						label: '制造商',
						prop: 'VENDOR'
					},
					{
						label: '出厂编号',
						prop: 'FACTOR_NUM'
					},
					{
						label: '价格（万元）',
						prop: 'A_PRICE'
					},
					{
						label: '接受日期',
						prop: 'ACCEPT_DATE'
					},
					{
						label: '启用日期',
						prop: 'S_DATE'
					},
					{
						label: '配置地址',
						prop: 'C_ADDRESS'
					},
					{
						label: '接收状态',
						prop: 'A_STATUS'
					},
					{
						label: '保管人',
						prop: 'KEEPER'
					},
					{
						label: '备注',
						prop: 'MEMO'
					}
                ],
                selData: []
            }
		},
		methods: {
            setSelData(val){
				this.selData = val;
            },
            add(){
                this.$refs.detailPage.addPage();
            }
		}
	}
</script>