import fs from 'fs'
import path from 'path'
import jimp from 'jimp'
import fileType from 'file-type'

const FILE_TYPE = ['png', 'jpeg', 'tiff', 'gif', 'bmp']
const ICON16 = [16, 16]
const ICON48 = [48, 48]
const ICON128 = [128, 128]

export default async cmdObj => {
    const iconPath = path.resolve(cmdObj.iconPath)
    const outputPath = path.resolve(cmdObj.outputPath || './')
    console.log(`iconPath: ${iconPath} outputPath: ${outputPath}`)

    if (!iconPath || !checkFileExist(iconPath)) {
        console.log('iconPathが不正です.')
        process.exit(1)
    }
    const buf = fs.readFileSync(iconPath)
    const type = fileType(buf).ext
    if (FILE_TYPE.indexOf(type) < 0) {
        console.log('ファイルタイプが不正です')
        process.exit(1)
    }

    try {
        let image = await jimp.read(iconPath)
        image.resize(...ICON128).write(path.resolve(outputPath, 'icon128.png'))
        image.resize(...ICON48).write(path.resolve(outputPath, 'icon48.png'))
        image.resize(...ICON16).write(path.resolve(outputPath, 'icon16.png'))
    } catch (err) {
        console.log('iconの作成に失敗しました')
        process.exit(1)
    }
}

const checkFileExist = filePath => {
    try {
        fs.statSync(filePath)
        return true
    } catch (err) {
        return false
    }
}
