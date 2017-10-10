
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
 * Auth firebase object
 * @private
 */
var _auth = firebase.auth();

/**
 * Referencie alimentos table
 * @private
 */
var _refAlimentosTable = _database.ref( 'alimentos/' );

/**
 * Referencie alimentos table
 * @private
 */
var _refBebidasTable = _database.ref( 'bebidas/' );

/**
 * Add new platillo
 * @param name {string}
 * @param description {string}
 * @param price {number}
 * @param imgDir {string}
 * @private
 */
var _createPlatilloDatabase = function( name, description, price, imgDir ){
    _database.ref('alimentos')
        .push({
            name: name,
            description: description,
            price: price,
            cantidad: 0,
            img : imgDir
        })
        .then( function success() {
            window.location = "addPlatillo.html";
        } )
        .catch( function error( e ) {
            console.warn( e );
        } );
};

/**
 * Add new bebida
 * @param name {string}
 * @param description {string}
 * @param price {number}
 * @param imgDir {string}
 * @private
 */
var _createBebidaDatabase = function( name, description, price, imgDir ){
    _database.ref('bebidas')
        .push({
            name: name,
            description: description,
            price: price,
            cantidad: 0,
            img : imgDir
        })
        .then( function success() {
            window.location = "addBebida.html";
        } )
        .catch( function error( e ) {
            console.warn( e );
        } );
};

/**
 * Create platillo
 * @param event
 * @returns {boolean}
 */
function addPlatillo( event ) {
    event.preventDefault();

    var _name = document.getElementById( "name" ).value;
    var _description = document.getElementById( "description" ).value;
    var _price = document.getElementById( "price" ).value;
    var _imgDir = document.getElementById( "imgDir" ).value;

    _createPlatilloDatabase( _name, _description, _price, _imgDir );

    return false;
}

/**
 * Create bebida
 * @param event
 * @returns {boolean}
 */
function addBebida( event ) {
    event.preventDefault();

    var _name = document.getElementById( "name" ).value;
    var _description = document.getElementById( "description" ).value;
    var _price = document.getElementById( "price" ).value;
    var _imgDir = document.getElementById( "imgDir" ).value;

    _createBebidaDatabase( _name, _description, _price, _imgDir );

    return false;
}

/**
 * View image the input file
 * @param src {string}
 */
function viewImg( src ) {
    var _src = "";
    var _preview = document.querySelector( 'img' );
    var _file = document.querySelector( 'input[type=file]' ).files[0];
    var _lector = new FileReader();
    _lector.onloadend= function () {
        _preview.src = _lector.result;
    }
    if ( _file ) {
        _lector.readAsDataURL( _file );
        if( src == "platillo" ){
            _src = "platillos/";
        }else if( src == "bebida" ){
            _src = "bebidas/";
        }
        var _putImg = _storageRef.child( _src + _file.name ).put( _file );
        _putImg.on( "state_changed", function ( snapshot ) {
            //change on load the file
            
        }, function error ( e ) {
            //error in the load file
            console.warn(e);
        }, function success () {
            //success load file
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
 * Get bebidas
 */
function getBebidas() {
    _refBebidasTable.on( "value", function ( snapshot ) {
        snapshot.forEach( function ( childSnapshot ) {
            var _ul = document.getElementById( "lista" );
            var _childKey = childSnapshot.key;
            var _childData = childSnapshot.val();
            var _li = document.createElement( "li" );
            var _div = document.createElement( "div" );
            var _img = document.createElement( "img" );
            var _button = document.createElement( "button" );

            _button.setAttribute( "id", _childKey );
            _button.setAttribute( "onclick", "deleteBebidas( this.id )" );
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
            window.location = "platillos.html";
        } )
        .catch( function error ( e ) {
            console.warn( "error: " + e );
        } )
}

/**
 * Delete bebida
 * @param idBebida {number}
 */
function deleteBebidas( idBebida ) {
    _database.ref( 'bebidas/' + idBebida ).remove()
        .then( function succes() {
            window.location = "bebidas.html";
        } )
        .catch( function error ( e ) {
            console.warn( "error: " + e );
        } )
}

/**
 * Create user admin
 * Use this method when you create user in firebase
 */
function createUserAdmin() {
    _auth.createUserWithEmailAndPassword("admin@restaurant.com", "admin123").catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.warn( error );
        // ...
    });
}

/**
 * Login auth with firebase
 */
function login() {
    var email = document.getElementById( "email" ).value;
    var password = document.getElementById( "pass" ).value;

    _auth.signInWithEmailAndPassword(email, password)
        .then( function success()  {
            window.location = "addPlatillo.html";
        } )
        .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.warn( error );
        // ...
    });
}

// observer
_auth.onAuthStateChanged(function(user) {
    if (user) {
        // User is signed in.
    } else {
        // No user is signed in.
        if( window.location.pathname !== "/index.html" ){
            window.location = "index.html";
        }
    }
});

function signOut() {
    _auth.signOut().then(function() {
        // Sign-out successful.
        window.location = "index.html";
    }).catch(function(error) {
        // An error happened.
        console.warn( error );
    });
}
