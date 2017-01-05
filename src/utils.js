
'use strict'

exports = module.exports = (
    debug,
    FormData,
    fetch,
    config
) => {
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

        log: ( topic ) => ( msg ) => debug( `${ prefix }${ topic }` )( msg ),

        postToAem: ( stream ) => {
            console.log( stream )
            const { auth, url }      = config.aem
            const { fileType, name } = config.package
            const filename = `${ name }-${ Date.now( ) }${ fileType }`
            
            const form = new FormData( )
            form.append( 'file',    stream, { filename } )
            form.append( 'force',   true )
            form.append( 'install', true )
            form.append( 'name',    filename )
            form.append( 'strict',  true )

            return fetch( url, {
                method:  'POST',
                body:    form,
                headers: Object.assign( { }, form.getHeaders( ), {
                    Authorization: `Basic ${ auth }`
                } )
            } )
        }

    } 
}

exports[ '@singleton' ] = true
exports[ '@require' ] = [
    'debug',
    'form-data',
    'node-fetch',
    './config'
]
