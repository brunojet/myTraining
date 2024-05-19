var AppStoreResponseCache;

try {
    AppStoreResponseCache = Class.create();
} catch (ignore) {
    AppStoreResponseCache = function (cacheTableName, chunkSize, maxBacklog) {
        this.cacheTableName = cacheTableName;
        this.chunkSize = (chunkSize ? chunkSize : 100);
        this.maxBacklog = (maxBacklog ? maxBacklog : 20);
        this.gsa = new GlideSysAttachment();
    }
}

AppStoreResponseCache.prototype = {
    /**
     * Initialize the cache.
     */
    initialize: function (cacheTableName, chunkSize, maxBacklog) {
        this.cacheTableName = cacheTableName;
        this.chunkSize = (chunkSize ? chunkSize : 250);
        this.maxBacklog = (maxBacklog ? maxBacklog : 20);
        this.gsa = new GlideSysAttachment();
    },

    /**
     * Get the number of JSON chunks based on the length of the JSON.
     * @param {number} jsonLen - The length of the JSON.
     * @returns {number} The number of JSON chunks.
     */
    getJsonChunks: function (jsonLen) {
        return (jsonLen > this.chunkSize ? Math.ceil(jsonLen / this.chunkSize) : 1);
    },

    /**
     * Remove excess records from the cache table.
     * @param {string} tableName - The name of the table.
     * @param {string} queryHash - The query hash.
     */
    removeExcessRecords: function (tableName, queryHash) {
        var gr = new GlideRecord(this.cacheTableName);
        gr.addQuery('table_name', tableName);
        gr.addQuery('query_hash', queryHash);
        gr.orderBy('sys_created_on');
        gr.query();

        if (gr.getRowCount() > this.maxBacklog) {
            var deleteItens = gr.getRowCount() - this.maxBacklog;

            while (deleteItens-- > 0 && gr.next()) {
                gr.deleteRecord();
            }
        }
    },

    /**
     * Persist the JSON to the cache table.
     * @param {string} tableName - The name of the table.
     * @param {string} queryHash - The query hash.
     * @param {Array} json - The JSON to be persisted.
     */
    persistJsonToCache: function (tableName, queryHash, json) {
        if (!Array.isArray(json)) {
            throw new Error('Input is not a JSON array');
        }

        var gr = new GlideRecord(this.cacheTableName);
        var gsaArray = [];

        try {
            var jRespItens = json.length;

            gr.initialize();

            for (var i = 0; i < this.getJsonChunks(json.length); i++) {
                var fileName = `${(i + 1).toString().padStart(3, '0')}.json`;
                var jRespBegin = (i * this.chunkSize);
                var jRespEnd = jRespBegin + Math.min(jRespItens, this.chunkSize);
                var jResp = json.slice(jRespBegin, jRespEnd);
                var resp = JSON.stringify(jResp);
                var sysId = this.gsa.write(gr, fileName, 'text/plain', resp);

                if (sysId) {
                    jRespItens -= jResp.length;
                    gsaArray.push(sysId);
                    continue;
                }

                throw new Error('Failed to write attachment!');
            }

            gr.setValue('table_name', tableName);
            gr.setValue('query_hash', queryHash);
            gr.insert();
        } catch (error) {
            this.gsa.error("##### AppStoreResponseCache.persistJsonToCache failed: " + error);
            gsaArray.forEach(function (sysId) {
                this.gsa.deleteAttachment(sysId);
            })
        }

        this.removeExcessRecords(tableName, queryHash);
    },

    /**
     * Get the latest record from the cache table.
     * @param {string} tableName - The name of the table.
     * @param {string} queryHash - The query hash.
     * @returns {Array} The latest record.
     */
    getLatestRecord: function (tableName, queryHash) {
        var json = new Array();

        try {
            var gr = new GlideRecord(this.cacheTableName);
            gr.addQuery('table_name', tableName);
            gr.addQuery('query_hash', queryHash);
            gr.orderByDesc('sys_created_on');
            gr.setLimit(1);
            gr.query();

            if (gr.next()) {
                var gra = new GlideRecord('sys_attachment');
                gra.setValue('table_name', gr.table_name);
                gra.setValue('table_sys_id', gr.sys_id);
                gra.orderBy('file_name');
                gra.query();

                while (gra.next()) {
                    var response = gsa.getContent(gra.sys_id);
                    json.concat(JSON.parse(response));
                }
            }
        } catch (error) {
            this.gsa.error("##### AppStoreResponseCache.getLatestRecord failed: " + error);
            json = new Array();
        }

        return json;
    },
    type: 'AppStoreResponseCache'
};

// Export the class
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AppStoreResponseCache;
}