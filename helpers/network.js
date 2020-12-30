export function CheckParams(paramsList, data) {
    for (let i = 0; i < paramsList.length; i++) {
        if (!data[paramsList[i]]) {
            return false
        }
    }
    return true
}