
import { printInfo, isIncludes } from "./common/util"

const timeout = (num) => {
    return new Promise(resolve => {
        setTimeout(function () {
            console.log('resolve: ' + Date.now())
            resolve()
        }, num)
    })
}

function AryIncludes() {
    var arry = [1, 2, 3]
    console.log(arry.includes(1))
}

class DetailPage {

}

printInfo("home page" + isIncludes([1], 1))
