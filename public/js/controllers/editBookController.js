/**
 * Created by pallali on 25/6/16.
 */
(function () {
    angular.module('app')
        .controller('editBookController', ['$routeParams', 'dataService', 'books', '$cookies', '$cookieStore', '$log', '$location', editBookController]);
    function editBookController($routeParams, dataService, books, $cookies, $cookieStore, $log, $location) {

        var vm = this;
        //console.log("enter edit controller");
        //dataService.getAllBooks()
          //  .then(function (books) {
                /*vm.currentBook = books.filter(function (item) {
                    return item.book_id == $routeParams.bookID;
                })[0];*/
            //});
         
        dataService.getBookByID($routeParams.bookID)
            .then(getBookSuccess)
            .catch(getBookError);

        /*vm.currentBook = BookResource.get({book_id: $routeParams.bookID });
        $log.log(vm.currentBook);*/

        function getBookSuccess(book) {

            vm.currentBook = book;
            $cookieStore.put('lastEdited', vm.currentBook);
        }
        function getBookError(reason) {

            $log.error(reason);
        }

        vm.saveBook = function () {
            dataService.updateBook(vm.currentBook)
                .then(updateBookSuccess)
                .catch(updateBookError);
            
            //$resource code

            /*vm.currentBook.$update();
            $location.path('/');*/
        };
        function updateBookSuccess(message) {
            $log.info(message);
            $location.path('/');
        }
        function updateBookError(errorMessage) {

            $log.error(errorMessage);
        }

        
        vm.setAsFavorite = function () {

            $cookies.favoriteBook = vm.currentBook.title;
        }

       /* $cookieStore.put('lastEdited', vm.currentBook);*/

    }

}());