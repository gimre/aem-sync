
'use strict'

exports = module.exports = (
    config,
    Observable,
    Package,
    utils,
    Watcher
) => ( {
    watch( ) {

        utils.log( 'deployer' )( 'watching' )

        Observable.merge(
            new Watcher( './watched' ),
            new Watcher( './tests' )
        )
        .do( utils.log( 'deployer' ) )
        .map( paths  => new Package( paths ) )
        .map( bundle => bundle.writeTo( 'plm' ) )
        // .do( async ( res ) => log( await res.text( ) ) )
        .subscribe( )
    }
} )

exports[ '@singleton' ] = true
exports[ '@require' ] = [
    './config',
    './observable',
    './package',
    './utils',
    './watcher'
]