export default {
    items: [
        {
            id: 'resources',
            title: 'Recursos',
            type: 'group',
            icon: '',
            children: [
                {
                    id: 'objetos',
                    title: 'Recursos',
                    type: 'collapse',
                    icon: 'fad fa-brackets',
                    children: [
                        {
                            id: 'system',
                            title: 'Sistemas',
                            type: 'item',
                            icon: 'fad fa-browser',
                            url: '/home/recurso/sistema/consulta'
                        },
                        {
                            id: 'services',
                            title: 'Serviços',
                            type: 'item',
                            icon: 'fad fa-cog',
                            url: '/home/recurso/servico/consulta'
                        },
                        {
                            id: 'forms',
                            title: 'Formulários',
                            type: 'item',
                            icon: 'fad fa-ballot-check',
                            url: '/home/recurso/form/consulta'
                        },
                        {
                            id: 'actions',
                            title: 'Ações do usuário',
                            type: 'item',
                            icon: 'fad fa-hand-pointer',
                            url: '/home/recurso/acao/consulta'
                        },
                        {
                            id: 'terminal',
                            title: 'Terminais de acesso',
                            type: 'item',
                            icon: 'fad fa-desktop',
                            url: '/home/recurso/terminalacesso/consulta'
                        },]
                    },
                
            ]
        },
        {
            id: 'security',
            title: 'Segurança',
            type: 'group',
            icon: '',
            children: [
                {
                    id: 'objectSecurity',
                    title: 'Segurança',
                    type: 'collapse',
                    icon: 'fad fa-shield-check',
                    children: [
                        {
                            id: 'accessTime',
                            title: 'Horários de acesso',
                            type: 'item',
                            icon: 'fad fa-clock',
                            url: '/home/seguranca/horarioacesso/consulta'
                        },
                        {
                            id: 'group',
                            title: 'Grupos',
                            type: 'item',
                            icon: 'fad fa-users',
                            url: '/home/seguranca/grupo/consulta'
                        },
                        {
                            id: 'profile',
                            title: 'Perfil',
                            type: 'item',
                            url: '/home/seguranca/perfil/consulta',
                            icon: 'fad fa-address-card'
                        },
                        {
                            id: 'user',
                            title: 'Usuários',
                            type: 'item',
                            url: '/home/seguranca/usuario/consulta',
                            icon: 'fad fa-user'                            
                        }
                    ]
                },
            ]
        },
        {
            id: 'audit',
            title: 'Auditoria',
            type: 'group',
            icon: 'icon-monitor',
            children: [
                {
                    id: 'audit2',
                    title: 'Auditoria',
                    type: 'collapse',
                    icon: 'fad fa-eye',
                    children: [
                        {
                            id: 'accessLog',
                            title: 'Log de acesso',
                            type: 'item',
                            url: '/home/auditoria/logacesso/consulta'
                        }
                    ]
                }
            ]
        }
    ]
}