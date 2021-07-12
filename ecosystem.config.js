module.exports = {
    apps: [{
        name: 'actboard',
        script: './server.js',
        instances: 0,
        exec_mode: 'cluster',
        merge_logs: true
    }]
}