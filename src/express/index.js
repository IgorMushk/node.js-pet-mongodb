const express = require("express");
// const fs = require('node:fs');
// const path = require('node:path');
// const { nanoid } = require("nanoid");
// const morgan = require("morgan");
const assignRequestId = require("./middlewares/assignRequestId");
const getLogger = require("./middlewares/logger");
const handleError = require("./middlewares/handleerror");

routers = require("./routes");

/*
//morgan.token('type', function (req, res) { return req.headers['content-type'] });
morgan.token('reqId', function (req, res) {
     return req.id;
    });
*/

/*
// const Router = express.Router;
// const router = Router();
const router = express.Router();

router.get('/', (req,res) => {
    res.json({message: 'Get animals'});
});

router.get('/:animalId', (req, res) => {
    //const animalId = req.params.animalId;
    const {animalId} = req.params;
    res.json({message: `Get animal ${animalId}`});
});

router.post('/', (req,res) => {
    res.json({message: 'Create animal'});
});

router.put('/:animalId', (req,res) => {
    const {animalId} = req.params;
    res.json({message: `Update animal with id ${animalId}`});
});
*/

const app = express();
app.use(express.json());
// x-www-form-urlencoded
//app.use(express.urlencoded({ extended: true }));

// app.use((req, res, next) => {
//   const id = nanoid();
//   req.id = id;
//   //res.send('qwerty');
//   next();
//   //next(id);
// });
app.use(assignRequestId);

/*
//const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
//const accessLogStream = fs.createWriteStream(path.join(process.cwd(), 'logs','access.log'), { flags: 'a' })
const accessLogStream = fs.createWriteStream(path.join(process.cwd(), 'access.log'), { flags: 'a' })
*/
/*
app.use(
    morgan(
        ":reqId :method :url :status :res[content-length] - :response-time ms",
        { stream: accessLogStream, },
        ),
    );
*/
app.use(getLogger());

//app.use('/animals',  router);
app.use(routers);

app.get("/health", (req, res) => {
  //app.use('/health', (req,res) => {
  //res.send('Server is running');
  //console.log(req.id);
  res.setHeader("x-request-id", req.id);
  res.json({ status: 200, message: "Server is running" });
});

// app.use((err, req, res, next) => {
//   //console.log('error', err);
//   res.status(500).json({ status: 500, message: "Something went wrong", err });
// });
app.use(handleError);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
