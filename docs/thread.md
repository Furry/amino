# Thread
Represents a thread/channel, either DM or Public.

## Getters:
  - ```ts
     /** GET DM
     * 
     * If this thread is a DM or not
     */
    get dm(): boolean { // ...
    ```

## Methods:
  - ```ts
    /** SEND
     * 
     * Sends a message and or image to the current thread.
     * @param content String the data you want to send
     * @param type Number The message type
     * @param attachment Buffer The raw image data
     */
    async send(content: string | null, attachment?: Buffer): Promise<Message> { // ...
    ```

  - ```ts
    /** JOIN
     * 
     * Joins this thread
     */
    async join(): Promise<Thread> { // ...
    ```

## Properties:
```ts
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
```