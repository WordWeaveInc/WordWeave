function setLocalStorage(key, val) {
    localStorage.setItem(key, JSON.stringify(val))
}

function getLocalStorage(key) {
    const val = localStorage.getItem(key)
    return val ? JSON.parse(val) : val
}

function getPuzzle(id) { 
    const puzzleData = getLocalStorage("puzzleData") || {}
    return puzzleData[id]
}

function setPuzzle(id, puzzle) {
    const puzzleData = getLocalStorage("puzzleData") || {}
    const puzzleOrder = getLocalStorage("puzzleOrder") || []
    if (!puzzleOrder.includes(id)){
        puzzleOrder.push(id)
        setLocalStorage("puzzleOrder", puzzleOrder)
    }
    puzzleData[id] = puzzle
    setLocalStorage("puzzleData", puzzleData)
}

function deletePuzzle(id) {
    const puzzleData = getLocalStorage("puzzleData") || {}
    const puzzleOrder = getLocalStorage("puzzleOrder") || []
    setLocalStorage("puzzleOrder", puzzleOrder.filter(item => (item !== id)))
    delete puzzleData[id] 
    setLocalStorage("puzzleData", puzzleData)
}

function clearAllPuzzles() {
    setLocalStorage("puzzleData", {})
    setLocalStorage("puzzleOrder", [])
}

function getPuzzleIDs() {
    return getLocalStorage("puzzleOrder") || []
}

module.exports = {
    getPuzzle,
    setPuzzle,
    deletePuzzle,
    clearAllPuzzles,
    getPuzzleIDs,
}