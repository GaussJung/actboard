module.exports = {
    "apps": [
        {
            "name" : "actboard_client",
            "script" : "node_modules/.bin/react-scripts start",
            "args" : "start",
            "watch" : true,
            "exec_mode": 'cluster'
        }
    ]
}