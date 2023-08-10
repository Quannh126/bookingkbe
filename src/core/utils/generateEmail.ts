
import { IMailProperties } from '@core/interfaces';
import fs from 'fs'
import handlebars from 'handlebars'

const generateEmail = async (dateMail: IMailProperties): Promise<string> => {
    try {
        const html = await readHTMLFile(__dirname + '/Template mail/PaymentSuccess.html');
        const template = handlebars.compile(html);
        const result = template(dateMail);
        return result;
    } catch (error) {
        console.log('error reading file', error);
        throw error;
    }
};

const readHTMLFile = (path: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        fs.readFile(path, { encoding: 'utf-8' }, (err, html) => {
            if (err) {
                reject(err);
            } else {
                resolve(html);
            }
        });
    });
};

export default generateEmail;