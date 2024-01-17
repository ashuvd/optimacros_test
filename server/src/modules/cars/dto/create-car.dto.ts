import { IsNotEmpty, IsNumber, Max, Min } from 'class-validator';

export class CreateCarDto {
  @IsNotEmpty()
  brand: string;

  @IsNotEmpty()
  name: string;

  @IsNumber()
  @Min(1970)
  @Max(3000)
  productionYear: number;

  @IsNumber()
  price: number;
}
