import { Test } from '@nestjs/testing';
import { CarsController } from './cars.controller';
import { CarsService } from './cars.service';
import { ObjectId } from 'mongodb';
import { TypeORMMongoDBTestingModule } from '../../test-utils/TypeORMMongoDBTestingModule';
import { Car } from './entities/car.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

describe('CarsController', () => {
  let carsController: CarsController;
  let carsService: CarsService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        TypeORMMongoDBTestingModule([Car]),
        TypeOrmModule.forFeature([Car]),
      ],
      controllers: [CarsController],
      providers: [CarsService],
    }).compile();

    carsService = moduleRef.get<CarsService>(CarsService);
    carsController = moduleRef.get<CarsController>(CarsController);
  });

  describe('findAll', () => {
    it('should return an array of cars', async () => {
      const result = [
        {
          _id: new ObjectId('65a6d503db4d35acfec2c01a'),
          brand: 'audi',
          name: 'TT',
          productionYear: 1987,
          price: 111,
        },
      ];
      jest.spyOn(carsService, 'findAll').mockImplementation(async () => result);

      expect(await carsController.findAll()).toBe(result);
    });
  });
});
