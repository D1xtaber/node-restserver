//Puerto
process.env.PORT = process.env.PORT || 3000; //definit variables gloables process.env.PORT


//===============================
//Entorno
//=================================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev'; //Esta variable la crear heroku
let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe'
} else {
    urlDB = process.env.MONGO_URI
}
//urlDB = 'mongodb://cafe-user:Dmt2018@ds115971.mlab.com:15971/cafe'
process.env.URLDB = urlDB; //Inventamos un enviroment