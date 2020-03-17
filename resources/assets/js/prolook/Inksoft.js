function Inksoft () {
}

Inksoft.funcs = {
    baseUrl: 'https://stores.inksoft.com/ProLook_Sports/Api2',

    getDesignIdeaCategories: function(successHandler, errorHandler) {
        var url = this.baseUrl + '/GetDesignCategories?Format=JSON';
        getJSON(url, successHandler, errorHandler)
    },

    getDesignIdeasByCategory: function(category_id, successHandler, errorHandler) {
        var url = this.baseUrl + '/GetDesignSummaries?DesignCategoryId=' + category_id + '&Format=JSON';
        getJSON(url, successHandler, errorHandler)
    }
}