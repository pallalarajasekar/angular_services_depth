/**
 * Created by pallali on 24/6/16.
 */
(function () {
    angular.module('app')
        .service('logger', bookAppLogger);
    function loggerBase() {
    }
    loggerBase.prototype.output=function (message) {

        console.log('loggerBase: '+message);
    }
    function bookAppLogger() {
        loggerBase.call(this);
        this.logBook=function (book) {
            console.log('book' +book.title);
        }
    }
    bookAppLogger.prototype=Object.create(loggerBase.prototype);
}());