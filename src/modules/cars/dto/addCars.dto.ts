import { IsNotEmpty } from "class-validator";

export default class AddCarDto {
  constructor(name: string, type: string, capacity: string, company: string) {
    this.name = name;
    this.type = type;
    this.capacity = capacity;
    this.company = company;
  }

  @IsNotEmpty()
  public company: string;
  @IsNotEmpty()
  public capacity: string;
  @IsNotEmpty()
  public type: string;
  @IsNotEmpty()
  public name: string;
}
