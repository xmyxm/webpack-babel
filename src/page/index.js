
import { printInfo, isIncludes, event } from "./common/util"

const timeout = (num) => {
    return new Promise(resolve => {
        setTimeout(function () {
            printInfo('resolve: ' + Date.now())
            resolve()
        }, num)
    })
}

function AryIncludes() {
    var arry = [1, 2, 3]
    printInfo(arry.includes(1))
}

function notify(msg) {
    printInfo(msg)
}

class DetailPage {

}

printInfo("home page" + isIncludes([1], 1))

event.on("onload", notify)
event.emit("onload", "mark")