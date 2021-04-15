const { Plugin } = require('powercord/entities');
const { get } = require('powercord/http');

const Settings = require('./Settings.jsx');

module.exports = class HttpCat extends Plugin {
    async startPlugin() {
        powercord.api.settings.registerSettings('http-cat', {
            category: this.entityID,
            label: 'Http Cat',
            render: Settings
        });

        powercord.api.commands.registerCommand({
            command: 'http-cat',
            description: 'Automatically sets up an http cat image link',
            usage: '{c} code',
            executor: async (args) => {
                const appendJpg = this.settings.get('jpg', false);

                if (args.length != 1) {
                    return {
                        send: false,
                        result: `Invalid arguments. Run \`${powercord.api.commands.prefix}help http-cat}\` for more info.`
                    };
                }

                let res;
                
                try {
                    let url = `https://http.cat/${args[0]}${(appendJpg ? ".jpg" : "")}`
                    res = await get(url);
                } catch (err) {
                    console.log(err.name);
                    if (err.name == "HTTP Error: 404 Not Found") {
                        return {
                            send: false,
                            result: "That status code doesn't exist!"
                        }
                    } else {
                        return {
                            send: false,
                            result: "An unknown error occured!"
                        }
                    }
                }

                if (res.statusCode == 200) {
                    return {
                        send: true,
                        result: url
                    }
                } else {
                    return {
                        send: false,
                        result: "An unknown error occured!"
                    }
                }
            }
        })
    }

    pluginWillUnload() {
        powercord.api.settings.unregisterSettings('http-cat');
        powercord.api.commands.unregisterCommand('http-cat');
    }
}