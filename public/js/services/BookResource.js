/**
 * Created by pallali on 28/6/16.
 */
(function () {
   angular.module('app')
       .factory('BookResource', BookResource);

    function BookResource($resource) {

        consoloe.log('resource data');

        return $resource('/api/books/:book_id', {book_id: '@book_id'},
            {
                'update': {method: 'PUT'}
            }
        );

    }
});