import fs from 'fs'
import iconHandler from './iconHandler.js'

describe('iconHandler', () => {
    // iconの削除
    beforeAll(() => {
        try {
            if (fs.existsSync('./assets/icon16.png')) {
                fs.unlinkSync('./assets/icon16.png')
                fs.unlinkSync('./assets/icon48.png')
                fs.unlinkSync('./assets/icon128.png')
            }
        } catch (err) {
            console.error(err)
        }
    })

    test('./assets/test1.txt should be Error', async () => {
        let cmdObj = {
            iconPath: './assets/test1.txt',
            outputPath: './assets',
        }
        await expect(iconHandler(cmdObj)).rejects.toThrow(
            'ファイルタイプが不正です'
        )
    })

    test('./assets/test2.txt should be Error', async () => {
        let cmdObj = {
            iconPath: './assets/test2.txt',
            outputPath: './assets',
        }
        await expect(iconHandler(cmdObj)).rejects.toThrow(
            'ファイルタイプが不正です'
        )
    })

    test('./assets should be Error', async () => {
        let cmdObj = {
            iconPath: './assets.txt',
            outputPath: './assets',
        }
        await expect(iconHandler(cmdObj)).rejects.toThrow('pathが不正です')
    })

    test('./assets/test.png should not be Error', async () => {
        let cmdObj = {
            iconPath: './assets/test.png',
            outputPath: './assets',
        }
        await expect(iconHandler(cmdObj)).resolves.not.toThrow()
    })
})
