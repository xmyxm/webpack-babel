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
