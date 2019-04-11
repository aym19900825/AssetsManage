<<script>
export default {
	function  tableHeader(){
		var laberData = [
			'序号',
			'任务编号',
			'人工',
			'工种',
			'技能级别',
			'数量',
			'小时数',
			'费率',
			'成本',
		];
		var taskData = [
			'任务编号',
			'任务类型',
			'任务描述',
			'持续时间(h)',
		];
		var materialData = [
			'序号',
			'任务编号',
			'物资编码',
			'数量',
			'单价',
			'金额',
		];
		var serviceData = [
			'序号',
			'任务编号',
			'服务',
			'数量',
			'单价',
			'成本',
			'供应商',
		];
		var toolData = [
			'序号',
			'任务编号',
			'工具编码',
			'工具数量',
			'工具小时数',
			'费率',
			'成本',
		];
		var workAsset = [
			'工单编号',
			'工单描述',
			'资产编号',
			'资产名称',
			'位置',
		];
		var data = laberData;
		var res = [];
		for (let i = 0; i < data.length; i++) {
			res.push({
				label: data[i],
				prop: 'param'+(i+1)
			});
		}
		console.log(res);
	}
	tableHeader();

	function genData(){
		var len = 5;
		var res = {};
		for (let i = 0; i < len; i++) {
			var paraData = 'param'+(i+1);
			res[paraData] = '';
		}
		console.log(res);
	}
	genData();
}
</script>>