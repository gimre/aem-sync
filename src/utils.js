
'use strict'

exports = module.exports = ( debug ) => {
    const log = debug( 'aem-sync' )

    return {
        log
    } 
}

exports[ '@singleton' ] = true
exports[ '@require' ] = [
    'debug'
]
