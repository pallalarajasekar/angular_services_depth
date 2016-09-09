/**
 * Created by pallali on 20/6/16.
 */
(function () {
    angular.module('app')
        .controller('booksController', booksController);

    function booksController(books, dataService, logger, $q, $cookies, $cookieStore, $route, $log) {
        
        var vm = this;

        vm.appName = books.appName;

        //$resource Service code

        //vm.allBooks = BookResource.query();

        var booksPromise = dataService.getAllBooks();
        var rendersPromise = dataService.getAllRenders();

        $q.all([booksPromise, rendersPromise])
            .then(getAllData)
            .catch(getAllError);

        function getAllData(dataArray) {
            vm.allBooks = dataArray[0];
            vm.allRenders = dataArray[1];
        }

        function getAllError(reason) {
            console.log(reason);
        }

        //console.log("enter controller");
        //vm.allBooks = dataService.getAllBooks();

        /*dataService.getAllBooks()
            .then(getBooksSuccess, null, getBookNotification)
            .catch(getError)
            .finally(getCompleted);
        function getBooksSuccess(books) {
            //throw 'error Handled';
            vm.allBooks = books;
        }
        function getBooksError(reason) {
            console.log(reason);
        }
        function getBookNotification(notification) {
            console.log('promise notification: ' +notification);
        }
        function getError(error) {
            console.log("error: " +error);
        }
        function getCompleted() {
            console.log("get all books completed");
        }

        //vm.allRenders = dataService.getAllRenders();

        dataService.getAllRenders()
            .then(getRenderSuccess)
            .catch(getRenderError)
            .finally(getRenderCompleted);
        function getRenderSuccess(render) {
            vm.allRenders=render;
        }
        function getRenderError(error) {
            console.log('error: ' +error);
        }
        function getRenderCompleted() {
            console.log('get all renders completed');
        }*/

        vm.deleteBook = function (bookID) {

            dataService.deleteBook(bookID)
                .then(deleteBookSuccess)
                .catch(deleteBookError);
        };
        function deleteBookSuccess(message) {

            $log.info(message);
            $route.reload();
        }
        function deleteBookError(errorMessage) {

            $log.error(errorMessage);
        }

        logger.output("bookController is created!");

        vm.favoriteBook = $cookies.favoriteBook;

        vm.lastEdited = $cookieStore.get('lastEdited');
    }

}());