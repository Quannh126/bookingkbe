import { IsNotEmpty } from "class-validator";

export default class AddCarDto {
    constructor(
        name: string,
        typeCar: string,
        capacity: string,
        status: string,
        description: string,
        imagePath: string
    ) {
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

    public description: string;
    public status: string;
    public imagePath: string;
}
