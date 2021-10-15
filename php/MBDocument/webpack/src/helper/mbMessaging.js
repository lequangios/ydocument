class MBMessaging {
    static registerMessageHandler(messageId, messageHandler) {
        window.addEventListener('message', function(e) {
            if ((messageId === null) || (messageHandler === null)) {
                return;
            }
            try {
                const message = JSON.parse(e.data);
                if (message.class !== 'mbDocument') {
                    return;
                }
                if (message.requestId !== messageId) {
                    return;
                }
                messageHandler(message);
            } catch (e) {
                // ignore exception
            }
        });
    }

    static setBroadcastMessage(message) {
        if (message != undefined) {
            window.broadcastMessage = message
        }
    }

    static getBroadcastMessage() {
        return window.broadcastMessage
    }

    static clearBroadcastMessage() {
        window.broadcastMessage = undefined
    }

    constructor(requestId) {
        this.__requestId = requestId;
    }

    sendMessage(type, params) {
        const message = {
            class: 'mbDocument',
            type: type,
            requestId: this.__requestId,
        };
        if (params) {
            message.params = params;
        }

        if (window.opener) {
            window.opener.postMessage(JSON.stringify(message), '*');
        } else if (window.parent) {
            window.parent.postMessage(JSON.stringify(message), '*');
        }
    }

    sendCompletedMessage(purchaseData, signature) {
        this.__sendMessage('completed', {
            purchaseData: purchaseData,
            signature: signature,
        });
    }
}

export default MBMessaging