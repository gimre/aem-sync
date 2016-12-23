
'use strict'

exports = module.exports = (
    fs,
    path,
    config
) => fs.readdirSync( config.templateRoot ).reduce( ( acc, file ) => {
    const { ext: rawExt, name } = path.parse( file )
    const abs = path.join( config.templateRoot, file )
    const ext = rawExt.substr( 1 ) 
    
    if( ! ( ext in acc ) ) {
        acc[ ext ] = { }
    }
    
    Object.assign( acc[ ext ], {
        [ name ]: fs.readFileSync( abs ).toString( )
    } )

    return acc
}, { } )

exports[ '@singleton' ] = true
exports[ '@require' ] = [
    'fs',
    'path',
    './config'
]