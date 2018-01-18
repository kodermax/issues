const fs = require('fs')
const striptags = require('striptags')
let fileContent = fs.readFileSync('build/index.html', 'utf-8').toString()
const head = fileContent.match(/<head>(.*?)<\/head>/g).map((val) => {
    return striptags(val, ['title', 'link', 'style', 'script'])
})
const body = fileContent.match(/<body>(.*?)<\/body>/g).map((val) => {
    return striptags(val, ['div', 'link', 'style', 'script'])
})
fs.readFile('public/index.php', 'utf8', (err, data) => {
    if (err) {
        return console.log(err)
    }
    let result = data
        .replace(/<% HEAD %>/g, head[0])
        .replace(/<% BODY %>/g, body[0])

    fs.writeFile('build/index.php', result, 'utf8', (err) => {
        if (err) return console.log(err)
    })
    fs.unlink('build/index.html', (err) => {
        if (err) {
            return console.log(err)
        }
        console.log('successfully deleted build/index.html')
    })
})
