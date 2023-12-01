const { Command } = require("commander");
const animalsService = require("./src/modules/animals/services/animalsService");
const program = new Command();

//console.log(process.argv);

program.name("pat-app").description("Amazing pet app").version("1.8.0");

program
  .command("get-animal")
  .description("Get one or many animals")
  //-.argument("<string>", "string to split")
  //-.option("--first", "display just the first substring")
  .option("-i, --id <char>", "animal's id")
  ///.action((options) => {
 .action(async({id}) => {  
    //-const limit = options.first ? 1 : undefined;
    //-console.log(str.split(options.separator, limit));
    if(!id){
      const animals = await animalsService.getAll();
      //console.log('Animals were found', animals);
      console.table(animals);
    } else {
        const animal = await animalsService.getOneById(id)   ;
        console.log('Animal was found', animal);
    }
    //console.log('get animal', options);
  });

  program
  .command("create-animal")
  .description("Create animal")
  .argument("<payload>")
  .action(async (payload) => {
    const animal = await animalsService.create(JSON.parse(payload));
    console.log('Animals was created', animal);
    //console.log('create animal', payload);
  });

  program
  .command("update-animal")
  .description("Update animal by id")
  .argument("<payload>")
  .requiredOption("-i, --id <id>", "animal's id")
  .action((payload,options) => {
    console.log('update animal', payload, options);
  });

//program.parse();
program.parse(process.argv);

// $ node index.js get-animal --id 123
// get animal { id: '123' }

// $ node index.js create-animal '{"data":5}'
// create animal {"data":5}

// $ node index.js update-animal '{"data":5}' --id 123
// update animal {"data":5} { id: '123' }

// $ node index.js get-animal
// $ node index.js create-animal '{"name": "Vasyl", "age": 5, "isVaccinated": true, "gender": "male", "species": "cat"}'

// $ node index.js get-animal --id pqKP4ZTU4WQ3SNdvDOBf2