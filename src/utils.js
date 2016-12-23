
'use strict'

exports = module.exports = ( debug, config ) => {
    const { prefix } = config.log
    return {
        getUniques: ( something ) => {
            try {
                return Array.from( new Set( something ) )
            } catch( ex ) {
                return null
            }
        },
        hasLength: ( { length } ) => length,
        log: ( topic ) => ( msg ) => debug( `${ prefix }${ topic }` )( msg )
    } 
}

exports[ '@singleton' ] = true
exports[ '@require' ] = [
    'debug',
    './config'
]
