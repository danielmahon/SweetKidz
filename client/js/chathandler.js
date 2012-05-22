define(function() {

    var ChatHandler = Class.extend({

        init: function(game) {
            this.self = this;
            this.game = game;
        },

        /**
         * Process a sent message.
         *
         * @param string message
         * @param boolean send
         */
        processSendMessage: function(message) {
            return this.processMessage(null, message, 'senders');
        },

        /**
         * Processes a received message.
         *
         * @param string message
         */
        processReceiveMessage: function(entityId, message) {
            return this.processMessage(entityId, message, 'receivers');
        },

        /**
         * Calls a registered command pattern callback.  Returns true if a callback occurs.
         *
         * @param string message
         * @param string type
         */
        processMessage: function(entityId, message, type) {
            var pattern = message.substring(0, 3),
                self = this,
                commandPatterns = {
                    senders: {
                        // World chat
                        "/w ": function(message) {
                            self.game.client.sendChat("/w " + self.game.player.name + ": " + message);
                            return true;
                        }
                    },
                    receivers: {
                        // World chat
                        "/w ": function(entityId, message) {
                            messageId = Math.floor(Math.random() * 10000);
                            self.game.createBubble(messageId, message);
                            self.game.assignGlobalBubble(messageId);
                            return true;
                        }
                        // ,
                        // // Teleport
                        // "/t ": function(entityId, message) {
                        	// console.log('==TELEPORT==');
                        	// console.log(message);
                        	// console.log(entityId);
                        	// console.log(this);
                        	// console.log(self);
                        	// return false;
                            // choords = message.split(',');
                            // x = parseInt(choords[0]);
                            // y = parseInt(choords[1]);
                            // self.game.player.setGridPosition(x, y);
                            // self.game.player.nextGridX = x;
                            // self.game.player.nextGridY = y;
                            // self.game.client.sendTeleport(x, y);
                            // self.game.resetCamera();
                            // return true;
                        // }
                    }
                };
            if (pattern in commandPatterns[type]) {
                if (typeof commandPatterns[type][pattern] == "function") {
                    switch(type) {
                        case 'senders':
                            return commandPatterns[type][pattern](message.substring(3));
                        case 'receivers':
                            return commandPatterns[type][pattern](entityId, message.substring(3));
                    }
                    
                }
            }
            return false;
        }

    });

    return ChatHandler;

});