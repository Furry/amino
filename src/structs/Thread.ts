import { GenericObject } from "../api/RequestBuilder";
import { BaseClient } from "../client/BaseClient";
import { Message } from "./Message";

import FileType from "file-type"
import { LibError, LibErrors } from "../errors/LibError";

export class Thread {
    constructor(public client: BaseClient, data: GenericObject) {
        Object.assign(this, data)
    }

    /** GET DM
     * 
     * If this thread is a DM or not
     */
    get dm(): boolean {
        return this.type == 0 ? true : false
    }

    /** SEND
     * 
     * Sends a message and or image to the current thread.
     * @param content String the data you want to send
     */
    async send(content: string): Promise<Message> {
        const res = await this.client.elevator.request
            .setEndpoint(`chat/thread/${this.threadId}/message`)
            .setMethod("POST")
            .setBody({
                type: 0,
                content: content,
                attachedObject: null,
            })
            .send("json")
        return new Message(this.client, res)
    }

    /** SENDIMAGEFILE
     * 
     * Send an image to the thread
     * @param attachment Buffer the raw image data
     */
    async sendImageFile(attachment: Buffer): Promise<Message> {
        const mimeType = await FileType.fromBuffer(attachment)
        const res = await this.client.elevator.request
            .setEndpoint(`chat/thread/${this.threadId}/message`)
            .setMethod("POST")
            .setBody({
                type: 0,
                content: null,
                attachedObject: null,
                mediaUploadValueContentType: mimeType ? mimeType.mime : "image/png",
                mediaUploadValue: attachment.toString("base64")
            })
            .send("json")
        return new Message(this.client, res)
    }

    /** SENDAUDIOFILE
     * 
     * Send an audio file to the thread
     * @param attachment Bufer the raw audio data
     */
    async sendAudioFile(attachment: Buffer): Promise<Message> {
        const res = await this.client.elevator.request
            .setEndpoint(`chat/thread/${this.threadId}/message`)
            .setMethod("POST")
            .setBody({
                type: 2,
                mediaType: 110,
                content: null,
                mediaUploadValue: attachment.toString("base64")
            })
            .send("json")
        return new Message(this.client, res)
    }

    /** JOIN
     * 
     * Joins this thread
     */
    async join(): Promise<Thread> {
        const res = await this.client.elevator.request
            .setEndpoint(`chat/thread/${this.threadId}/member/${this.client.account.uid}`)
            .setMethod("POST")
            .send("json")
        if (res.membershipStatus == 1) {
            return await this.client.fetchThread(this.threadId)
        } else {
            throw new LibError(LibErrors.COUDLNOTJOIN)
        }
    }

    
}

/* START OF TYPINGS */
export interface Thread {
    userAddedTopicList: any[];
    uid: string;
    membersQuota: number;
    membersSummary: MembersSummary[];
    threadId: string;
    keywords: string;
    membersCount: number;
    strategyInfo: string;
    isPinned: boolean;
    title: string;
    tipInfo: TipInfo;
    membershipStatus: number;
    content: string;
    needHidden: boolean;
    alertOption: number;
    lastReadTime: Date;
    type: number;
    status: number;
    publishToGlobal: number;
    modifiedTime?: any;
    lastMessageSummary: LastMessageSummary;
    condition: number;
    icon: string;
    latestActivityTime: Date;
    author: Author;
    extensions: Extensions2;
    ndcId: number;
    createdTime?: any;
}

export interface MembersSummary {
    status: number;
    uid: string;
    membershipStatus: number;
    role: number;
    nickname: string;
    icon: string;
}

export interface TipOptionList {
    value: number;
    icon: string;
}

export interface TipCustomOption {
    value?: any;
    icon: string;
}

export interface TipInfo {
    tipOptionList: TipOptionList[];
    tipMaxCoin: number;
    tippersCount: number;
    tippable: boolean;
    tipMinCoin: number;
    tipCustomOption: TipCustomOption;
    tippedCoins: number;
}

export interface Extensions {
    replyMessageId: string;
}

export interface LastMessageSummary {
    uid: string;
    type: number;
    mediaType: number;
    content: string;
    extensions: Extensions;
    messageId: string;
    createdTime: Date;
    isHidden: boolean;
    mediaValue?: any;
}

export interface Author {
    status: number;
    isNicknameVerified: boolean;
    uid: string;
    level: number;
    followingStatus: number;
    accountMembershipStatus: number;
    isGlobal: boolean;
    membershipStatus: number;
    reputation: number;
    role: number;
    ndcId: number;
    membersCount: number;
    nickname: string;
    icon: string;
}

export interface ScreeningRoomPermission {
    action: number;
    uidList: any[];
}

export interface Extensions2 {
    viewOnly: boolean;
    coHost: string[];
    language: string;
    membersCanInvite: boolean;
    screeningRoomPermission: ScreeningRoomPermission;
    bm: any[];
    avchatMemberUidList: string[];
    creatorUid: string;
    visibility: number;
    bannedMemberUidList: string[];
    lastMembersSummaryUpdateTime: number;
    fansOnly: boolean;
    announcement: string;
    channelType: number;
    pinAnnouncement: boolean;
    vvChatJoinType: number;
}