 <template>
    <el-form inline-message :model="basisListForm" ref="basisListForm">
												<el-table :header-cell-style="rowClass" 
														:data="basisListForm.basisList" 
														border 
														stripe 
                                                        :fit="true" 
														max-length="260px" 
														style="width: 100%;" 
														:default-sort="{prop:'basisList', order: 'descending'}">

													<el-table-column label="序号" width="50" type="index"></el-table-column>

													<el-table-column prop="S_NUM" label="标准编号" sortable width="160">
														<template slot-scope="scope">
                                                            <el-form-item :prop="'basisList.'+scope.$index + '.S_NUM'" :rules="{required: true, message: '请输入', trigger: 'blur'}">
																<el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.S_NUM"></el-input>
																<span v-else>{{scope.row.S_NUM}}</span>
                                                            </el-form-item>
														</template>
													</el-table-column>

													<el-table-column prop="SS_NUM" label="标准编码" sortable width="160">
														<template slot-scope="scope">
                                                            <el-form-item :prop="'basisList.'+scope.$index + '.SS_NUM'" :rules="{required: true, message: '请输入', trigger: 'blur'}">
																<el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.SS_NUM"></el-input>
																<span v-else>{{scope.row.SS_NUM}}</span>
                                                            </el-form-item>
														</template>
													</el-table-column>

													<el-table-column prop="S_NAME" label="标准名称" sortable>
														<template slot-scope="scope">
															<el-form-item :prop="'basisList.'+scope.$index + '.S_NAME'" :rules="{required: true, message: '请输入', trigger: 'blur'}">
																<el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.S_NAME"></el-input>
																<span v-else>{{scope.row.S_NAME}}</span>
															</el-form-item>
														</template>
													</el-table-column>

													<!-- <el-table-column prop="VERSION" label="版本" sortable width="80">
														<template slot-scope="scope">
															<el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.VERSION"></el-input>
															<span v-else>{{scope.row.VERSION}}</span>
														</template>
													</el-table-column> -->
													<!-- <el-table-column prop="FILESIZE" label="文件大小" sortable width="120">
														<template slot-scope="scope">
															<el-input v-if="scope.row.isEditing" size="small" v-model="scope.row.FILESIZE"></el-input>
															<span v-else>{{scope.row.FILESIZE}}</span>
														</template>
													</el-table-column> -->
													<el-table-column fixed="right" label="操作" width="80">
														<template slot-scope="scope" v-if="!viewtitle">
															<el-button
																@click="delPlan(scope.$index,scope.row,'WORLPLANLINE_BASIS','basisList')"
																type="text"
																size="small">
																<i class="icon-trash red"></i>
															</el-button>
														</template>
													</el-table-column>
												</el-table>
											</el-form>
    
</template>
