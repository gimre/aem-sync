'use strict'

const chokidar       = require( 'chokidar' )
const { Observable } = require( '@reactivex/rxjs' )

const {
    convertToSet,
    createPackage,
    eventIs,
    hasLength,
    installPackage,
    log
} = require( './utils' )

const watcher    = chokidar.watch( './watched', { ignoreInitial: true } )

const fileEvents = Observable.merge(
    Observable.fromEvent( watcher, 'add' ),
    Observable.fromEvent( watcher, 'change' )
)

fileEvents
    .buffer( fileEvents.debounce( x => Observable.timer( 1000 ) ) )
    .filter( hasLength )
    .map( convertToSet )
    .do( log )
    .map( createPackage )
    .flatMap( installPackage )
    .do( async ( res ) => log( await res.text( ) ) )
    .subscribe( )