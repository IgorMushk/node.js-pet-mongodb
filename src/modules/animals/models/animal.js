const {nanoid} = require('nanoid');

class Animal {
    constructor(payload) {
        this.id = nanoid();
        this.createdAt = new Date().toISOString();
        this.updateAt = new Date().toISOString();
        this.name = payload.name;
        this.age = payload.age;
        this.isVaccinated = payload.isVaccinated;
        this.gender = payload.gender;
        this.species = payload.species;
    }
}

module.exports = Animal;

// Animals

// id (generated)
// createdAt (timestamp)
// updatedAt (timestamp)
// name (string)
// age (number)
// isVaccinated (boolean)
// gender ('male' | 'female')
// species (string)