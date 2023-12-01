const animalsService = require("../services/animalsService");

class AnimalController {
  constructor(animalsService) {
    this.animalsService = animalsService;
  }
  getAnimalById = async (req, res, next) => {
    const { animalId } = req.params;
    //res.json({message: `Get animal with id ${animalId}`});
    // try {
      //throw new Error('dsd'); // test
      const animal = await this.animalsService.getOneById(animalId);
      res.json({
        status: 200,
        message: "Successfully retrieved animal",
        data: animal,
      });
    // } catch (error) {
    //   next(error);
    // }
  };

  getAnimals = async (req, res) => {
    //res.json({message: 'Get animals'});
    const animals = await this.animalsService.getAll();
    res.json({
      status: 200,
      message: "Successfully retrieved all animals",
      data: animals,
    });
  };

  createAnimal = async (req, res) => {
    //res.json({message: 'Create animal'});
    //console.log('req.body', req.body);
    const animal = await this.animalsService.create(req.body);
    res.json({
      status: 201,
      message: "Successfully created an animals",
      data: animal,
    });
  };

  updateAnimal = async (req, res) => {
    const { animalId } = req.params;
    //res.json({ message: `Update animal with id ${animalId}` });
    const { body } = req;

    const animal = await this.animalsService.updateById(animalId, body);
    res.json({
      status: 200,
      message: 'Successfully updated an animal!',
      data: animal,
    });
  };

  deleteAnimal = async (req, res) => {
    const { animalId } = req.params;

    const animal = await this.animalsService.deleteById(animalId);
    res.json({
      status: 200,
      message: 'Successfully deleted an animal!',
      data: animal,
    });
  };

}



//const animalController = new AnimalController;
const animalController = new AnimalController(animalsService);

module.exports = animalController;
