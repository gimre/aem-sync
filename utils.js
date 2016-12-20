
'use strict'

const archiver = require( 'archiver' )
const FormData = require( 'form-data')
const fs       = require( 'fs' )
const fetch    = require( 'node-fetch' )

const archiveBase = 'jcr_root/'
const packageUrl  = 'http://localhost:4502/crx/packmgr/service.jsp'

exports = module.exports = {
    convertToSet:
        ( values ) => new Set( values ),
    createPackage:
        ( paths ) => {
            const zipper = archiver( 'zip' )

            // add files
            paths.forEach( path => {
                zipper.file( path, { name: archiveBase + path } )
            } )

            // add meta inf
            zipper.append( 'META-INF' )

            zipper.finalize( )

            return zipper
        },
    eventIs:
        ( ... candidates ) =>
            ( { event } ) => candidates.some( c => c === event ),
    hasLength:
        ( values ) => !! values.length,
    installPackage:
        ( archiveStream ) => {
            const form = new FormData( )

            form.append( 'file', archiveStream, { filename: 'package-' + Date.now( ) + '.zip' } )
            form.append( 'install', 'false' )
            form.append( 'name', 'package-' + Date.now( ) + '.zip' )
            form.append( 'strict', 'true' )

            return fetch( packageUrl, {
                method: 'POST',
                body: form,
                headers: Object.assign( { }, form.getHeaders( ), {
                    Authorization: `Basic ${ Buffer.from( 'admin:admin' ).toString( 'base64' ) }`
                } )
            } )
        },
    log:
        ( ... values ) => console.log( ... values )
}
