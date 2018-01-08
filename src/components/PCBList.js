var PCBList = function(level) {
    this.list = [];  // 按照时间顺序插入，未排序
    this.readList = [];
    this.level = level ? level : 0;
    this.length = 0;
    this._currentPcb = undefined;
    this._nextPcb = undefined;
}

PCBList.prototype = {
    _FCFS: function() {
        // 把所有的就绪队列按照其到达的时间排序，越早到排越前面
        var arr = this.readList.concat().sort((val1, val2) => {
            if(val1.id < val2.id) {
                return -1;
            }else if(val1.id > val2.id) {
                return 1;
            }else{
                return 0;
            }
        })
        return arr[0];
    },
    _SRR: function() {
        // 把所有的就绪队列按照其到达的时间排序，越早到排越前面
        var arr = this.readList.concat().sort((val1, val2) => {
            if(val1.id < val2.id) {
                return -1;
            }else if(val1.id > val2.id) {
                return 1;
            }else{
                return 0;
            }
        })
        // 设置当前要访问的 pcb 和 下一个要访问的 pcb
        this._currentPcb = this._nextPcb || arr[0];
        this._nextPcb = arr[(arr.indexOf(this._currentPcb) + 1 ) % this.readList.length]
        return arr[arr.indexOf(this._currentPcb)];
    },
    _PSA: function() {
        // 把所有的就绪队列按照其优先级排序，优先级越大排在越前面
        var arr = this.readList.concat().sort((val1, val2) => {
            if(val1.priority > val2.priority) {
                return -1;
            }else if(val1.priority < val2.priority) {
                return 1;
            }else{
                return 0;
            }
        })
        return arr[0];
    },
    _MFQ: function() {
        // 把所有的就绪队列按照其所处的队列及到达的时间排序，队列数越小，到达时间越早排在越前面
        var arr = this.readList.concat().sort((val1, val2) => {
            if(val1.listLivel < val2.listLivel) {
                return -1;
            }else if(val1.listLivel > val2.listLivel) {
                return 1;
            }else{
                return 0;
            }
        })

        // 在调度过程中又有新的进程进入就绪状态时，判断是否需要先执行它
        if(arr.length >=2 && arr[0].listLivel < arr[1].listLivel) {
            this._currentPcb = arr[0];
        }else{
            this._currentPcb = this._nextPcb || arr[0];
        }
        this._nextPcb = arr[(arr.indexOf(this._currentPcb) + 1 ) % this.readList.length]
        if(arr[arr.indexOf(this._currentPcb)] !== undefined){
            arr[arr.indexOf(this._currentPcb)].listLivel++;
        }
        return arr[arr.indexOf(this._currentPcb)];
    },
    addPCB: function(pcb) {
        this.list.push(pcb)
        this.readList.push(pcb)
        this.length = this.length + 1;
        return this.length;
    },
    getLen: function() {
        return this.list.length;
    },
    getList: function() {
        return this.list;
    },
    nextTime: function(type, timeSlice) {

        switch(type) {
            case 0:   // 先来先到算法
                var pcb = this._FCFS();
                break;
            case 1:   // 简单轮询算法
                var pcb = this._SRR();
                break;
            case 2:   // 可变时间片轮询算法
                var pcb = this._SRR();
                break;
            case 3:   // 最高优先级调度算法
                var pcb = this._PSA();
                break;
            case 4:   // 多级反馈队列调度算法
                var pcb = this._MFQ();
                if(pcb) {
                    timeSlice = pcb.listLivel;
                }
                break;
        }

        if(pcb === undefined) {
            alert('所有进程调度已完成!');
            return;
        }else{
            this.list.forEach(item => {
                if(!item.isComplete()) {
                    if(item.id === pcb.id) {
                        item.addArriveTime((item.needTime - item.hasRunTime) > timeSlice? timeSlice : (item.needTime - item.hasRunTime))
                    }else{
                        item.addArriveTime(timeSlice);
                    }
                }
                if(item.id === pcb.id) {
                    item.addRunTime(timeSlice);
                    item.turnRun()
                    if(item.needTime <= item.hasRunTime) {
                        item.complete();
                        this.readList = this.readList.filter((item) => {
                            if(item.id !== pcb.id){
                                return true;
                            }else {
                                return false;
                            }
                        })
                    }
                }else{
                    if(!item.isComplete()){
                        item.turnReadly()
                    }
                }
            });
        }
    },
    clearState: function() {
        this.list = [];
        this.length = 0;
    },
    resect: function() {
        this.readList = [];
        this.list.forEach(element => {
            element.clearState();
            this.readList.push(element)
        });
        this._currentPcb = undefined;
        this._nextPcb = undefined;
    }
}

export default PCBList;