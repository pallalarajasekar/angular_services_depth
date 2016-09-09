/**
 * Created by pallali on 25/6/16.
 */
(function () {
    angular.module('app')
        .controller('addBookController',['$log', '$location', 'dataService', addBookController]);
    function addBookController($log, $location, dataService) {

        var vm = this;

        vm.newBook = {};

        vm.addBook = function () {

            dataService.addBook(vm.newBook)
                .then(addBookSuccess)
                .catch(addBookError);
        };
        function addBookSuccess(message) {

            $log.info(message);

            $location.path('/');
        }
        function addBookError(errorMessage) {

            $log.error(errorMessage);
        }

    }
}());