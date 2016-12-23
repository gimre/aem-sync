
'use strict'

exports = module.exports = (
    archiver,
    fs,
    path,
    config,
    Observable,
    // templates
) => class extends Observable {
    constructor( paths = [ ] ) {
        super( ) 

        // create the archive 
        const zip = archiver( 'zip' )

        // extend the instance
        Object.assign( this, {
            source: zip,
            paths,
            zip
        } )

        // append meta files
        for( let [ name, contents ] of this.getMetaFiles( ) ) {
            zip.append( contents , { name } )
        }
        
        // package files
        paths.forEach( path =>
            zip.file( path, { name: config.package.base + path } ) )

        // close the archive
        zip.finalize( )
    }

    getMetaFiles( ) {
        const now = Date.now( )
        return new Map( )
            .set( 'META-INF/vault/filter.xml', [
                '<?xml version="1.0" encoding="UTF-8"?>',
                '<workspaceFilter version="1.0">',
                ... ( this.paths.map( path => `<filter root="/${ path }"/>` ) ),
                '</workspaceFilter>'
            ].join( '' ) )
    }

    writeTo( name ) {
        const abs = path.join( process.cwd( ), name + config.package.fileType )
        return this.zip.pipe( fs.createWriteStream( abs ) )
    }
}

exports[ '@singleton' ]
exports[ '@require' ] = [
    'archiver',
    'fs',
    'path',
    './config',
    './observable',
    // './templates'
]