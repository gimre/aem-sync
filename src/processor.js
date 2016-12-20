
'use strict'

exports = module.exports = (
    config,
    watcher
) => ( {
    watch( ) {
        console.log( config.aem.url )
    }
} )

exports[ '@singleton' ] = true
exports[ '@require' ] = [
    './config'
]