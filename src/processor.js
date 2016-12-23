
'use strict'

exports = module.exports = (
    config,
    Observable,
    utils,
    Watcher
) => ( {
    watch( ) {
        Observable.merge(
            new Watcher( './watched' ),
            new Watcher( './tests' )
        ).subscribe( e => utils.log( e ) )
    }
} )

exports[ '@singleton' ] = true
exports[ '@require' ] = [
    './config',
    './observable',
    './utils',
    './watcher'
]