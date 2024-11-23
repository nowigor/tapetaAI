import axios from 'axios';
import fs from 'fs';
import {setWallpaper} from "wallpaper";

async function downloadAndSetWallpaper(imageUrl, savePath) {
    try {
        const response = await axios({
            url: imageUrl,
            method: 'GET',
            responseType: 'stream',
        });
        const writer = fs.createWriteStream(savePath);
        response.data.pipe(writer);
        await new Promise((resolve, reject) => {
            writer.on('finish', resolve);
            writer.on('error', reject);
        });

        console.log(`Image downloaded to: ${savePath}`);

        await setWallpaper(savePath);
        console.log('Wallpaper set successfully!');
    } catch (error) {
        console.error('Error:', error.message);
    }
}
function generateFileName(length = 5) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters[randomIndex];
    }
    return result;
}