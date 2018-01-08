<template>
	<section>
		<h1 class="center">Process Scheduling ---- By Czs</h1>
		<div class="wrap">
			<span class="item-wrap">
				<span>进程名：</span><Input class="w50 ib" v-model="processName" />
				<span class="ml10">优先权：</span><InputNumber class="w50 inline-block" v-model="priority" :min="0"/>
				<span class="ml10">所需时间：</span><InputNumber class="w50 inline-block" v-model="needTime" :min="1"/>
				<Button class="ml10" type="primary" @click="addProcess">添加</Button>
			</span>
			<div class="time-slice">
				<Select class="w200 ib algorithm-select" v-model="algorithm" size="large">
					<Option v-for="(item, index) in algorithmList" :key="index" :value="index">{{item}}</Option>
				</Select>
				<span class="ml10">时间片长度：</span>
				<InputNumber class="w50 inline-block" 
					v-model="timeSlice" 
					:min="1"
					:disabled="timeSliceDisable"/>
			</div>
			
			<div class="table-wrap">
				<table>
					<tr>
						<th>进程名</th>
						<th>优先级</th>
						<th>需要运行时间</th>
						<th>已运行时间</th>
						<th>已就绪时间</th>
						<th>状态</th>
						<th>队列</th>
					</tr>
					<tr v-for="(item, index) in pcbList.list" :key="index">
						<td>{{item.name}}</td>
						<td>{{item.priority}}</td>
						<td>{{item.needTime}}</td>
						<td>{{item.hasRunTime}}</td>
						<td>{{item.hasArriveTime + '('+ item.id +')'}}</td>
						<td>{{item.getStateToString()}}</td>
						<td>{{item.listLivel}}</td>
					</tr>
				</table>
			</div>
			<Button type="primary" @click="clearAllProcessState">清空所有进程</Button>
			<Button type="primary" @click="resetPcbList">重置进程状态</Button>
			<Button class="fr" type="primary" @click="nextTime">下一时间</Button>
		</div>
	</section>
</template>

<script>
import { Button, InputNumber, Select, Option, Slider, Input } from 'iview';
import PCB from './PCB'
import PCBList from './PCBList'

export default {
	data() {
		return {
			algorithmList: ['先来先服务', '简单轮询法', '可变时间片轮询法', '最高优先级调度', '多级反馈队列'],
			algorithm: 0,
			processName: 'd',
			needTime: 10,
			priority: 0,
			timeSlice: 1,
			timeSliceDisable: false,
			pcbList: [],  
		}
	},
	components: {
		Button,
		InputNumber,
		Input,
		Select,
		Option,
		Slider
	},
	methods: {
		addProcess() {
			if(this.processName.trim() === ''){
				alert("进程名不能为空!");
				return;
			};
			if(this.pcbList.length===0) {
				this.pcbList = new PCBList(0);
			}
			var pcb = new PCB(this.pcbList.length, this.processName, this.needTime, this.priority)
			this.pcbList.addPCB(pcb)
		},
		nextTime() {
			this.pcbList.nextTime(this.algorithm, this.timeSlice);
		},
		clearAllProcessState() {
			this.pcbList.clearState()
		},
		resetPcbList() {
			this.pcbList.resect();
		}
	},
	watch: {
		algorithm: function() {
			this.pcbList.resect();
			if(this.algorithm === 1 || this.algorithm === 4) {
				this.timeSlice = 1;
				this.timeSliceDisable = true;
			}else {
				this.timeSliceDisable = false;
			}
		}
	},
	mounted() {
		var pcb1 = new PCB(0, 'a', 13, 1)
		var pcb2 = new PCB(1, 'b', 24, 2)
		var pcb3 = new PCB(2, 'c', 35, 3)
		this.pcbList = new PCBList(0);
		this.pcbList.addPCB(pcb1)
		this.pcbList.addPCB(pcb2)
		this.pcbList.addPCB(pcb3)
	}
}
</script>

<style scoped>
	section {
		padding: 0.1px;
	}
	h1 {
		margin: 50px 0;
		font-style: oblique;
		font-size: 36px;
		color: white;
		text-shadow: 5px 2px 6px black;
	}
	.wrap {
		display: block;
		position: relative;
		width: 650px;
		padding: 20px;
		margin: auto;
		margin-top: 100px;
		font-size: 16px;
		box-shadow: 2px 2px 6px 1px #94a9af;
    	background-color: rgba(255, 255, 255, 0.85);
	}
	.item-wrap {
		display: inline-block;
		padding: 4px 6px;
		border: 1px solid rgb(170, 157, 157);
		border-radius: 5px;
	}
	.time-slice {
		margin-top: 10px;
	}
	.table-wrap {
		text-align: center;
		margin: 20px 0;
	}
	table {
		border: 1px solid;
	}
	th, td {
		padding: 5px 12px;
		text-align: center;
	}
	td {
		border-top: 1px solid;
	}
	.algorithm-select {
		height: 32px;
	}

	.center {
		text-align: center;
	}
	.ml10 {
		display: inline-block;
		margin-left: 10px;
	}
	.w50{
		width: 50px;
	} 
	.w200 {
		width: 200px;
	}
	.ib {
		display: inline-block;
	}
</style>
