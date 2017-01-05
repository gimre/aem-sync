
exports = module.exports = (
    path
) => ( {
    aem: {
        proto:   'http',
        host:    'localhost',
        port:    4502,
        service: 'crx/packmgr/service.jsp',
        
        user:  'admin',
        pass:  'admin',

        get auth( ) {
            with( this ) {
                return Buffer
                    .from( `${ user }:${ pass }` )
                    .toString( 'base64' )
            }
        },

        get url( ) {
            with( this ) {
                return `${ proto }://${ host }:${ port }/${ service }`
            }
        }
    },

    env: {
        DEBUG: 'aem-sync' 
    },

    log: {
        prefix: 'aem-sync:'
    },

    package: {
        base: 'jcr_root/',
        fileType: '.zip',
        name: 'aem-sync'
    },

    templateRoot: path.join( __dirname, './templates' ),

    watcher: {
        events: [
            'add',
            'change'
        ],
        options: {
            ignoreInitial: true
        },
        patience: 1000
    }
} )

exports[ '@singleton' ] = true
exports[ '@require' ] = [
    'path'
]
