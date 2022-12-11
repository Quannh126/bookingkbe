import {IsNotEmpty, MinLength} from 'class-validator'

export default class UpdateCarDto {
    constructor(
        id: string,
        name: string, 
        type: string, 
        capacity: string, 
        company: string,
        imagePath: string,
        policy: string,
        )
        {
            this.name = name;
            this.type = type;
            this.capacity = capacity;
            this.company = company;
            this.id = id;
            this.policy = policy
        }
    public policy: string;
    @IsNotEmpty()
    public id: String;  
    @IsNotEmpty()
    public company: string;
    @IsNotEmpty()
    public capacity: string;
    @IsNotEmpty()
    public type: string;
    @IsNotEmpty()
    public name: string;
}