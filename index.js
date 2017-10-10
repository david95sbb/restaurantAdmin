
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
 * Database firebas object
 * @private
 */
var _database = firebase.database();

/**
 * Storage firebase object
 * @private
 */
var _storage = firebase.storage();

/**
 * Referencie  object storage firebase
 * @private
 */
var _storageRef = _storage.ref();

/**
 * Referencie alimentos table
 * @private
 */
var _refAlimentosTable = _database.ref( 'alimentos/' );

/**
 * Add new platillo
 * @param name {string}
 * @param description {string}
 * @param price {number}
 * @param imgDir {string}
 * @private
 */
var _createPlatilloDatabase = function( name, description, price, imgDir ){
    _database.ref('alimentos').push({
        name: name,
        description: description,
        price: price,
        cantidad: 0,
        img : imgDir
    })
};

/**
 * Create platillos
 */
function addPlatillo() {
    var _name = document.getElementById( "name" ).value;
    var _description = document.getElementById( "description" ).value;
    var _price = document.getElementById( "price" ).value;
    var _imgDir = document.getElementById( "imgDir" ).value;

    try{
        _createPlatilloDatabase( _name, _description, _price, _imgDir );
        alert( "Platillo agregado" );
    } catch( error ) {
        console.warn( "no se agrego el platillo " + error );
    }
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
        var _putImg = _storageRef.child( "platillos/" + _file.name ).put( _file );
        _putImg.on( "state_changed", function ( snapshot ) {
            //change on load the file
            
        }, function error ( e ) {
            //error in the load file
            console.warn(e);
        }, function success () {
            //success load file
            console.log( _putImg.snapshot.downloadURL );
            document.getElementById( "imgDir" ).value = _putImg.snapshot.downloadURL;
        } )
    }else{
        _preview.src = "";
    }
}

/**
 * Get platillos
 */
function getPlatillos() {
    _refAlimentosTable.on( "value", function ( snapshot ) {
        snapshot.forEach( function ( childSnapshot ) {
            console.log( childSnapshot.val() );
            var _ul = document.getElementById( "lista" );
            var _childKey = childSnapshot.key;
            var _childData = childSnapshot.val();
            var _li = document.createElement( "li" );
            var _div = document.createElement( "div" );
            var _img = document.createElement( "img" );
            var _button = document.createElement( "button" );

            _button.setAttribute( "id", _childKey );
            _button.setAttribute( "onclick", "deletePlatillos( this.id )" );
            _button.setAttribute( "class", "btn btn-danger" );
            _button.appendChild( document.createTextNode( "Eliminar" ) );

            _img.src = _childData.img;
            _img.height = 60;
            _img.alt = "Imágen del platillo";

            _div.appendChild( _img );
            _div.style.float = "right";

            _li.setAttribute( "class", "list-group-item" );
            _li.appendChild( _div );
            _li.appendChild( document.createTextNode( "Name: " + _childData.name ) );
            _li.appendChild( document.createElement( "br" ) );
            _li.appendChild( document.createTextNode( "Description: " + _childData.description ) );
            _li.appendChild( document.createElement( "br" ) );
            _li.appendChild( document.createTextNode( "Price: " + _childData.price ) );
            _li.appendChild( document.createElement( "br" ) );
            _li.appendChild( _button );

            _ul.appendChild( _li );
        } );
    } );
}

/**
 * Delete platillo
 * @param idPlatillo {number}
 */
function deletePlatillos( idPlatillo ) {
    _database.ref( 'alimentos/' + idPlatillo ).remove()
        .then( function succes() {

        } )
        .catch( function error ( e ) {
            console.warn( "error: " + e );
        } )
}
