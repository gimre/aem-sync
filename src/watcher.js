
'use strict'

const { Observable } = require( '@reactivex/rxjs' )

exports = module.exports = (
    chokidar,
    config,
    Observable
) => class extends Observable {
    constructor( path ) {
        super( )

        const { events, options } = config.watcher 
        const watcher = chokidar.watch( path, options )
        const observables = events.map( event =>
            Observable.fromEvent( watcher, event ) )

        this.source = Observable.merge( ... observables )
    }
}

exports[ '@singleton' ] = true
exports[ '@require' ] = [
    'chokidar',
    './config',
    './observable'
]