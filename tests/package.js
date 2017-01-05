
const { expect } = require( 'chai' )
const ioc        = require( 'electrolyte' )

// init DI
ioc.use( ioc.node_modules( ) )
ioc.use( ioc.dir( './src' ) )

describe( 'Package', ( ) => {
    let instance

    before( ( ) => {
        const Package = ioc.create( './package' )
        instance = new Package( ) 
    } )

    it( 'should be an object', ( ) => {
        expect( instance ).to.be.an( 'object' )
    } )

    it( 'should be a stream', ( ) => {
        const { Stream } = require( 'stream' )
        expect( instance ).to.be.an.instanceOf( Stream )
    } )

    it( 'should be an extractable zip archive' )
    it( 'should contain the META-INF folder' )
    it( 'should contain the META-INF/filter.xml file' )
} )
