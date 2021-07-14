module.exports = {
    "apps": [
        {
            "name" : "actboard_server",
            "script" : "./sslserver.js",
            "args" : "start",
            "watch" : true,
            "exec_mode": 'cluster'
        }
    ]
}