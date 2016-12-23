
'use strict'

exports = module.exports = ( debug, config ) => {
    const { prefix } = config.log
    return {
        convertToSet: ( something ) => {
            try {
                return new Set( something )
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
