import fs from 'fs'
import path from 'path'
import jimp from 'jimp'
import fileType from 'file-type'
import { logger } from './utils'

const FILE_TYPE = ['png', 'jpeg', 'tiff', 'gif', 'bmp']
const ICON16 = [16, 16]
const ICON48 = [48, 48]
const ICON128 = [128, 128]

export default async cmdObj => {
    logger.info(
        `iconPath: ${cmdObj.iconPath}, outputPath: ${cmdObj.outputPath}`
    )
    const iconPath = path.resolve(cmdObj.iconPath)
    const outputPath = path.resolve(cmdObj.outputPath || './')

    if (!iconPath || !checkFileExist(iconPath)) {
        throw new Error('pathが不正です')
    }
    const buf = fs.readFileSync(iconPath)
    const type = fileType(buf)
    if (!type || FILE_TYPE.indexOf(type.ext) < 0) {
        throw new Error('ファイルタイプが不正です')
    }

    try {
        let image = await jimp.read(iconPath)
        image.resize(...ICON128).write(path.resolve(outputPath, 'icon128.png'))
        image.resize(...ICON48).write(path.resolve(outputPath, 'icon48.png'))
        image.resize(...ICON16).write(path.resolve(outputPath, 'icon16.png'))
    } catch (err) {
        throw new Error('iconの作成に失敗しました')
    }
}

const checkFileExist = filePath => {
    try {
        if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
            return true
        }

        return false
    } catch (err) {
        return false
    }
}
