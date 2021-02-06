import { GenericObject } from "../api/RequestBuilder";
import { BaseClient } from "../client/BaseClient";
import { LibError, parseLibErrorCode } from "../errors/LibError";
import { Profile } from "./Profile";
import { Thread } from "./Thread";

export class Message {
    constructor(public client: BaseClient, data: GenericObject) {
        const arangement = {
            ...data.chatMessage,
            profile: client.users.get(data.chatMessage ? data.chatMessage.author.uid : data.message),
            thread: client.threads.get(data.chatMessage ? data.chatMessage.threadId : data.message.threadId)
        }
        Object.assign(this, arangement)
    }

    /** DELETE
     * 
     * Attempts to delete this message
     */
    async delete() {
        if (this.thread.extensions.coHost.includes(this.client.account.uid) || this.thread.author.uid == this.client.account.uid) {
            await this.client.elevator.request
                .setEndpoint(`chat/thread/${this.threadId}/message/${this.messageId}`)
                .setMethod("DELETE")
                .send()
        } else {
            throw new LibError(parseLibErrorCode(2))
        }
    }

    /** REPLY
     * 
     * Replys to a sent message
     * @param content String The message you're replying with
     * @param type The message type
     * @param attachment Buffer Raw attachment data
     */
    async reply(content: string, type = 0, attachment: null = null): Promise<Message> {
        const res = await this.client.elevator.request
            .setEndpoint(`chat/thread/${this.threadId}/message`)
            .setMethod("POST")
            .setBody({
                type: type,
                content: content,
                attachedObject: attachment,
                replyMessageId: this.messageId
            })
            .send("json")
        return new Message(this.client, res)
    }
}

/* START OF TYPINGS */
export interface Message {
    "author": Profile,
    "thread": Thread,
    "threadId": string,
    "mediaType": number,
    "content": string,
    "clientRefId": number,
    "messageId": string,
    "uid": string,
    "createdTime": string,
    "type": number,
    "isHidden": boolean,
    "includedInSummary": boolean,
    "extensions": {}
}