import { IsNotEmpty } from "class-validator";

export default class UpdateCarDto {
    constructor(
        _id: string,
        name: string,
        typeCar: string,
        capacity: string,
        status: string,
        description: string,
        imagePath: string
    ) {
        this._id = _id;
        this.name = name;
        this.typeCar = typeCar;
        this.imagePath = imagePath;
        this.capacity = capacity;
        this.status = status;
        this.description = description;
    }

    @IsNotEmpty()
    public capacity: string;
    @IsNotEmpty()
    public typeCar: string;
    @IsNotEmpty()
    public name: string;
    public _id: string;
    public description: string;
    public status: string;
    public imagePath: string;
}
