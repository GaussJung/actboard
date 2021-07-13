module.exports = {
    "apps": [
        {
            "name" : "actboard_server",
            "script" : "./server.js",
            "args" : "start",
            "watch" : true,
            "exec_mode": 'cluster'
        }
    ]
}