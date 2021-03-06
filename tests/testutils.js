const masterDataModel = require('../models/masterDataModel');
const testData = require('./testdata');

module.exports.beforeEach = async function () {
    await masterDataModel.insertMany(testData)
};

module.exports.afterEach = async function () {
    await masterDataModel.deleteMany();
}

module.exports.beforeAll = async function (server, dbname, mongoose) {
    return new Promise((resolve) => {
        const dbOptions = {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        };
        server.getUri(dbname).then((mongoUri) => {
            mongoose.connect(mongoUri, dbOptions);
            var db = mongoose.connection;
            db.once('open', function () {
                resolve();
            });
        });
    });
};

module.exports.afterAll = async function (server, mongoose) {
    await mongoose.connection.close();
    await server.stop();
};