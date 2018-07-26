import * as vsts from 'vso-node-api';
declare const module: any;

module.exports = function (RED) {
    function VSTS_Connection(n) {
        RED.nodes.createNode(this, n);

        this.server_address = n.serverAddress;
        this.server_token = n.serverToken;
        this.server_project = n.serverProject;

        let authHandler = vsts.getPersonalAccessTokenHandler(this.server_token);
        this.connection = new vsts.WebApi(this.server_address, authHandler);

        this.on('close', function (removed, done) {
            done();
        });
    }

    RED.nodes.registerType('vsts-connection', VSTS_Connection);

    function VSTS_Service(n) {
        RED.nodes.createNode(this, n);
        this.configNode = RED.nodes.getNode(n.connection);

        let node = this;
        node.status({fill: 'yellow', shape: 'ring', text: 'Connecting '+node.configNode.server_address});

        setTimeout(function () {
            node.status({fill: 'green', shape: 'dot', text: 'Connected: '+node.configNode.server_address});
        },2000);

        // this.on('input', function (msg) {
        //
        // });

        this.on('close', function (removed, done) {
            done()
        })
    }

    RED.nodes.registerType('vsts-service', VSTS_Service)

};