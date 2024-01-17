import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Put,
} from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { BasicAuthenticationGuard } from '../authentication/guards/basicAuthentication.guard';

@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @UseGuards(BasicAuthenticationGuard)
  @Post()
  create(@Body() createCarDto: CreateCarDto) {
    return this.carsService.create(createCarDto);
  }

  @UseGuards(BasicAuthenticationGuard)
  @Get()
  findAll() {
    return this.carsService.findAll();
  }

  @UseGuards(BasicAuthenticationGuard)
  @Get('brand/:brand')
  findAllByBrand(@Param('brand') brand: string) {
    return this.carsService.findAllByBrand(brand);
  }

  @UseGuards(BasicAuthenticationGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    console.log('id', id);
    return this.carsService.findOne(id);
  }

  @UseGuards(BasicAuthenticationGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateCarDto: UpdateCarDto) {
    return this.carsService.update(id, updateCarDto);
  }

  @UseGuards(BasicAuthenticationGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.carsService.remove(id);
  }
}
