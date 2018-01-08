var PCB = function(id, name, needTime, priority, hasRunTime, hasArriveTime, state, listLivel) {
    this.id = id;
	this.name = name;
	this.needTime = needTime;
	this.priority = priority ? priority : 0;
	this.hasRunTime = hasRunTime ? hasRunTime : 0;
	this.hasArriveTime = hasArriveTime ? hasArriveTime :0;
	this.state = state ? state : 0;  // 0:就绪, 1:运行, 2:完成
	this.listLivel = listLivel ? listLivel : 0;
}
PCB.prototype = {
    addRunTime: function(time) {
        time = time ? time : 1;
        var hasRunTime = this.hasRunTime + time;
        
        // 已执行的时间不能大过需执行的时间
        if(hasRunTime < this.needTime) {
            this.hasRunTime = hasRunTime;
        }else {
            this.hasRunTime = this.needTime;
        }
        return this.hasRunTime;
    },
    addArriveTime: function(time){
        time = time ? time : 1;
        this.hasArriveTime = this.hasArriveTime + time;
        return this.hasArriveTime;
    },
    getStateToString: function() {
        if(this.state === 0) {
            return '就绪';
        }else if(this.state === 1) {
            return '运行';
        }else {
            return '完成';
        }
    },
    clearState: function() {
        this.hasRunTime = 0;
        this.hasArriveTime = 0;
        this.state = 0;
        this.listLivel = 0;
    },

    // 转换状态
    turnRun: function() {
        this.state = 1;
    },
    turnReadly: function() {
        this.state = 0;
    },
    complete: function(){
        this.state = 2;
    },

    // 判断状态
    isRunning: function() {
        if(this.state === 1){
            return true;
        }else{
            return false;
        }
    },
    isReadly: function() {
        if(this.state === 0){
            return true;
        }else{
            return false;
        }
    },
    isComplete: function() {
        if(this.state===2) {
            return true;
        }else{
            return false;
        }
    }
}

export default PCB;