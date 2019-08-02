export function isIncludes(aryList, val) {
    return aryList.includes(val)
}

export function printInfo(info) {
    console.log('\x1B[32m%s\x1B[39m', info)
}

export function printWarn(warn) {
    console.log('\x1B[33m%s\x1b[0m:',warn);
}

export function printError(error) {
    console.log('\x1B[31m%s\x1B[39m',error);
}

class Event {
    constructor() {
        this.queue = {}
    }
    on(type, listener) {
        if (typeof listener !== 'function') {
            return
        }
        if (!this.queue[type]) {
            this.queue[type] = []
        }
        this.queue[type].push(listener)
    }
    trigger(type) {
        let i
        let args = []
        for (i = 1; i < arguments.length; i++) {
            args.push(arguments[i])
        }
        if (!this.queue[type]) {
            return
        }
        for (i = 0; i < this.queue[type].length; i++) {
            this.queue[type][i].apply(this, args)
        }
    }
    off(type, listener) {
        let listeners = this.queue[type]
        if (listeners && listeners.length) {
            let idx = listeners.indexOf(listener)
            // 避免错误的listener,误删除了倒数的第一个listener
            if (idx !== -1) {
                listeners.splice(idx, 1)
            }
        }
    }
}

export let event = new Event()
