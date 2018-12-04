 <template>
	<div>
		<div class="mask" v-show="show"></div>
		<div class="mask_div" v-show="show">
			<!---->
			<div class="mask_title_div clearfix">
				<div class="mask_title">添加用户</div>
				<div class="mask_anniu">
					<!--<span class="mask_span">
						<i class="icon-minimize"></i>
					</span>-->
					<!--icon-maximization,icon-restore-->
					<span class="mask_span mask_max" @click='toggle'>
						 
						<i v-bind:class="{ 'icon-maximization': isok1, 'icon-restore':isok2}"></i>
					</span>
					<span class="mask_span" @click='close'>
						<i class="icon-close1"></i>
					</span>
				</div>
			</div>
			<div class="mask_content">
				<el-form status-icon :model="user" :label-position="labelPosition" :rules="rules" ref="user" label-width="100px" class="demo-user">
					<div class="accordion">
						<el-collapse v-model="activeNames" @change="handleChange">
						<el-collapse-item title="样品信息" name="1">
								<el-row :gutter="20" class="pb10">
									<el-col :span="3" class="pull-right">
										<el-input :disabled="true">
											<template slot="prepend">样品编号</template>
										</el-input>
									</el-col>
                                    <el-col :span="3" class="pull-right">
										<el-input :disabled="true">
											<template slot="prepend">类别</template>
										</el-input>
									</el-col>
									<el-col :span="3" class="pull-right">
										<el-input :disabled="true">
											<template slot="prepend">样品编号</template>
										</el-input>
									</el-col>
								</el-row>

								<el-row :gutter="70">
										<el-col :span="8">
										<el-form-item label="委托书编号" prop="PROXYNUM">
											<el-input v-model="user.username" :disabled="edit"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="委托单位" prop="V_NAME">
											<el-input v-model="user.companyName">
												<el-button slot="append" icon="el-icon-search" @click="getCompany"></el-button>
											</el-input>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="生产单位" prop="P_NAME">
											<el-input v-model="user.companyName">
												<el-button slot="append" icon="el-icon-search" @click="getCompany"></el-button>
											</el-input>
										</el-form-item>
									</el-col>
								</el-row>
								<el-row :gutter="70">
									<el-col :span="8">
										<el-form-item label="样品名称" prop="username">
											<el-input v-model="user.username"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="样品数量" prop="password">
											<el-input type="password" v-model="user.password"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="规格型号" prop="password">
											<el-input type="password" v-model="user.password"></el-input>
										</el-form-item>
									</el-col>
								</el-row>
								<el-row :gutter="70">
									<el-col :span="8">
										<el-form-item label="收样人" prop="username">
											<el-input v-model="user.username"></el-input>
										</el-form-item>
									</el-col>
										<el-col :span="8">
										<el-form-item label="收样日期" prop="birthday">
											<el-date-picker v-model="user.birthday" type="date" placeholder="选择日期" value-format="yyyy-MM-dd">
											</el-date-picker>
										</el-form-item>
									</el-col>
								</el-row>
								<el-row :gutter="70">
									<el-col :span="8">
										<el-form-item label="接样人" prop="username">
											<el-input v-model="user.username"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="接样日期" prop="birthday">
											<el-date-picker v-model="user.birthday" type="date" placeholder="选择日期" value-format="yyyy-MM-dd">
											</el-date-picker>
										</el-form-item>
									</el-col>
								</el-row>
								<el-row :gutter="70">
									<el-col :span="24">
										<el-form-item label="备注" prop="tips">
											<el-input type="textarea" v-model="user.tips"></el-input>

										</el-form-item>
									</el-col>
								</el-row>
							</el-collapse-item>

							<el-collapse-item title="其他" name="2">
								<!-- 第一行 -->
								<el-row :gutter="70">
									<el-col :span="8">
										<el-form-item label="录入人" prop="nickname">
											<el-input v-model="user.nickname"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="录入日期" prop="birthday">
											<el-date-picker v-model="user.birthday" type="date" placeholder="选择日期" value-format="yyyy-MM-dd">
											</el-date-picker>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="修改人" prop="idnumber">
											<el-input v-model="user.idnumber"></el-input>
										</el-form-item>
									</el-col>
								</el-row>
								<el-row :gutter="70">

									<el-col :span="8">
										<el-form-item label="修改人" prop="idnumber">
											<el-input v-model="user.idnumber"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="修改日期" prop="entrytime">
											<el-date-picker v-model="user.entrytime" type="date" placeholder="选择日期" value-format="yyyy-MM-dd">
											</el-date-picker>
										</el-form-item>
									</el-col>
								</el-row>
							</el-collapse-item>
							<!-- 样品子表 Begin-->
							<el-collapse-item title="样品子表" name="3">								
								<div class="table-func">
									<el-button type="success" size="mini" round @click="addfield">
										<i class="icon-add"></i>
										<font>新建行</font>
									</el-button>
								</div>
								<el-table :data="ITEM.ITEM_LINE" row-key="ID" border stripe height="300" highlight-current-row="highlight-current-row" style="width: 100%;" @cell-click="iconOperation" :default-sort="{prop:'ITEM.ITEM_LINE', order: 'descending'}" v-loadmore="loadMore">

								    <el-table-column prop="iconOperation" fixed label="" width="50px">
								      <template slot-scope="scope"><i class="el-icon-check" v-if="scope.row.isEditing"></i><i class="el-icon-edit" v-else="v-else"></i></template>
								    </el-table-column>

								    <el-table-column label="样品序号" sortable width="120px" prop="ITEM_STEP">
								      <template slot-scope="scope">
								        <el-input v-if="scope.row.isEditing" size="small" v-model="scope.$index + 1" placeholder="请输入内容"></el-input><span v-else="v-else">{{scope.$index + 1}}</span>
								      </template>
								    </el-table-column>

									<el-table-column prop="ITEMNUM" label="样品编号" sortable width="120px" :formatter="judge">
								      <template slot-scope="scope">
								        <el-select v-if="scope.row.isEditing" v-model="scope.row.ITEMNUM" placeholder="请选择">
								          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.label"></el-option>
								        </el-select><span v-else="v-else">{{scope.row.ITEMNUM}}</span>
								      </template>
								    </el-table-column>

								    <el-table-column prop="SN" label="单件码" sortable width="120px">
								      <template slot-scope="scope">
								        <el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.SN" placeholder="请输入内容"></el-input><span v-else="v-else">{{scope.row.SN}}</span>
								      </template>
								    </el-table-column>

								    <el-table-column prop="STATE" label="样品信息状态" sortable width="120px">
								      <template slot-scope="scope">
								        <el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.STATE" placeholder="请输入内容"></el-input><span v-else="v-else">{{scope.row.STATE}}</span>
								      </template>
								    </el-table-column>

								    <el-table-column prop="ENTERBY" label="录入人" sortable width="120px">
								      <template slot-scope="scope">
								        <el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.ENTERBY" placeholder="请输入内容"></el-input><span v-else="v-else">{{scope.row.ENTERBY}}</span>
								      </template>
								    </el-table-column>

								    <el-table-column prop="REASION" label="项目提出理由" sortable width="120px">
								      <template slot-scope="scope">
								        <el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.REASION" placeholder="请输入内容"></el-input><span v-else="v-else">{{scope.row.REASION}}</span>
								      </template>
								    </el-table-column>

								    <el-table-column prop="ENTERDATE" label="录入时间" sortable width="240px">
								      <template slot-scope="scope">
								        <!-- <el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.ENTERDATE" placeholder="请输入内容"></el-input> -->
								        <el-date-picker  v-if="scope.row.isEditing" type="date" v-model="scope.row.ENTERDATE" size="small" placeholder="选择日期" value-format="yyyy-MM-dd">
											</el-date-picker>
								        <span v-else="v-else">{{scope.row.ENTERDATE}}</span>
								      </template>
								    </el-table-column>

								    <el-table-column prop="CHANGEBY" label="修改人" sortable width="150px">
								      <template slot-scope="scope">
								        <el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.CHANGEBY" placeholder="请输入内容"></el-input><span v-else="v-else">{{scope.row.CHANGEBY}}</span>
								      </template>
								    </el-table-column>

								    <el-table-column prop="CHANGEDATE" label="修改时间" sortable width="150px">
								      <template slot-scope="scope">
								        <el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.CHANGEDATE" placeholder="请输入内容"></el-input><span v-else="v-else">{{scope.row.CHANGEDATE}}</span>
								      </template>
								    </el-table-column>

								    <el-table-column prop="STATUS" label="信息状态" sortable width="150px">
								      <template slot-scope="scope">
								        <el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.STATUS" placeholder="请输入内容"></el-input><span v-else="v-else">{{scope.row.STATUS}}</span>
								      </template>
								    </el-table-column>

								    <el-table-column fixed="right" label="操作" width="120px">
								      <template slot-scope="scope">
								        <el-button @click.native.prevent="deleteRow(scope.$index, ITEM.ITEM_LINE)" type="text" size="small">
								          移除
								        </el-button>
								      </template>
								    </el-table-column>

								  </el-table>
							</el-collapse-item>
							<!-- 样品子表 End-->

							<!-- 领样信息表 Begin-->
							<el-collapse-item title="领样信息表" name="4">								
								<div class="table-func">
									<el-button type="success" size="mini" round @click="addfield02">
										<i class="icon-add"></i>
										<font>新建行</font>
									</el-button>
								</div>
								<el-table :data="ITEM.ITEM_GRANT" row-key="ID" border stripe height="300" highlight-current-row="highlight-current-row" style="width: 100%;" @cell-click="iconOperation" :default-sort="{prop:'ITEM.ITEM_GRANT', order: 'descending'}" v-loadmore="loadMore">

								 <el-table-column prop="iconOperation" fixed label="" width="50px">
								 <template slot-scope="scope"><i class="el-icon-check" v-if="scope.row.isEditing"></i><i class="el-icon-edit" v-else="v-else"></i></template>
								 </el-table-column>

								    <el-table-column label="样品序号" sortable width="120px" prop="ITEMNUM">
								      <template slot-scope="scope">
								        <el-input v-if="scope.row.isEditing" size="small" v-model="scope.$index + 1" placeholder="请输入内容"></el-input><span v-else="v-else">{{scope.$index + 1}}</span>
								      </template>
								    </el-table-column>

									<el-table-column prop="TYPE" label="样品类别" sortable width="120px" :formatter="judge">
								      <template slot-scope="scope">
								        <el-select v-if="scope.row.isEditing" v-model="scope.row.TYPE" placeholder="请选择">
								          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.label"></el-option>
								        </el-select><span v-else="v-else">{{scope.row.TYPE}}</span>
								      </template>
								    </el-table-column>

								    <el-table-column prop="DESCRIPTION" label="样品名称" sortable width="120px">
								      <template slot-scope="scope">
								        <el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.DESCRIPTION" placeholder="请输入内容"></el-input><span v-else="v-else">{{scope.row.DESCRIPTION}}</span>
								      </template>
								    </el-table-column>

								    <el-table-column prop="MODEL" label="样品型号" sortable width="120px">
								      <template slot-scope="scope">
								        <el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.MODEL" placeholder="请输入内容"></el-input><span v-else="v-else">{{scope.row.MODEL}}</span>
								      </template>
								    </el-table-column>

								    <el-table-column prop="QUALITY" label="数量" sortable width="120px">
								      <template slot-scope="scope">
								        <el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.QUALITY" placeholder="请输入内容"></el-input><span v-else="v-else">{{scope.row.QUALITY}}</span>
								      </template>
								    </el-table-column>

								    <el-table-column prop="ACCEPT_PERSON" label="收样人" sortable width="120px">
								      <template slot-scope="scope">
								        <el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.ACCEPT_PERSON" placeholder="请输入内容"></el-input><span v-else="v-else">{{scope.row.ACCEPT_PERSON}}</span>
								      </template>
								    </el-table-column>

								    <el-table-column prop="ACCEPT_DATE" label="收样日期" sortable width="240px">
								      <template slot-scope="scope">
								        <!-- <el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.ENTERDATE" placeholder="请输入内容"></el-input> -->
								        <el-date-picker  v-if="scope.row.isEditing" type="date" v-model="scope.row.ACCEPT_DATE" size="small" placeholder="选择日期" value-format="yyyy-MM-dd">
											</el-date-picker>
								        <span v-else="v-else">{{scope.row.ACCEPT_DATE}}</span>
								      </template>
								    </el-table-column>

								    <el-table-column prop="GRANT_PERSON" label="领样人" sortable width="150px">
								      <template slot-scope="scope">
								        <el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.GRANT_PERSON" placeholder="请输入内容"></el-input><span v-else="v-else">{{scope.row.GRANT_PERSON}}</span>
								      </template>
								    </el-table-column>
								    <el-table-column prop="GRANT_DATE" label="领样日期" sortable width="240px">
								      <template slot-scope="scope">
								        <el-date-picker  v-if="scope.row.isEditing" type="date" v-model="scope.row.GRANT_DATE" size="small" placeholder="选择日期" value-format="yyyy-MM-dd">
											</el-date-picker>
								        <span v-else="v-else">{{scope.row.GRANT_DATE}}</span>
								      </template>
								    </el-table-column>
								    <el-table-column prop="OTHER" label="其他资料" sortable width="150px">
								      <template slot-scope="scope">
								        <el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.OTHER" placeholder="请输入内容"></el-input><span v-else="v-else">{{scope.row.OTHER}}</span>
								      </template>
								    </el-table-column>
								    <el-table-column prop="MEMO" label="备注" sortable width="150px">
								      <template slot-scope="scope">
								        <el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.MEMO" placeholder="请输入内容"></el-input><span v-else="v-else">{{scope.row.MEMO}}</span>
								      </template>
								    </el-table-column>
								    <el-table-column prop="STATE" label="信息状态" sortable width="150px">
								      <template slot-scope="scope">
								        <el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.STATE" placeholder="请输入内容"></el-input><span v-else="v-else">{{scope.row.STATE}}</span>
								      </template>
								    </el-table-column>
								    <el-table-column prop="STATUSDATE" label="信息状态日期" sortable width="240px">
								      <template slot-scope="scope">
								        <el-date-picker  v-if="scope.row.isEditing" type="date" v-model="scope.row.STATUSDATE" size="small" placeholder="选择日期" value-format="yyyy-MM-dd">
											</el-date-picker>
								        <span v-else="v-else">{{scope.row.STATUSDATE}}</span>
								      </template>
								    </el-table-column>
								    <el-table-column prop="ENTERBY" label="录入人" sortable width="150px">
								      <template slot-scope="scope">
								     <el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.ENTERBY" placeholder="请输入内容"></el-input><span v-else="v-else">{{scope.row.ENTERBY}}</span>
								     </template>
								    </el-table-column>
								     <el-table-column prop="ENTERDATE" label="录入时间" sortable width="240px">
								      <template slot-scope="scope">
								        <el-date-picker  v-if="scope.row.isEditing" type="date" v-model="scope.row.ENTERDATE" size="small" placeholder="选择日期" value-format="yyyy-MM-dd">
											</el-date-picker>
								        <span v-else="v-else">{{scope.row.ENTERDATE}}</span>
								      </template>
								    </el-table-column>
								    <el-table-column prop="CHANGEBY" label="修改人" sortable width="150px">
								      <template slot-scope="scope">
								     <el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.CHANGEBY" placeholder="请输入内容"></el-input><span v-else="v-else">{{scope.row.CHANGEBY}}</span>
								     </template>
								    </el-table-column>
								    <el-table-column prop="CHANGEDATE" label="修改时间" sortable width="240px">
								      <template slot-scope="scope">
								        <el-date-picker  v-if="scope.row.isEditing" type="date" v-model="scope.row.CHANGEDATE" size="small" placeholder="选择日期" value-format="yyyy-MM-dd">
											</el-date-picker>
								        <span v-else="v-else">{{scope.row.CHANGEDATE}}</span>
								      </template>
								    </el-table-column>
								    <el-table-column prop="STATUS" label="信息状态" sortable width="150px">
								      <template slot-scope="scope">
								     <el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.STATUS" placeholder="请输入内容"></el-input><span v-else="v-else">{{scope.row.STATUS}}</span>
								     </template>
								    </el-table-column>
								     <el-table-column prop="SYNCHRONIZATION_TIME" label="同步时间" sortable width="240px">
								      <template slot-scope="scope">
								        <el-date-picker  v-if="scope.row.isEditing" type="date" v-model="scope.row.SYNCHRONIZATION_TIME" size="small" placeholder="选择日期" value-format="yyyy-MM-dd">
											</el-date-picker>
								        <span v-else="v-else">{{scope.row.SYNCHRONIZATION_TIME}}</span>
								      </template>
								    </el-table-column>
								    <el-table-column fixed="right" label="操作" width="120px">
								      <template slot-scope="scope">
								        <el-button @click.native.prevent="deleteRow(scope.$index, ITEM.ITEM_GRANT)" type="text" size="small">
								          移除
								        </el-button>
								      </template>
								    </el-table-column>

								  </el-table>
							</el-collapse-item>
							<!-- 领样信息表 End-->

							<!-- 样品返样信息表 Begin-->
							<el-collapse-item title="样品返样信息表" name="5">						
								<div class="table-func">
									<el-button type="success" size="mini" round @click="addfield03">
										<i class="icon-add"></i>
										<font>新建行</font>
									</el-button>
								</div>
								<el-table :data="ITEM.ITEM_RETURN" row-key="ID" border stripe height="300" highlight-current-row="highlight-current-row" style="width: 100%;" @cell-click="iconOperation" :default-sort="{prop:'ITEM.ITEM_RETURN', order: 'descending'}" v-loadmore="loadMore">
								 <el-table-column prop="iconOperation" fixed label="" width="50px">
								 <template slot-scope="scope"><i class="el-icon-check" v-if="scope.row.isEditing"></i><i class="el-icon-edit" v-else="v-else"></i></template>
								 </el-table-column>
								    <el-table-column label="样品序号" sortable width="120px" prop="ITEMNUM">
								      <template slot-scope="scope">
								        <el-input v-if="scope.row.isEditing" size="small" v-model="scope.$index + 1" placeholder="请输入内容"></el-input><span v-else="v-else">{{scope.$index + 1}}</span>
								      </template>
								    </el-table-column>
									<el-table-column prop="QUALITY" label="数量" sortable width="120px" :formatter="judge">
								      <template slot-scope="scope">
								        <el-select v-if="scope.row.isEditing" v-model="scope.row.QUALITY" placeholder="请选择">
								          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.label"></el-option>
								        </el-select><span v-else="v-else">{{scope.row.QUALITY}}</span>
								      </template>
								    </el-table-column>
								    <el-table-column prop="ACCEPT_DATE" label="收回入库时间" sortable width="240px">
								      <template slot-scope="scope">
								        <el-date-picker  v-if="scope.row.isEditing" type="date" v-model="scope.row.ACCEPT_DATE" size="small" placeholder="选择日期" value-format="yyyy-MM-dd">
											</el-date-picker>
								        <span v-else="v-else">{{scope.row.ACCEPT_DATE}}</span>
								      </template>
								    </el-table-column>

								    <el-table-column prop="GRANT_PERSON" label="领样人" sortable width="150px">
								      <template slot-scope="scope">
								        <el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.GRANT_PERSON" placeholder="请输入内容"></el-input><span v-else="v-else">{{scope.row.GRANT_PERSON}}</span>
								      </template>
								    </el-table-column>
								    <el-table-column prop="GRANT_DATE" label="领样日期" sortable width="240px">
								      <template slot-scope="scope">
								        <el-date-picker  v-if="scope.row.isEditing" type="date" v-model="scope.row.GRANT_DATE" size="small" placeholder="选择日期" value-format="yyyy-MM-dd">
											</el-date-picker>
								        <span v-else="v-else">{{scope.row.GRANT_DATE}}</span>
								      </template>
								    </el-table-column>
								    <el-table-column prop="ACCEPT_PERSON" label="样品承接人" sortable width="150px">
								      <template slot-scope="scope">
								        <el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.ACCEPT_PERSON" placeholder="请输入内容"></el-input><span v-else="v-else">{{scope.row.ACCEPT_PERSON}}</span>
								      </template>
								    </el-table-column>
								    <el-table-column prop="APPR_PERSON" label="处理批准人" sortable width="150px">
								      <template slot-scope="scope">
								        <el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.APPR_PERSON" placeholder="请输入内容"></el-input><span v-else="v-else">{{scope.row.APPR_PERSON}}</span>
								      </template>
								    </el-table-column>
								    <el-table-column prop="APPR_DATE" label="批准日期" sortable width="240px">
								      <template slot-scope="scope">
								        <el-date-picker  v-if="scope.row.isEditing" type="date" v-model="scope.row.APPR_DATE" size="small" placeholder="选择日期" value-format="yyyy-MM-dd">
											</el-date-picker>
								        <span v-else="v-else">{{scope.row.APPR_DATE}}</span>
								      </template>
								    </el-table-column>
								    <el-table-column prop="DO_PERSON" label="处理人" sortable width="150px">
								      <template slot-scope="scope">
								     <el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.DO_PERSON" placeholder="请输入内容"></el-input><span v-else="v-else">{{scope.row.DO_PERSON}}</span>
								     </template>
								    </el-table-column>
								     <el-table-column prop="DO_DATE" label="处理日期" sortable width="240px">
								      <template slot-scope="scope">
								        <el-date-picker  v-if="scope.row.isEditing" type="date" v-model="scope.row.DO_DATE" size="small" placeholder="选择日期" value-format="yyyy-MM-dd">
											</el-date-picker>
								        <span v-else="v-else">{{scope.row.DO_DATE}}</span>
								      </template>
								    </el-table-column>
								    <el-table-column prop="MEMO" label="备注" sortable width="150px">
								      <template slot-scope="scope">
								        <el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.MEMO" placeholder="请输入内容"></el-input><span v-else="v-else">{{scope.row.MEMO}}</span>
								      </template>
								    </el-table-column>
								    <el-table-column prop="STATE" label="信息状态" sortable width="150px">
								      <template slot-scope="scope">
								        <el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.STATE" placeholder="请输入内容"></el-input><span v-else="v-else">{{scope.row.STATE}}</span>
								      </template>
								    </el-table-column>
								    <el-table-column prop="ENTERBY" label="录入人" sortable width="150px">
								      <template slot-scope="scope">
								     <el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.ENTERBY" placeholder="请输入内容"></el-input><span v-else="v-else">{{scope.row.ENTERBY}}</span>
								     </template>
								    </el-table-column>
								    <el-table-column prop="ENTERDATE" label="录入时间" sortable width="240px">
								      <template slot-scope="scope">
								        <el-date-picker  v-if="scope.row.isEditing" type="date" v-model="scope.row.ENTERDATE" size="small" placeholder="选择日期" value-format="yyyy-MM-dd">
											</el-date-picker>
								        <span v-else="v-else">{{scope.row.ENTERDATE}}</span>
								      </template>
								    </el-table-column>
								    <el-table-column prop="CHANGEBY" label="修改人" sortable width="150px">
								      <template slot-scope="scope">
								     <el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.CHANGEBY" placeholder="请输入内容"></el-input><span v-else="v-else">{{scope.row.CHANGEBY}}</span>
								     </template>
								    </el-table-column>
								    <el-table-column prop="CHANGEDATE" label="修改时间" sortable width="240px">
								      <template slot-scope="scope">
								        <el-date-picker  v-if="scope.row.isEditing" type="date" v-model="scope.row.CHANGEDATE" size="small" placeholder="选择日期" value-format="yyyy-MM-dd">
											</el-date-picker>
								        <span v-else="v-else">{{scope.row.CHANGEDATE}}</span>
								      </template>
								    </el-table-column>
								    <el-table-column prop="STATUS" label="信息状态" sortable width="150px">
								      <template slot-scope="scope">
								     <el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.STATUS" placeholder="请输入内容"></el-input><span v-else="v-else">{{scope.row.STATUS}}</span>
								     </template>
								    </el-table-column>
								     <el-table-column prop="SYNCHRONIZATION_TIME" label="同步时间" sortable width="240px">
								      <template slot-scope="scope">
								        <el-date-picker  v-if="scope.row.isEditing" type="date" v-model="scope.row.SYNCHRONIZATION_TIME" size="small" placeholder="选择日期" value-format="yyyy-MM-dd">
											</el-date-picker>
								        <span v-else="v-else">{{scope.row.SYNCHRONIZATION_TIME}}</span>
								      </template>
								    </el-table-column>
								    <el-table-column fixed="right" label="操作" width="120px">
								      <template slot-scope="scope">
								        <el-button @click.native.prevent="deleteRow(scope.$index, ITEM.ITEM_RETURN)" type="text" size="small">
								          移除
								        </el-button>
								      </template>
								    </el-table-column>

								  </el-table>
							</el-collapse-item>
							<!-- 样品返样信息表 End -->

							<!-- 样品返处置息表 Begin -->
								<el-collapse-item title="样品处置信息表" name="6">						
								<div class="table-func">
									<el-button type="success" size="mini" round @click="addfield04">
										<i class="icon-add"></i>
										<font>新建行</font>
									</el-button>
								</div>
								<el-table :data="ITEM.ITEM_DISPOSITION" row-key="ID" border stripe height="300" highlight-current-row="highlight-current-row" style="width: 100%;" @cell-click="iconOperation" :default-sort="{prop:'ITEM.ITEM_DISPOSITION', order: 'descending'}" v-loadmore="loadMore">
								 <el-table-column prop="iconOperation" fixed label="" width="50px">
								 <template slot-scope="scope"><i class="el-icon-check" v-if="scope.row.isEditing"></i><i class="el-icon-edit" v-else="v-else"></i></template>
								 </el-table-column>
								    <el-table-column label="样品序号" sortable width="120px" prop="ITEMNUM">
								      <template slot-scope="scope">
								        <el-input v-if="scope.row.isEditing" size="small" v-model="scope.$index + 1" placeholder="请输入内容"></el-input><span v-else="v-else">{{scope.$index + 1}}</span>
								      </template>
								    </el-table-column>
									<el-table-column prop="QUALITY" label="数量" sortable width="120px" :formatter="judge">
								      <template slot-scope="scope">
								        <el-select v-if="scope.row.isEditing" v-model="scope.row.QUALITY" placeholder="请选择">
								          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.label"></el-option>
								        </el-select><span v-else="v-else">{{scope.row.QUALITY}}</span>
								      </template>
								    </el-table-column>
								    <el-table-column prop="ACCEPT_DATE" label="收回入库时间" sortable width="240px">
								      <template slot-scope="scope">
								        <el-date-picker  v-if="scope.row.isEditing" type="date" v-model="scope.row.ACCEPT_DATE" size="small" placeholder="选择日期" value-format="yyyy-MM-dd">
											</el-date-picker>
								        <span v-else="v-else">{{scope.row.ACCEPT_DATE}}</span>
								      </template>
								    </el-table-column>

								    <el-table-column prop="GRANT_PERSON" label="领样人" sortable width="150px">
								      <template slot-scope="scope">
								        <el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.GRANT_PERSON" placeholder="请输入内容"></el-input><span v-else="v-else">{{scope.row.GRANT_PERSON}}</span>
								      </template>
								    </el-table-column>
								    <el-table-column prop="GRANT_DATE" label="领样日期" sortable width="240px">
								      <template slot-scope="scope">
								        <el-date-picker  v-if="scope.row.isEditing" type="date" v-model="scope.row.GRANT_DATE" size="small" placeholder="选择日期" value-format="yyyy-MM-dd">
											</el-date-picker>
								        <span v-else="v-else">{{scope.row.GRANT_DATE}}</span>
								      </template>
								    </el-table-column>
								    <el-table-column prop="ACCEPT_PERSON" label="样品承接人" sortable width="150px">
								      <template slot-scope="scope">
								        <el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.ACCEPT_PERSON" placeholder="请输入内容"></el-input><span v-else="v-else">{{scope.row.ACCEPT_PERSON}}</span>
								      </template>
								    </el-table-column>
								    <el-table-column prop="APPR_PERSON" label="处理批准人" sortable width="150px">
								      <template slot-scope="scope">
								        <el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.APPR_PERSON" placeholder="请输入内容"></el-input><span v-else="v-else">{{scope.row.APPR_PERSON}}</span>
								      </template>
								    </el-table-column>
								    <el-table-column prop="APPR_DATE" label="批准日期" sortable width="240px">
								      <template slot-scope="scope">
								        <el-date-picker  v-if="scope.row.isEditing" type="date" v-model="scope.row.APPR_DATE" size="small" placeholder="选择日期" value-format="yyyy-MM-dd">
											</el-date-picker>
								        <span v-else="v-else">{{scope.row.APPR_DATE}}</span>
								      </template>
								    </el-table-column>
								    <el-table-column prop="DO_PERSON" label="处理人" sortable width="150px">
								      <template slot-scope="scope">
								     <el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.DO_PERSON" placeholder="请输入内容"></el-input><span v-else="v-else">{{scope.row.DO_PERSON}}</span>
								     </template>
								    </el-table-column>
								     <el-table-column prop="DO_DATE" label="处理日期" sortable width="240px">
								      <template slot-scope="scope">
								        <el-date-picker  v-if="scope.row.isEditing" type="date" v-model="scope.row.DO_DATE" size="small" placeholder="选择日期" value-format="yyyy-MM-dd">
											</el-date-picker>
								        <span v-else="v-else">{{scope.row.DO_DATE}}</span>
								      </template>
								    </el-table-column>
								    <el-table-column prop="MEMO" label="备注" sortable width="150px">
								      <template slot-scope="scope">
								        <el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.MEMO" placeholder="请输入内容"></el-input><span v-else="v-else">{{scope.row.MEMO}}</span>
								      </template>
								    </el-table-column>
								    <el-table-column prop="STATE" label="信息状态" sortable width="150px">
								      <template slot-scope="scope">
								        <el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.STATE" placeholder="请输入内容"></el-input><span v-else="v-else">{{scope.row.STATE}}</span>
								      </template>
								    </el-table-column>
								    <el-table-column prop="STATUSDATE" label="信息状态日期" sortable width="240px">
								      <template slot-scope="scope">
								        <el-date-picker  v-if="scope.row.isEditing" type="date" v-model="scope.row.STATUSDATE" size="small" placeholder="选择日期" value-format="yyyy-MM-dd">
											</el-date-picker>
								        <span v-else="v-else">{{scope.row.STATUSDATE}}</span>
								      </template>
								    </el-table-column>
								    <el-table-column prop="ENTERBY" label="录入人" sortable width="150px">
								      <template slot-scope="scope">
								     <el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.ENTERBY" placeholder="请输入内容"></el-input><span v-else="v-else">{{scope.row.ENTERBY}}</span>
								     </template>
								    </el-table-column>
								    <el-table-column prop="ENTERDATE" label="录入时间" sortable width="240px">
								      <template slot-scope="scope">
								        <el-date-picker  v-if="scope.row.isEditing" type="date" v-model="scope.row.ENTERDATE" size="small" placeholder="选择日期" value-format="yyyy-MM-dd">
											</el-date-picker>
								        <span v-else="v-else">{{scope.row.ENTERDATE}}</span>
								      </template>
								    </el-table-column>
								    <el-table-column prop="CHANGEBY" label="修改人" sortable width="150px">
								      <template slot-scope="scope">
								     <el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.CHANGEBY" placeholder="请输入内容"></el-input><span v-else="v-else">{{scope.row.CHANGEBY}}</span>
								     </template>
								    </el-table-column>
								    <el-table-column prop="CHANGEDATE" label="修改时间" sortable width="240px">
								      <template slot-scope="scope">
								        <el-date-picker  v-if="scope.row.isEditing" type="date" v-model="scope.row.CHANGEDATE" size="small" placeholder="选择日期" value-format="yyyy-MM-dd">
											</el-date-picker>
								        <span v-else="v-else">{{scope.row.CHANGEDATE}}</span>
								      </template>
								    </el-table-column>
								    <el-table-column prop="STATUS" label="信息状态" sortable width="150px">
								      <template slot-scope="scope">
								     <el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.STATUS" placeholder="请输入内容"></el-input><span v-else="v-else">{{scope.row.STATUS}}</span>
								     </template>
								    </el-table-column>
								     <el-table-column prop="SYNCHRONIZATION_TIME" label="同步时间" sortable width="240px">
								      <template slot-scope="scope">
								        <el-date-picker  v-if="scope.row.isEditing" type="date" v-model="scope.row.SYNCHRONIZATION_TIME" size="small" placeholder="选择日期" value-format="yyyy-MM-dd">
											</el-date-picker>
								        <span v-else="v-else">{{scope.row.SYNCHRONIZATION_TIME}}</span>
								      </template>
								    </el-table-column>
								    <el-table-column fixed="right" label="操作" width="120px">
								      <template slot-scope="scope">
								        <el-button @click.native.prevent="deleteRow(scope.$index, ITEM.ITEM_DISPOSITION)" type="text" size="small">
								          移除
								        </el-button>
								      </template>
								    </el-table-column>

								  </el-table>
							</el-collapse-item>
						</el-collapse>
					</div>

					<div class="el-dialog__footer">
						<el-button @click='close'>取消</el-button>
						<el-button type="primary" @click='submitForm()'>提交</el-button>
					</div>
				</el-form>
			</div>
			<!--底部-->
		</div>

		<!--弹出-->
		<el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">

			<el-tree ref="tree" :data="resourceData" show-checkbox node-key="id" :default-checked-keys="resourceCheckedKey" :props="resourceProps" @node-click="handleNodeClick"  @check-change="handleCheckChange">
			</el-tree>

			<span slot="footer" class="dialog-footer">
		       <el-button @click="dialogVisible = false">取 消</el-button>
		       <el-button type="primary" @click="dailogconfirm();" >确 定</el-button>
		    </span>
		</el-dialog>

	</div>
