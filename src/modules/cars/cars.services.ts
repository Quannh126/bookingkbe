import { Car, ICar } from "@modules/cars";
import { isEmptyObject } from "@core/utils/helper";
import { HttpException } from "@core/exceptions";
import { IPagination } from "@core/interfaces";
import { AddCarDto, UpdateCarDto } from "@modules/cars/dto";

class CarsService {
    public carModel = Car;

    public async addCar(model: AddCarDto): Promise<void> {
        if (isEmptyObject(model)) {
            throw new HttpException(400, "Model is empty");
        }
        await this.carModel.create({
            ...model,
            imagePath: "",
            trips: [],
            policy: "",
            date: Date.now(),
        });
    }

    public async getAllCar(): Promise<ICar[]> {
        const cars = await this.carModel
            .find()
            .exec()
            .catch((err) => {
                throw new HttpException(405, err.message);
            });
        return cars;
    }

    public async searchCar(name: String): Promise<ICar[]> {
        let query = {
            name: `/${name}/`,
        };
        const cars = await this.carModel.find(query).exec();
        return cars;
    }
    public async getCar(id: String): Promise<ICar> {
        const car = await this.carModel.findOne({ id }).exec();
        if (!car) {
            throw new HttpException(405, "Id not exist");
        }
        return car;
    }

    public async getAllPaging(
        keyword: string,
        page: number
    ): Promise<IPagination<ICar>> {
        const pageSize = Number(process.env.PAGE_SIZE);
        let query = {};
        if (keyword) {
            query = {
                $or: [{ type: keyword }, { name: keyword }],
            };
        }

        const items = await this.carModel
            .find(query)
            .sort({ date: -1 })
            .skip((page - 1) * pageSize)
            .limit(pageSize)
            .exec();
        const count = await this.carModel
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

    public async deleteCar(uid: string): Promise<ICar> {
        const deleteCar = await this.carModel.findByIdAndDelete(uid).exec();

        if (!deleteCar) {
            throw new HttpException(409, "ID invalid");
        }
        return deleteCar;
    }

    public async updateCar(model: UpdateCarDto): Promise<ICar> {
        if (isEmptyObject(model)) {
            throw new HttpException(400, "Model is empty");
        }
        const result = await this.carModel.findOneAndUpdate({
            ...model,
        });
        if (!result) {
            throw new HttpException(409, "Id valid");
        }
        return result;
    }
}
export default CarsService;
