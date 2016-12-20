
exports = module.exports = ( ) => ( {
    aem: {
        proto:   'http',
        host:    'localhost',
        port:    4502,
        service: 'crx/packmgr/service.jsp',
        
        user:  'admin',
        pass:  'admin',

        get url( ) {
            with( this ) {
                return `${ proto }://${ host }:${ port }/${ service }`
            }
        }
    },

    debounceTime: 1000
} )

exports[ '@singleton' ] = true
exports[ '@require' ] = [ ]