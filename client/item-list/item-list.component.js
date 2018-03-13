'use strict';

angular.module('itemList', ['item.service', 'paginator.service']).component('itemList', {
    templateUrl: 'item-list/item-list.template.html',
    controller: ['Item', 'Pager',
      function ItemListController(Item, Pager) {
        var self = this;
        self.itemName = "";
        self.itemType = "";
        self.itemsOnPage = 4;
        self.pager = {};
        self.items = Item.query();
        self.displayedItems = [];
        self.items.$promise.then((data) => {
          self.init(data);
        });

        self.init = (data) => {
          if(data && data.length > 0){
            data.forEach((item) => {
              item.isEditing = false;
              item.isSaving = false;
            });
          }
          self.setPage(1);
        }

        self.setPage = (page) => {
          if (page < 1 || page > self.pager.totalPages) {
            return;
          }
          
          self.pager = Pager.getPager(self.items.length, page, self.itemsOnPage);
          self.displayedItems = self.items.slice(self.pager.startIndex, self.pager.endIndex + 1);
        }

        self.isAbleToAdd = () => {
          return (self.itemName.length > 0 && self.itemType.length > 0);
        }

        self.isAbleToEdit = (item) => {
          return (item.item_name.length > 0 && item.type_name.length > 0);
        }

        self.delete = (item) => {
          Item.delete(item, (res) => {
          });
          self.items.splice(self.items.indexOf(item),1);
          self.setPage(self.pager.currentPage);
        }

        self.edit = (item) => {
          item.isEditing = true;
        }

        self.save = (item) => {
          if(!self.isAbleToEdit(item)) return;
          item.isEditing = false;
          Item.save(item,(res) => {

          });
        }

        self.add = (item) => {
          if(!self.isAbleToAdd()) return;
          Item.save({
            item_name: self.itemName,
            type_name: self.itemType
          },(res) => {
            self.items.push({
              item_id: res.item_id,
              item_name: res.item_name,
              type_name: res.type_name
            });
            self.setPage(self.pager.currentPage);
          });
          self.itemName = "";
          self.itemType = "";
        }
      }
    ]
  });
