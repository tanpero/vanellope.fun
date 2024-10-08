import fs from 'fs'

function getRandomKey(obj) {
    const keys = Object.keys(obj);
    const randomIndex = Math.floor(Math.random() * keys.length);
    return keys[randomIndex];
}

function getRandomSubKey(obj) {
    const key = getRandomKey(obj);
    const subObj = obj[key];
    const subKeys = Object.keys(subObj);
    const randomSubIndex = Math.floor(Math.random() * subKeys.length);
    return { key, subKey: subKeys[randomSubIndex], subValue: subObj[subKeys[randomSubIndex]] };
}

export default async () => {
    const poems = JSON.parse(await fs.promises.readFile('./public/static/poems.json', 'utf8'))
    const result = getRandomSubKey(poems)
    const author = result.key
    const title = result.subKey
    const content = "<p>" + result.subValue.join("</p><p>") + "</p>"
    return { author, title, content }
}
