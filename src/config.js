
exports = module.exports = ( ) => {
    const config = {
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

        env: {
            DEBUG: 'aem-sync' 
        },

        watcher: {
            options: {
                ignoreInitial: true
            },
            events: [
                'add',
                'change'
            ]
        },

        debounceTime: 1000
    }

    // write env configuration
    Object.assign( process.env, config.env )

    return config
}

exports[ '@singleton' ] = true
exports[ '@require' ] = [ ]