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
                         <button  class="btn mr5 btn-purple" @click="add">
                            <i class="icon-edit"></i>报表
                        </button>
                        <button  class="btn mr5 btn-red">
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
                        <el-table-column v-for="item in tableHeader" :label="item.label" sortable :prop="item.prop" width="150px">
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
						prop: 'param1'
					},
					{
						label: '设备名称',
						prop: 'param2'
					},
					{
						label: '型号',
						prop: 'param3'
					},
					{
						label: '技术指标',
						prop: 'param4'
					},
					{
						label: '制造商',
						prop: 'param5'
					},
					{
						label: '出厂编号',
						prop: 'param6'
					},
					{
						label: '价格（万元）',
						prop: 'param7'
					},
					{
						label: '接受日期',
						prop: 'param8'
					},
					{
						label: '启用日期',
						prop: 'param9'
					},
					{
						label: '配置地址',
						prop: 'param10'
					},
					{
						label: '接收状态',
						prop: 'param11'
					},
					{
						label: '保管人',
						prop: 'param12'
					},
					{
						label: '备注',
						prop: 'param13'
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