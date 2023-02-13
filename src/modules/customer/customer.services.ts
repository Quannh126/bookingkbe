import { Customer, ICustomer, ICustomerDetial } from "@modules/customer";
import { isEmptyObject } from "@core/utils/helper";
import { HttpException } from "@core/exceptions";
import { IPagination, NameValue } from "@core/interfaces";
import { AddCustomerDTO, UpdateCustomerDTO } from "@modules/customer/dto";

class CustomerService {
    public customerModel = Customer;

    public async addCustomer(data: AddCustomerDTO): Promise<void> {
        if (isEmptyObject(data)) {
            throw new HttpException(400, "Model is empty");
        }

        const customer = await this.customerModel.find({
            "$or": [{ phonenumber: data.phonenumber }, { email: data.email }],
        });

        if (!customer || customer.length == 0) {
            await this.customerModel.create({
                ...data,
            });
        } else {
            throw new HttpException(409, "Số điện thoại hoặc email đã tồn tại");
        }
    }

    public async getAllCustomer(): Promise<ICustomer[]> {
        const customers = await this.customerModel
            .find(
                {},
                { _id: 1, name: 1, phonenumber: 1, email: 1, times_booking: 1 }
            )
            .exec()
            .catch((err) => {
                throw new HttpException(405, err.message);
            });
        return customers;
    }

    public async searchCustomer(name: String): Promise<ICustomer[]> {
        let query = {
            name: `/${name}/`,
        };
        const customer = await this.customerModel.find(query).exec();
        return customer;
    }
    public async getCustomer(id: String): Promise<ICustomer> {
        const customer = await this.customerModel.findOne({ id }).exec();
        if (!customer) {
            throw new HttpException(405, "Id not exist");
        }
        return customer;
    }

    public async getAllPaging(
        keyword: string,
        page: number
    ): Promise<IPagination<ICustomer>> {
        const pageSize = Number(process.env.PAGE_SIZE);
        let query = {};
        if (keyword) {
            query = {
                $or: [{ type: keyword }, { name: keyword }],
            };
        }

        const items = await this.customerModel
            .find(query)
            .sort({ date: -1 })
            .skip((page - 1) * pageSize)
            .limit(pageSize)
            .exec();
        const count = await this.customerModel
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

    public async deleteCustomer(id: string): Promise<ICustomer> {
        console.log(id);
        const result = await this.customerModel.findByIdAndDelete(id).exec();

        if (!result) {
            throw new HttpException(409, "ID invalid");
        }
        return result;
    }

    public async updateCustomer(data: UpdateCustomerDTO): Promise<ICustomer> {
        if (isEmptyObject(data)) {
            throw new HttpException(400, "Model is empty");
        }
        const result = await this.customerModel.findByIdAndUpdate(data!._id, {
            ...data,
        });
        if (!result) {
            throw new HttpException(400, "Id valid");
        }
        return result;
    }

    public async getCustomerByPhoneNumber(): Promise<Array<ICustomer>> {
        // const query = {
        //     phonenumber: {
        //         $regex: new RegExp(phonenumber),
        //         $options: "i",
        //     },
        // };
        // console.log(query);
        const result = await this.customerModel.find({}).exec();
        if (!result) {
            throw new HttpException(400, "Id valid");
        }
        return result;
    }
}
export default CustomerService;
