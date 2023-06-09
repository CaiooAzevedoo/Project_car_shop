import Car from '../Domains/Car';
import ICar from '../Interfaces/ICar';
import CarODM from '../Models/CarODM';

export default class CarService {
  private createCarDomain(car: ICar | null): Car | null {
    if (car) {
      return new Car(car);
    }
    return null;
  }

  public async createCar(car: ICar) {
    const carODM = new CarODM();
    const newCar = await carODM.create(car);

    return this.createCarDomain(newCar);
  }

  public async find() {
    const carODM = new CarODM();
    const cars = await carODM.find();

    const formattedCars = cars.map((car) => ({
      id: car.id,
      model: car.model,
      year: car.year,
      color: car.color,
      status: car.status,
      buyValue: car.buyValue,
      doorsQty: car.doorsQty,
      seatsQty: car.seatsQty,
    }));

    return formattedCars;
  }

  public async findCarById(id: string) {
    const carODM = new CarODM();
    try {
      const car = await carODM.findById(id);
      return car;
    } catch {
      throw new Error('Invalid mongo id');
    }
  }

  public async update(id: string, newData: Partial<ICar>) {
    const carODM = new CarODM();
    const car = await carODM.update(id, newData);
    try {
      if (car) {
        const updatedCar = {
          id: car.id,
          model: car.model,
          year: car.year,
          color: car.color,
          status: car.status,
          buyValue: car.buyValue,
          doorsQty: car.doorsQty,
          seatsQty: car.seatsQty,
        };
  
        return updatedCar;
      }
    } catch {
      throw new Error();
    }
  }
}