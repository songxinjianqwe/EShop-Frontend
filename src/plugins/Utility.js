exports.install = function (Vue, options) {
    Vue.prototype.removeUnchangedValue = function (raw, now,necessaryAttr) {
        for (let key in now) {
            if (now[key] === raw[key] && key !== necessaryAttr) {
                delete now[key]
            }
        }
    }
};