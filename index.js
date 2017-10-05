
// Initialize Firebase
var config = {
    apiKey: "AIzaSyAkhLu05Tg0dv-uKeEcQGbr3e0QRFDJo48",
    authDomain: "reactpaneladmin.firebaseapp.com",
    databaseURL: "https://reactpaneladmin.firebaseio.com",
    projectId: "reactpaneladmin",
    storageBucket: "reactpaneladmin.appspot.com",
    messagingSenderId: "803560472335"
};
firebase.initializeApp(config);

/**
 * Database
 * @private
 */
var _database = firebase.database();

/**
 * Add new platillo
 * @param name {string}
 * @param description {string}
 * @param price {number}
 * @private
 */
var _createPlatilloDatabase = function( name, description, price ){
    _database.ref('alimentos').push({
        name: name,
        description: description,
        price: price,
        cantidad: 0
    })
};

/**
 * Create platillos
 */
function addPlatillo() {
    var _name = document.getElementById("name").value;
    var _description = document.getElementById("description").value;
    var _price = document.getElementById("price").value;
    _createPlatilloDatabase( _name, _description, _price );
}
