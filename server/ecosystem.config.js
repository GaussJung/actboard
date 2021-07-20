module.exports = {
    "apps": [
        {
            name : "actboard_server",
            script : "./start.js",
            instances: 0,
            exec_mode: 'cluster'
        }
    ]
}