/**
 * Dependency
 * - jquery
 * - X-CSRF-TOKEN - to avoid token mismatch
 */

function MaterialApi(api_host) {
    this.api_host = "https://" + api_host;
    this._token = $('meta[name="csrf-token"]').attr('content');
}

MaterialApi.prototype = {
    /**
     * Get the material
     *
     * @param {int} material_id
     * @param {function} callback
     * @return {void}
     */
    getMaterial: function(material_id, callback) {
        var params = {
            _token: this._token,
            material_id: material_id
        };

        $.get(this.api_host + "/api/material/" + material_id, params, callback);
    }
};