module.exports = {
    "apps": [
        {
            name : "actboard_sslserver",
            script: "./sslserver.js",
            instances: 0,
            exec_mode: 'cluster'
        }
    ]
}