const dir = `${__dirname}/..`;



module.exports = {
    dir: {
        public     : dir+"/public",
        storage    : dir+"/storage",
        app        : dir+"/app",
        controller : dir+"/app/controllers",
        view       : dir+"/app/views",
    },
    port     : 3000,
    base_url : "http://localhost"
}