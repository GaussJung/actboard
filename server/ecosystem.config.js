module.exports = {
    "apps": [
        {
            name : "actboard_server",
            script : "./server.js",
            instances: 0,
            exec_mode: 'cluster'
        }
    ]
}