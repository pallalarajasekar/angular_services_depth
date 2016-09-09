/**
 * Created by pallali on 20/6/16.
 */
(function () {

    var app = angular.module('app', ['ngRoute', 'ngCookies', 'ngResource']);

    app.config(function ($provide) {

        $provide.provider('books',function (constants) {

            this.$get=function () {

                var appName= constants.APP_NAME;
                var appDesc= constants.APP_VERSION;

                return{
                        appName: appName,
                        appDesc: appDesc
                };
            };
        });
    });
    app.config( function ($routeProvider, $logProvider, $httpProvider) {

        //$logProvider.debugEnabled(true);

        //$httpProvider.interceptors.push('bookLoggerInterceptor');

        $routeProvider.when('/', {
                templateUrl:'templates/books.html',
                controller: 'booksController',
                controllerAs: 'books'
            }
        );

        $routeProvider.when('/AddBook',
            {
                templateUrl: 'templates/addBook.html',
                controller: 'addBookController',
                controllerAs: 'bookAdd'
            }
        );
        $routeProvider.when('/EditBook/:bookID',
            {
                templateUrl: 'templates/editBook.html',
                controller: 'editBookController',
                controllerAs: 'editBook',
                /*resolve: {
                    books: function (dataService) {
                        //throw 'error getting books';
                        return dataService.getAllBooks();
                    }
                }*/
            }
        );
       // .otherwise('/')
    });
    app.run(['$rootScope', function ($rootScope) {

        $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
            console.log("roots successfull changed");
        });
        $rootScope.$on('$routeChangeError', function (event, current, previous, rejection) {
            console.log('error changing routes');

            console.log(event);
            console.log(current);
            console.log(previous);
            console.log(rejection);
        });
        
    }])

}());

/*
var app=angular.module('app',['ngRoute'])

 .config( function ($routeProvider) {

    $routeProvider.when('/',
        {
            templateUrl:'templates/books.html',
            controller: 'booksController',
            controllerAs: 'books'
        }
    );

    $routeProvider.when('/AddBook',
        {
            templateUrl: 'templates/addBook.html',
            controller: 'addBookController',
            controllerAs: 'addBook'
        }
    );
});
*/
