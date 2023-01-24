export default interface ILocation {
    name: string;
    code: number;
    division_type: string;
    district: Array<IDistrict>;
}

export interface IDistrict {
    name: string;
    code: number;
    division_type: string;
    province_code: number;
    point: Array<IPoint>;
}
export interface IPoint {
    code: number;
    name: string;
    address: string;
}
