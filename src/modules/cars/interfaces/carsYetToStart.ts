import { NameValue } from "@core/interfaces";

export interface ICarsYetToStart {
    listInfo: Array<IDriverDetail>;
    configOption: Array<NameValue>;
}

export interface IDriverDetail {
    license_plate: string;
    driver_name: string;
    phonenumber: string;
}
