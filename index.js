
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
 * Database firebas
 * @private
 */
var _database = firebase.database();

/**
 * Storage firebase
 * @private
 */
var _storage = firebase.storage();

var _storageRef = _storage.ref();

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

/**
 * View image the input file
 */
function viewImg() {
    var _preview = document.querySelector( 'img' );
    var _file = document.querySelector( 'input[type=file]' ).files[0];
    var _lector = new FileReader();
    _lector.onloadend= function () {
        _preview.src = _lector.result;
    }
    if ( _file ) {
        _lector.readAsDataURL( _file );
        var _putImg = _storageRef.child( "platillos/"+ _file.name ).put( _file );
        _putImg.on( "state_changed", function ( snapshot ) {
            //change on load the file
            
        }, function error ( e ) {
            //error in the load file
            console.warn(e);
        }, function success () {
            //success load file
            console.log( _putImg.snapshot.downloadURL );
        } )
    }else{
        _preview.src = "";
    }
}
