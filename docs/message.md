# Message
Represents a message emitted from the Client
## Methods
  - ```js
    /** DELETE
     * 
     * Attempts to delete this message
     */
    async delete() {
    ```

  - ```js 
    /** REPLY
     * 
     * Replys to a sent message
     * @param content String The message you're replying with
     * @param type The message type
     * @param attachment Buffer Raw attachment data
     */
    async reply(content: string, type = 0, attachment: null = null): Promise<Message> { // ...
    ```

## Properties:
```ts
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
```