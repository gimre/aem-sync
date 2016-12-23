
'use strict'

const { Observable } = require( '@reactivex/rxjs' )

exports = module.exports = (
    chokidar,
    config,
    Observable,
    utils
) => class extends Observable {

    constructor( path ) {
        super( )

        const {
            events,
            options,
            patience
        } = config.watcher

        const {
            getUniques,
            hasLength
        } = utils

        // initialize fs watcher
        const watcher     = chokidar.watch( path, options )
        
        // map all events to an Observable and merge them
        const aggregated = events.reduce( ( acc, event ) => {
            return acc.merge( Observable.fromEvent( watcher, event ) )
        }, Observable.empty( ) )

        this.source = aggregated
            .buffer( aggregated.debounce( _ => Observable.timer( patience ) ) )
            .filter( hasLength )
            .map( getUniques )
    }
    
}

exports[ '@singleton' ] = true
exports[ '@require' ] = [
    'chokidar',
    './config',
    './observable',
    './utils'
]