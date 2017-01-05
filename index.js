'use strict'

const ioc = require( 'electrolyte' )
ioc.use( ioc.node_modules( ) )
ioc.use( ioc.dir( './src' ) )

exports = module.exports = ioc.create( './deployer' )
