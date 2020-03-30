// Este código opcional é usado para registrar um service worker.
// register () não é chamado por padrão.

// Isso permite que o aplicativo carregue mais rápido nas visitas subseqüentes na produção e fornece
// recursos off-line. No entanto, isso também significa que os desenvolvedores (e usuários)
// só verão atualizações implantadas em visitas subseqüentes a uma página, depois de todas as
// as abas existentes abertas na página forem fechadas, desde que anteriormente armazenadas em cache
// os recursos são atualizados em segundo plano.

// Para saber mais sobre os benefícios deste modelo e instruções sobre como
// opt-in, leia http://bit.ly/CRA-PWA

const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
    // [::1] é o endereço de localhost IPv6.
    window.location.hostname === '[::1]' ||
     // 127.0.0.1/8 é considerado localhost para o IPv4.
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
);

export function register(config) {
  if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
    // O construtor de URL está disponível em todos os navegadores que suportam SW.
    const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);
    if (publicUrl.origin !== window.location.origin) {
      // Nosso service worker não funcionará se PUBLIC_URL estiver em uma origem diferente
      // de onde nossa página é veiculada. Isso pode acontecer se um CDN for usado para
      // serve assets;
      return;
    }

    window.addEventListener('load', () => {
      const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;

      if (isLocalhost) {
        // Isso está sendo executado no host local. Vamos verificar se um service worker ainda existe ou não.
        checkValidServiceWorker(swUrl, config);

        // Adicione algum log adicional ao localhost, apontando os desenvolvedores para o
        // service worker / PWA documentation.
        navigator.serviceWorker.ready.then(() => {
          console.log(
            'Este aplicativo da web está sendo servido em cache primeiro por um service ' +
              'wroker. Para saber mais, visite http://bit.ly/CRA-PWA'
          );
        });
      } else {
        // não é localhost. Basta registrar o service worker
        registerValidSW(swUrl, config);
      }
    });
  }
}

function registerValidSW(swUrl, config) {
  navigator.serviceWorker
    .register(swUrl)
    .then(registration => {
      registration.onupdatefound = () => {
        const installingWorker = registration.installing;
        if (installingWorker == null) {
          return;
        }
        installingWorker.onstatechange = () => {
          if (installingWorker.state === 'installed') {
            if (navigator.serviceWorker.controller) {
              // Neste ponto, o conteúdo pré-cache atualizado foi buscado,
              // mas o service worker anterior ainda servirá o mais antigo
              // conteúdo até que todas as guias do cliente sejam fechadas.
              console.log(
                'Novo conteúdo está disponível e será usado quando todos' +
                  'guias para esta página estiverem fechadas. See http://bit.ly/CRA-PWA.'
              );

              // Executar retorno de chamada
              if (config && config.onUpdate) {
                config.onUpdate(registration);
              }
            } else {
              // Neste ponto, tudo foi pré-cache.
              // É o momento perfeito para exibir um
              // "O conteúdo é armazenado em cache para uso off-line." mensagem.
              console.log('O conteúdo é armazenado em cache para uso off-line.');

              // Executar retorno de chamada
              if (config && config.onSuccess) {
                config.onSuccess(registration);
              }
            }
          }
        };
      };
    })
    .catch(error => {
      console.error('Erro durante o registro do service worker:', error);
    });
}

function checkValidServiceWorker(swUrl, config) {
  // Verifique se o service worker pode ser encontrado. Se não puder recarregar a página.
  fetch(swUrl)
    .then(response => {
      // Assegure que o service worker exista e que realmente estamos obtendo um arquivo JS.
      const contentType = response.headers.get('content-type');
      if (
        response.status === 404 ||
        (contentType != null && contentType.indexOf('javascript') === -1)
      ) {
        // Nenhum service worker encontrado. Provavelmente um aplicativo diferente. Recarregue a página.
        navigator.serviceWorker.ready.then(registration => {
          registration.unregister().then(() => {
            window.location.reload();
          });
        });
      } else {
         // Service worker encontrado. Continue como normal.
        registerValidSW(swUrl, config);
      }
    })
    .catch(() => {
      console.log(
        'Nenhuma conexão de internet encontrada. App está sendo executado no modo off-line.'
      );
    });
}

export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(registration => {
      registration.unregister();
    });
  }
}
