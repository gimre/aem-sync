
'use strict'

exports = module.exports = (
    config,
    Observable,
    utils,
    Watcher
) => ( {
    watch( ) {

        utils.log( 'deployer' )( 'watching' )
        
        Observable.merge(
            new Watcher( './watched' ),
            new Watcher( './tests' )
        )
        // .do( utils.log( 'deployer' ) )
        // .map( createPackage )
        // .flatMap( installPackage )
        // .do( async ( res ) => log( await res.text( ) ) )
        .subscribe( utils.log( 'deployer' ) )
    }
} )

exports[ '@singleton' ] = true
exports[ '@require' ] = [
    './config',
    './observable',
    './utils',
    './watcher'
]