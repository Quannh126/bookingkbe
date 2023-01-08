import { Line, ILine } from "@modules/lines";
import { isEmptyObject } from "@core/utils/helper";
import { HttpException } from "@core/exceptions";
import { IPagination, KeyValue } from "@core/interfaces";
import CreateLineDTO from "./dto/create_lines.dto";

// import ILineDetail from "./interfaces/carDetail.interface";

class LinesService {
    public lineModel = Line;

    public async addLine(model: CreateLineDTO): Promise<ILine> {
        if (isEmptyObject(model)) {
            throw new HttpException(400, "Model is empty");
        }
        const name_line = model.from + " - " + model.to;
        const result = await this.lineModel.create({
            ...model,
            name_line,
        });
        return result;
    }
    // public async getLine(): Promise<KeyValue[]> {
    //     const list = await this.lineModel.find({}, { _id: 1, name: 1 }).exec();
    //     let result = list.map(({ _id: key, name: value }) => ({ key, value }));
    //     return result;
    // }
    public async getOptionsLine(): Promise<KeyValue[]> {
        const list = await this.lineModel
            .find({}, { _id: 1, name_line: 1 })
            .exec();
        let result = list.map(({ _id: key, name_line: value }) => ({
            key,
            value,
        }));
        //     return result;
        return result;
    }

    public async searchLine(name_line: String): Promise<ILine[]> {
        let query = {
            name_line: name_line,
        };
        const lines = await this.lineModel.find(name_line).exec();
        return lines;
    }
    public async getLine(id: String): Promise<ILine> {
        const line = await this.lineModel.findOne({ id }).exec();
        if (!line) {
            throw new HttpException(405, "Id not exist");
        }
        return line;
    }
    public async getAll(): Promise<ILine[]> {
        const line = await this.lineModel.find().exec();
        // if (!line) {
        //     throw new HttpException(405, "Id not exist");
        // }
        return line;
    }

    public async getAllPaging(
        keyword: string,
        page: number
    ): Promise<IPagination<ILine>> {
        const pageSize = Number(process.env.PAGE_SIZE);
        let query = {};
        if (keyword) {
            query = {
                $or: [{ type: keyword }, { name: keyword }],
            };
        }
        const items = await this.lineModel
            .find(query)
            .sort({ date: -1 })
            .skip((page - 1) * pageSize)
            .limit(pageSize)
            .exec();
        const count = await this.lineModel
            .find(query)
            .estimatedDocumentCount()
            .exec();
        return {
            total: count,
            page: page,
            pageSize: pageSize,
            items: items,
        };
    }

    public async deleteLine(id: string): Promise<ILine> {
        console.log(id);
        const deleteLine = await this.lineModel.findByIdAndDelete(id).exec();

        if (!deleteLine) {
            throw new HttpException(409, "ID invalid");
        }
        return deleteLine;
    }

    public async updateLine(data: CreateLineDTO): Promise<CreateLineDTO> {
        if (isEmptyObject(data)) {
            throw new HttpException(400, "Model is empty");
        }
        const result = await this.lineModel.findByIdAndUpdate(data._id, {
            ...data,
        });
        if (!result) {
            throw new HttpException(409, "Id valid");
        }
        return result;
    }
}
export default LinesService;
