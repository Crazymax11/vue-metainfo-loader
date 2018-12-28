const request = require('request');
const fs = require('fs');

deploy(
    'devnsk-badger',
    {
        username: process.env.PORTAINER_LOGIN,
        password: process.env.PORTAINER_PASSWORD
    },
    'msosnov/devnsk-badger:latest'
)
    .then(() => console.log(`Сервис devnsk-badger обновлен`))
    .catch(err => {
        console.error(err);
        process.exit(1);
    });

/**
 * Выполняет серию запросов для обновления образа в сервисе в портейнере
 *
 * @param {string} serviceName ui-kit|ui-kit-beta
 * @param {Object} user
 * @param {string} user.username
 * @param {string} user.password
 * @param {string} image имя докер образа
 * @return {Promise}
 */
async function deploy(serviceName, user, image) {
    const { jwt: token } = await makePortainerRequest(
        'POST',
        'http://portainer.msosnov.com/api/auth',
        user
    );
    const { Spec, Version: { Index: CurrentIndex } } = await makePortainerRequest(
        'GET',
        `http://portainer.msosnov.com/api/endpoints/1/docker/services/${serviceName}`,
        {},
        token
    );
    /*
     * Мы не можем просто пульнуть новый Image, нам надо запулить новый стейт сервиса
     * поэтому патчим образ и пулим
     */
    Spec.TaskTemplate.ContainerSpec.Image = image;
    return makePortainerRequest(
        'POST',
        `http://portainer.msosnov.com/api/endpoints/1/docker/services/${serviceName}/update?version=${CurrentIndex}`,
        Spec,
        token
    );
}

/**
 * Делает запрос в portainer и обрабатывает ошибку, если она есть
 *
 * @param {string} method POST|GET
 * @param {string} url
 * @param {Object} body
 * @param {?Object} auth
 * @param {string} auth.username
 * @param {string} auth.password
 * @return {Promise<Object>} body
 */
function makePortainerRequest(method, url, body, auth) {
    return new Promise((resolve, reject) => {
        request(
            {
                method,
                url,
                body,
                json: true,
                auth: auth ? { bearer: auth } : null
            },
            (err, response, responseBody) => {
                if (err) {
                    return reject(err);
                }
                if (
                    response.statusCode !== 200 ||
                    (responseBody &&
                        responseBody.message &&
                        // от портейнера может прилететь код 200 и rpc еррор
                        (responseBody.message.indexOf('rpc error') !== -1 ||
                            // или код 200 и в тексте invalid syntax или что-то вроде этого =\
                            responseBody.message.indexOf('invalid') !== -1))
                ) {
                    return reject(makeError(url, response.statusCode, responseBody.message));
                }

                return resolve(responseBody);
            }
        );
    });
}

/**
 * Создает более менее человекочитаемую ошибку
 *
 * @param {string} url куда ходили, что получили ошибку
 * @param {number} code HTTP Code
 * @param {string} message
 * @return {Error} error
 */
function makeError(url, code, message) {
    return new Error(
        `Ошибка во время выполнения запроса 
url: ${url}
HTTP code: ${code}
message: ${message}`
    );
}
