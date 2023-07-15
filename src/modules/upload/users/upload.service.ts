import { isEmptyObject } from "@core/utils/helper";
import { HttpException } from "@core/exceptions";
import { BUCKET_NAME } from "@core/utils/constant";
import { REGION, S3_ACCESS_KEY, SECRET_ACCESS_KEY } from "@core/utils/constant";
import { v4 as uuid } from "uuid";
import AWS from "aws-sdk";

// AWS.config.update({
//   maxRetries: 3,
//   httpOptions: {timeout: 30000, connectTimeout: 5000},
//   region: 'us-east-1',
//   accessKeyId: 'XXXX...',
//   secretAccessKey: 'XXXX...',
// });
const s3 = new AWS.S3({
    region: process.env.REGION,
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    signatureVersion: "v4",
});

class UploadService {
    public async generrateUpload(
        car_id: string,
        filename: string
    ): Promise<String> {
        const presignedUrls = [];
        const nameSplit = filename.split(".");
        const tail = nameSplit[nameSplit.length - 1];

        // console.log("car_id", car_id);
        // for (let i = 0; i < Number(img_amount); i++) {
        const params2 = {
            Bucket: BUCKET_NAME!,
            Key: `${car_id}/${uuid()}.${tail}`,
            Expires: 60,
        };
        // console.log(params2);
        const urlUpload = await s3.getSignedUrlPromise("putObject", params2);
        // presignedUrls.push(urlUpload);
        // }

        return urlUpload;
    }
}
export default UploadService;
