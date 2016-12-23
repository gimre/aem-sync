
'use strict'

exports = module.exports = (
    archiver,
    fs,
    path,
    config,
    Observable
) => class extends Observable {
    constructor( paths = [ ] ) {
        super( ) 

        // create the archive 
        const zip = archiver( 'zip' )

        // append meta files
        for( let [ name, contents ] of this.getMetaFiles( ) ) {
            zip.append( contents , { name } )
        }
        
        // package files
        paths.forEach( path =>
            zip.file( path, { name: config.package.base + path } ) )

        // close the archive
        zip.finalize( )

        // extend the instance
        Object.assign( this, {
            source: zip,
            zip
        } )
    }

    getMetaFiles( ) {
        const now = Date.now( )
        return new Map( )
            .set( 'META-INF/MANIFEST.MF', [
                'Manifest-Version: 1.0',
                'Created-By: aem-sync',
                'Built-By: gabrielimre',
                'Build-Jdk: 1.8.0_92',
                'Specification-Title: plm',
                `Specification-Version: ${ now }`,
                'Implementation-Title: pm',
                `Implementation-Version: ${ now }`,
                'Implementation-Vendor-Id: aem.sync'
            ].join( '\n' )

)
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
    './observable'
]