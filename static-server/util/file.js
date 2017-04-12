const fs = require('fs')

function file(filePath){
    let content = fs.readFileSync(filePath,'binary')
    return content

}

module.exports = file