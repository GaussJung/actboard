module.exports = {
    "apps": [
        {
            name : "actboard_sslserver",
            script: "./server.js",
            instances: 0,
            exec_mode: 'cluster'
        }
    ]
}