'use strict';

angular.module('itemStatistic', ['item.service', 'paginator.service']).component('itemStatistic', {
    templateUrl: 'item-statistic/item-statistic.template.html',
    controller: ['Item', 'Pager',
        function ItemStatisticController(Item, Pager) {
            var self = this;
            self.itemsOnPage = 3;
            self.pager = {};
            self.items = Item.query();
            self.stats = [];
            self.displayedStats = [];
            self.items.$promise.then((data) => {
              self.init();
            });
            
            self.init = () => {
                self.parseItems();
                self.setPage(1);
            }

            self.setPage = (page) => {
                if (page < 1 || page > self.pager.totalPages) {
                return;
                }
                
                self.pager = Pager.getPager(self.stats.length, page, self.itemsOnPage);
                self.displayedStats = self.stats.slice(self.pager.startIndex, self.pager.endIndex + 1);
            }

            self.parseItems = () => {
                self.stats = [];
                self.items.forEach((item) => {
                    var filter = self.stats.filter((s) => s.type_name && s.type_name == item.type_name);
                    if(filter.length > 0){
                        filter[0].count++;
                    } else {
                        self.stats.push({
                            type_name: item.type_name,
                            count: 1
                        });
                    }
                });
            }
        }
    ]
});