import { Car, ICar, ICarDetail } from "@modules/cars";
import { isEmptyObject } from "@core/utils/helper";
import { HttpException } from "@core/exceptions";
import { IPagination, NameValue } from "@core/interfaces";
import { AddCarDto, UpdateCarDto } from "@modules/cars/dto";
import { ICarsYetToStart } from "./interfaces/carsYetToStart";
// import ICarDetail from "./interfaces/carDetail.interface";

class CarsService {
    public carModel = Car;

    public async addCar(model: AddCarDto): Promise<void> {
        if (isEmptyObject(model)) {
            throw new HttpException(400, "Model is empty");
        }
        await this.carModel.create({
            ...model,
        });
    }
    public async getCarsAlready(): Promise<Array<NameValue>> {
        const list = await this.carModel
            .find(
                { status: "Yet To Start" }
                // {
                //     _id: 1,
                //     name: 1,
                //     // driver_name: 1,
                //     // license_plate: 1,
                //     // phonenumber: 1,
                // }
            )
            .exec();
        let configOption = list.map(({ _id: value, name: name }) => ({
            value,
            name,
        }));
        // let listInfo = list.map(
        //     ({ driver_name, license_plate, phonenumber }) => ({
        //         phonenumber,
        //         license_plate,
        //         driver_name,
        //     })
        // );
        return configOption;
    }
    public async getAllCar(): Promise<ICarDetail[]> {
        const cars = await this.carModel
            .find({})
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

    public async deleteCar(id: string): Promise<ICar> {
        console.log(id);
        const deleteCar = await this.carModel.findByIdAndDelete(id).exec();

        if (!deleteCar) {
            throw new HttpException(409, "ID invalid");
        }
        return deleteCar;
    }

    public async updateCar(data: UpdateCarDto): Promise<ICarDetail> {
        if (isEmptyObject(data)) {
            throw new HttpException(400, "Model is empty");
        }
        const result = await this.carModel.findByIdAndUpdate(data!._id, {
            ...data,
        });
        if (!result) {
            throw new HttpException(400, "Id valid");
        }
        return result;
    }
}
export default CarsService;
