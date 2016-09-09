/**
 * Created by pallali on 23/6/16.
 */
(function () {
    angular.module('app')
        .factory('dataService', ['$q', '$timeout', '$http', 'constants', dataService]);
    function dataService($q, $timeout, $http, constants) {
        //console.log("enter dataservice");
        return{
            getAllBooks: getAllBooks,
            getAllRenders: getAllRenders,
            getBookByID: getBookByID,
            updateBook: updateBook,
            addBook: addBook,
            deleteBook: deleteBook
        };

        //$Http Service functionality

        function getAllBooks() {

            return $http({
                method:'GET',
                url: 'api/books',
                headers: {
                    'PS-BookLogger-Version' : constants.APP_VERSION
                },
                transformResponse: transformGetBooks
            })
                .then(sendResponseData)
                .catch(sendResponseError);
        }
        function transformGetBooks(data, headresGetter) {
            var transform = angular.fromJson(data);
            transform.forEach(function(currentValue, index, array) {
                currentValue.dateDownloaded = new Date();
            });
            console.log(transform);
            return transform;
        }

        function sendResponseData(response) {

            return response.data;
        }
        function sendResponseError(response) {

            return $q.reject("error retriving : " +response.status);
        }

        function getBookByID(bookID) {

            console.log("book By ID");

            /*return $http({
                method: 'GET',
                url: '/api/books/' + bookID

            })*/

            //$http shortcut Method
            return $http.get('/api/books/' +bookID)

                .then(sendResponseData)
                .catch(sendResponseError);
        }
        function updateBook(book) {

            console.log("update data");
            return $http({
                method: 'PUT',
                url: 'api/books/' +book.book_id,
                data: book
            })
                .then(updateBookSuccess)
                .catch(updateBookError);
        }
        function updateBookSuccess(response) {

            return 'book updated' +response.config.data.title;
        }
        function updateBookError(response) {

            $q.reject('update book eroor' +response.status);
        }

        function addBook(newBook) {

            return $http({
                method: 'POST',
                url: 'api/books',
                data: newBook
            })

            //$http post method Shortcut

            /*return $http.post('/api/books', newBook, {
                transformRequest: transformPostRequest

            })
                .then(addBookSuccess)
                .catch(addBookError)*/
        }
        /*function transformPostRequest(data, headersGetter) {

            data.newBook = true;
            console.log(data);
            return JSON.stringify(data);
        }
        function addBookSuccess(response) {

            return 'added Book' +response.config.data.title;
        }
        function addBookError(response) {

            $q.reject('add Book Error: ' +response.status);
        }*/

        function deleteBook(bookID) {

            return $http({
                method: 'DELETE',
                url: 'api/books/' +bookID,
                
            })
                .then(deleteBookSuccess)
                .catch(deleteBookError);
        }
        function deleteBookSuccess(response) {

            return 'deleted book';
        }
        function deleteBookError(response) {

            $q.reject('delete book error: ' +response.status)

        }



       //$q functionality

        /*function getAllBooks() {
            //console.log("enter all books");
            var booksArray = [
                {
                    'book_id': 1,
                    'title': 'NodeJS',
                    'author': 'pallali',
                    'year': 2000
                },
                {
                    book_id: 2,
                    title: 'Core Java',
                    author: 'ashi',
                    year: 1990
                },
                {
                    book_id: 3,
                    title: 'Javascript',
                    author: 'Harinath',
                    year: 1998
                }

            ];
            var deferred=$q.defer();
            
            $timeout(function () {
                
                var successfull = true;
                if(successfull){
                    deferred.notify('gethering Books');
                    deferred.notify('done gethering books');
                    deferred.resolve(booksArray);
                }
                else {
                    deferred.reject('books retriving error');
                }
            }, 2000);
            
            return deferred.promise;
        }*/


        function getAllRenders() {
            var getRenders = [
                {
                    read_id: 1,
                    name: 'devi',
                    weeklyRead: 50,
                    totalRead: 500
                },
                {
                    read_id: 2,
                    name: 'Rajasekar',
                    weeklyRead: 10,
                    totalRead: 1000
                },
                {
                    read_id: 3,
                    name: 'hari',
                    weeklyRead: 70,
                    totalRead: 750
                }

            ];
            var deferred = $q.defer();
            $timeout(function () {

                deferred.resolve(getRenders);
            }, 4000);
            return deferred.promise;
        }
    }


}());