</template>

<script>
	export default {
		name: 'masks',
		props: {
			user: {
				type: Object,
				default: function(){
					return {
						companyId: '',
						deptId: '',
						password: '',
						sex: '',
						email: '',
						phone: '',
						enabled: 1,
						birthday: '',
						worknumber: '',
						nickname: '',
						idnumber: '',
						entrytime: '',
						address: '',
						tips: '',
						username: '',
						companyName:'',
						roleId: [],
						roles: [],//角色
						id: '',
					}
				}
			},
			page: Object ,
		},
//		props: ['user','page'],
		
		data() {
			var validatePass1 = (rule, value, callback) => {
				if(value === '') {
					callback(new Error('必填'));
				} else {
					callback();
				}
			};
			var validatePass2 = (rule, value, callback) => {
				if(value === '') {
					callback(new Error('必填'));
				} else {
					callback();
				}
			};
			var validatePass3 = (rule, value, callback) => {
				console.log(value)
				if(value === '') {
					callback(new Error('必填'));
				} else {
					callback();
				}
			};
			var validatePass4 = (rule, value, callback) => {
				if(value === '') {
					callback(new Error('必填'));
				} else {
					callback();
				}
			};
			var validatePass5 = (rule, value, callback) => {
				if(value === '') {
					callback(new Error('必填'));
				} else {
					callback();
				}
			};
//			var validatePass6 = (rule, value, callback) => {
//              var regidnumber = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/; 
//              if (!regidnumber.test(this.user.idnumber)) {
//                 callback(new Error('身份证号填写有误'));
//              } else {
//                  callback();
//              }
//          };
            var validatePass6 = (rule, value, callback) => {//验证身份证号
				if (value && (!(/\d{17}[\d|x]|\d{15}/).test(value) || (value.length !== 15 && value.length !== 18))) {
  				    callback(new Error('身份证号码不符合规范'))
  				} else {
  				    callback()
  				}
		    };
            var validatePass7 = (rule, value, callback) => {
               if (value === '') {
		          return callback(new Error('手机号不能为空'));
		        } else {
		          		if (value !== '') {
		            		var reg=/^1[3456789]\d{9}$/;
				            if(!reg.test(value)){
				            	callback(new Error('请输入有效的手机号码'));
				            }
		            		callback();
		        		}
		        	}
            };
            var validatePass8 = (rule, value, callback) => {
                if (value && (!(/^[0-9]{6}$/).test(value))) {
  				    callback(new Error('邮政编码不符合规范'))
  				} else {
  				    callback()
  				}
            };
			return {
				ITEM:{
					ID:'',
					PROXYNUM:'',
					ITEMNUM:'',
					VENDOR:'',
					PRODUCT_COMPANY:'',
					V_NAME:'',
					P_NAME:'',
					DESCRIPTION:'',
					PRODUCT_CODE:'',
					MODEL:'',
					QUATITY:'',
					OTHER:'',
					MEMO:'',
					ACCEPTDATE:'',
					ACCEPT_PERSON:'',
					ACCEPT_DATE:'',
					RECIP_PERSON:'',
					RECIP_DATE:'',
					STATE:'',
					STATUSDATE:'',
					ENTERBY:'',
					ENTERDATE:'',
					CHANGEBY:'',
					CHANGEDATE:'',
					TYPE:'',
					STATUS:'',
					ITEM_LINE:[{
						ID:'',
						ITEMNUM:'',
						ITEM_STEP:'',
						SN:'',
						STATE:'',
						ENTERBY:'',
						ENTERDATE:'',
						CHANGEBY:'',
						CHANGEDATE:'',
						STATUS:'',
					}],
					ITEM_GRANT:[{
						ID:'',
						ITEMNUM:'',
						TYPE:'',
						DESCRIPTION:'',
						MODEL:'',
						QUALITY:'',
						ACCEPT_PERSON:'',
						ACCEPT_DATE:'',
						GRANT_PERSON:'',
						GRANT_DATE:'',
						OTHER:'',
						MEMO:'',
						STATE:'',
						STATUSDATE:'',
						ENTERBY:'',
						ENTERDATE:'',
						CHANGEBY:'',
						CHANGEDATE:'',
						STATUS:'',
						SYNCHRONIZATION_TIME:'',
					}],
					ITEM_RETURN:[{
						ID:'',
						ITEMNUM:'',
						QUALITY:'',
						ACCEPT_DATE:'',
						ACCEPT_PERSON:'',
						APPR_PERSON:'',
						APPR_DATE:'',
						DO_PERSON:'',
						DO_DATE:'',
						MEMO:'',
						STATE:'',
						ENTERBY:'',
						ENTERDATE:'',
						CHANGEBY:'',
						CHANGEDATE:'',
						STATUS:'',
						SYNCHRONIZATION_TIME:'',
					}],
					ITEM_DISPOSITION:[{
						ID:'',
						ITEMNUM:'',
						QUALITY:'',
						ACCEPT_DATE:'',
						ACCEPT_PERSON:'',
						APPR_PERSON:'',
						APPR_DATE:'',
						DO_PERSON:'',
						DO_DATE:'',
						MEMO:'',
						STATE:'',
						STATUSDATE:'',
						ENTERBY:'',
						ENTERDATE:'',
						CHANGEBY:'',
						CHANGEDATE:'',
						STATUS:'',
						SYNCHRONIZATION_TIME:'',
					}],

				},
				editSearch: '',
				edit: true, //禁填
				show: false,
				isok1: true,
				isok2: false,
				down: true,
				up: false,
				useritem: [],
				activeNames: ['1', '2', '3', '4', '5'], //手风琴数量
				labelPosition: 'top', //表格
				dialogVisible: false, //对话框

				rules: {
					companyName: [{
						required: true,//必填标题加红*
						//trigger: 'change',
						validator: validatePass1,
					}],
					deptName: [{
						required: true,//必填标题加红*
						//trigger: 'change',
						validator: validatePass2,
					}],
					roleId: [{
						required: true,
						trigger: 'blur',//触发事件，blur是鼠标移除是触发，change是值变动时触发。
						validator: validatePass3,
					}],
					username: [{
						required: true,
						trigger: 'blur',//触发事件，blur是鼠标移除是触发，change是值变动时触发。
						validator: validatePass4,
					}],
					password: [{
						required: true,
						trigger: 'blur',
						validator: validatePass5,
					}],
					idnumber: [{
//						required: true,
						trigger: 'blur',
						validator: validatePass6,
					}],
					phone: [{
						required: true,
						trigger: 'blur',
						validator: validatePass7,
					}],
					email: [{
//						required: true,
						trigger: 'blur',
						validator: validatePass8,
					}]
				},
				//tree
				resourceData: [], //数组，我这里是通过接口获取数据，
				resourceDialogisShow: false,
				resourceCheckedKey: [], //通过接口获取的需要默认展示的数组 [1,3,15,18,...]
				resourceProps: {
					children: "subDepts",
					label: "simplename"
				},
				selectData: [],//
				getCheckboxData:{},
//				aaaData:[]
			};
		},
		methods: {
			//表格对当前行进行操作
			iconOperation(row, column, cell, event){
		        if(column.property ==="iconOperation"){
		        	console.log(row.isEditing);
		            row.isEditing = !row.isEditing;
		            console.log(row.isEditing);
		        }
		    },
		    deleteRow(index, rows) {//Table-操作列中的删除行
				rows.splice(index, 1);
			},
			//样品子表新建行
			addfield(){
				var obj = {
                    ITEMNUM:'',
					ITEM_STEP:'',
					SN:'',
					STATE:'',
					ENTERBY:'',
					ENTERDATE:'',
					CHANGEBY:'',
					CHANGEDATE:'',
					STATUS:'',
					isEditing:true
                };
                this.ITEM.ITEM_LINE.unshift(obj);
			},
			addfield02(){
				var obj = {
                    ID:'',
						ITEMNUM:'',
						TYPE:'',
						DESCRIPTION:'',
						MODEL:'',
						QUALITY:'',
						ACCEPT_PERSON:'',
						ACCEPT_DATE:'',
						GRANT_PERSON:'',
						GRANT_DATE:'',
						OTHER:'',
						MEMO:'',
						STATE:'',
						STATUSDATE:'',
						ENTERBY:'',
						ENTERDATE:'',
						CHANGEBY:'',
						CHANGEDATE:'',
						STATUS:'',
						SYNCHRONIZATION_TIME:'',
					    isEditing:true
                };
                this.ITEM.ITEM_GRANT.unshift(obj);
			},
			addfield03(){
				var obj = {
                        ID:'',
						ITEMNUM:'',
						QUALITY:'',
						ACCEPT_DATE:'',
						ACCEPT_PERSON:'',
						APPR_PERSON:'',
						APPR_DATE:'',
						DO_PERSON:'',
						DO_DATE:'',
						MEMO:'',
						STATE:'',
						ENTERBY:'',
						ENTERDATE:'',
						CHANGEBY:'',
						CHANGEDATE:'',
						STATUS:'',
						SYNCHRONIZATION_TIME:'',
                };
                this.ITEM.ITEM_RETURN.unshift(obj);
			},
			addfield04(){
				var obj = {
                        ID:'',
						ITEMNUM:'',
						QUALITY:'',
						ACCEPT_DATE:'',
						ACCEPT_PERSON:'',
						APPR_PERSON:'',
						APPR_DATE:'',
						DO_PERSON:'',
						DO_DATE:'',
						MEMO:'',
						STATE:'',
						STATUSDATE:'',
						ENTERBY:'',
						ENTERDATE:'',
						CHANGEBY:'',
						CHANGEDATE:'',
						STATUS:'',
						SYNCHRONIZATION_TIME:'',
                };
                this.ITEM.ITEM_DISPOSITION.unshift(obj);
			},
			handleChange(val) { //手风琴开关效果调用
			},
			//
			handleCheckChange(data, checked, indeterminate) {
		        console.log(data, checked, indeterminate);
		        this.getCheckboxData=data;
		    },
		    //
		   	handleNodeClick(data) {//获取勾选树菜单节点
             	console.log(data);
            },
			//点击按钮显示弹窗
			visible() {
				this.ITEM.ITEM_LINE = [];//显示弹出框时样品字表数据
				this.show = true;
			},
			// 这里是修改
			detail() {
				this.show = true;
			},
			//点击关闭按钮
			close() {
				this.show = false;
			},
			toggle(e) {//大弹出框大小切换
				if(this.isok1 == true) {
					this.maxDialog();
				} else {
					this.rebackDialog();
				}
			},
			maxDialog(e) {//定义大弹出框一个默认大小
				this.isok1 = false;
				this.isok2 = true;
				$(".mask_div").width(document.body.clientWidth);
				$(".mask_div").height(document.body.clientHeight - 60);
				$(".mask_div").css("margin", "0%");
				$(".mask_div").css("top", "60px");
			},
			
			rebackDialog() {//大弹出框还原成默认大小
				this.isok1 = true;
				this.isok2 = false;
				$(".mask_div").css("width", "80%");
				$(".mask_div").css("height", "80%");
				$(".mask_div").css("margin", "7% 10%");
				$(".mask_div").css("top", "0");
			},
			getCheckedNodes() {//获取树菜单节点
				this.checkedNodes = this.$refs.tree.getCheckedNodes()
			},

			//保存users/saveOrUpdate
			submitForm() {
				var _this = this;
				this.$refs.user.validate((valid) => {
					if(valid) {
						var user = this.user;
						user.sex = user.sexName == '男' ? 1 : 0;
						if(user.roleId.length>0){
							var arr = [];
							user.roleId.forEach(function(item){
								var roles = _this.selectData;
								for(var j = 0; j < roles.length; j++){
									if(roles[j].id == item){
										arr.push(roles[j]);
									}
								}
							});
							user.roleId = user.roleId.join(',');
							user.roles = arr;
						}else{
							user.roleId = '';
							user.roles = [];
						}
						console.log(this.user);
						var url = '/api/api-user/users/saveOrUpdate';
						this.$axios.post(url, this.user).then((res) => {

							if(res.data.resp_code == 0) {
								this.$message({
									message: '保存成功',
									type: 'success',
								});
								this.show = false;
								//重新加载数据
								this.$emit('request')
							}
						}).catch((err) => {
							this.$message({
								message: '网络错误，请重试',
								type: 'error'
							});
						});
					} else {
						return false;
					}
				})
			},
			//所属组织
			getCompany() {
				this.editSearch = 'company';
				var page = this.page.currentPage;
				var limit = this.page.pageSize;
				var type = 1;
				var url = '/api/api-user/depts/treeByType';
				this.$axios.get(url, {
					params: {
						type: type
					},
				}).then((res) => {
					this.resourceData = res.data;
					this.dialogVisible = true;
				});

			},

			//所属机构
			getDept() {
				this.editSearch = 'dept';
				var page = this.page.currentPage;
				var limit = this.page.pageSize;
				var type = 2;
				var url = '/api/api-user/depts/treeByType';
				this.$axios.get(url, {
					params: {
						type: type
					},
				}).then((res) => {
					this.resourceData = res.data;
					this.dialogVisible = true;
				});
			},
			//角色
			getRole() {
				this.editSearch = 'role';
				var page = this.page.currentPage;
				var limit = this.page.pageSize;
				var url = '/api/api-user/roles';
				this.$axios.get(url, {
					params: {
						page: page,
						limit: limit,
					},
				}).then((res) => {
					this.selectData = res.data.data;
					console.log(res.data.data);
					console.log(this.selectData);
					}).catch(error =>{
				    console.log('请求失败');
				})
			},
			dailogconfirm() {//小弹出框确认按钮事件
				this.getCheckedNodes();
				this.placetext = false;
				this.dialogVisible = false;
				if(this.editSearch == 'company') {
					this.user.companyId = this.getCheckboxData.id;
					this.user.companyName = this.getCheckboxData.simplename;
				} else {
					this.user.deptId = this.getCheckboxData.id;
					this.user.deptName = this.getCheckboxData.simplename;
				}
			},

			handleClose(done) {
				this.$confirm('确认关闭？')
					.then(_ => {
						done();
					})
					.catch(_ => {});
			}

		},
		mounted() {
			this.getRole();
		},

	}
</script>

<style scoped>
	@import '../../assets/css/mask-modules.css';
</style>