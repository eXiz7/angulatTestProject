'use strict';

angular.module('paginator.service', []).factory('Pager',
    function PagerService() {

        this.getPager = function(totalItems, currentPage, pageSize) {
            currentPage = currentPage || 1;
            pageSize = pageSize || 3;

            var totalPages = Math.max(Math.ceil(totalItems / pageSize), 1);

            var startPage, endPage;
            if (totalPages <= 10) {

                startPage = 1;
                endPage = totalPages;
            } else {

                if (currentPage <= 6) {
                    startPage = 1;
                    endPage = 10;
                } else if (currentPage + 4 >= totalPages) {
                    startPage = totalPages - 9;
                    endPage = totalPages;
                } else {
                    startPage = currentPage - 5;
                    endPage = currentPage + 4;
                }
            }


            var startIndex = (currentPage - 1) * pageSize;
            var endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);
            
            var pages = Array.from(new Array(endPage + 1 - startPage), (x, i) => i + startPage);

            return {
                totalItems: totalItems,
                currentPage: currentPage,
                pageSize: pageSize,
                totalPages: totalPages,
                startPage: startPage,
                endPage: endPage,
                startIndex: startIndex,
                endIndex: endIndex,
                pages: pages
            };
        }
        return this;
    }
);