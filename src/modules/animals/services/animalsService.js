const HttpError = require("../../common/models/HttpError");
const Animal = require("../models/animal");
const animalRepository = require("../repositories/animalsREpository");

class AnimalsService {
    constructor(animalRepositoty) {
        this.animalRepository = animalRepository;
    }

    // описываем интерфейс
    async getAll() {
       // a lot of logic 
       return await this.animalRepository.findAll();
    }

    async getOneById(id) {
        //return await this.animalRepository.findOneById(id);
        const animal = await this.animalRepository.findOneById(id);
        if (!animal) {
          throw new HttpError(404, 'Animal is not found');
        }   
        return animal;
        }

    async create(payload) {
        const animal = new Animal(payload);
        return await this.animalRepository.create(animal);
    }
    
    async updateById(id, payload) {
        const animal = await this.animalRepository.updateById(id, payload);
        if (!animal) {
          throw new HttpError(404, 'Animal is not found');
        }
        return animal;
      }
    

    async deleteById(id) {
        const animal = await this.animalRepository.deleteById(id);
        if (!animal) {
          throw new HttpError(404, 'Animal is not found');
        }
        return { id };
      }
    
}

const animalsService = new AnimalsService(animalRepository);

module.exports = animalsService;
// бизнесс логика