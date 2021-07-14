module.exports = {
    "apps": [
        {
            name : "actboard_server",
            script : "./devServer.js",
            instances: 0,
            exec_mode: 'cluster'
        }
    ]
}