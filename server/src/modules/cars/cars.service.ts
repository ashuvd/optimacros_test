import { Injectable } from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ObjectId } from 'mongodb';
import { Car } from './entities/car.entity';

@Injectable()
export class CarsService {
  constructor(
    @InjectRepository(Car)
    private carsRepository: Repository<Car>,
  ) {}

  create(createCarDto: CreateCarDto) {
    return this.carsRepository.save(this.carsRepository.create(createCarDto));
  }

  findAll() {
    return this.carsRepository.find();
  }

  findAllByBrand(brand: string) {
    return this.carsRepository.find({
      where: { brand },
      order: { name: 'ASC' },
    });
  }

  findOne(_id: string) {
    return this.carsRepository.findOneBy({ _id: new ObjectId(_id) });
  }

  update(_id: string, updateCarDto: UpdateCarDto) {
    return this.carsRepository.update({ _id: new ObjectId(_id) }, updateCarDto);
  }

  remove(_id: string) {
    return this.carsRepository.delete({ _id: new ObjectId(_id) });
  }
}
