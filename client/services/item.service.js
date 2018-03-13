'use strict';

angular.module('item.service', ['ngResource']).factory('Item', ['$resource', '$cacheFactory',
    function($resource, $cacheFactory) {
        //var itemCache = $cacheFactory('Item');
        return $resource('api/items');

        /*return $resource('api/items', {}, {
            'get': { method:'GET', cache: itemCache},
            'query': { method:'GET', cache: itemCache, isArray:true }
        });*/
    }
]);