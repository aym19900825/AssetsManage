<<script>
export default {
	function  tableHeader(){
		var workAsset = [
			'序号',
			'任务编号',
			'描述',
			'工种',
			'技能级别',
			'人工',
			'小时数',
			'状态',
		];
		var data1 = [
			'记录单号',
			'任务编号',
			'创建日期',
			'日志类型',
			'摘要',
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