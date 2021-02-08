import { GenericObject } from "../api/RequestBuilder";
import { BaseClient } from "../client/BaseClient";
import { Comment } from "./Comment";

export class Profile {
    constructor(public client: BaseClient, data: GenericObject) {
        Object.assign(this, data)
    }

    /** COMMENT
     * 
     * @param content string The content you want to add to a person's wall
     */
    async comment(content: string): Promise<Comment> {
        const res = await this.client.elevator.request
            .setEndpoint(`user-profile/${this.ndcId}`)
            .setBody({
                content: content,
                mediaList: [],
                stickerId: null,
                type: 0,
                eventSource: "UserProfileView",
                timestamp: Date.now()
            })
            .send("json")
        return new Comment(this.client, res)
    }
}

/* START OF TYPINGS */
export interface Profile {
    status: number;
    moodSticker?: any;
    itemsCount: number;
    consecutiveCheckInDays?: any;
    uid: string;
    modifiedTime: Date;
    followingStatus: number;
    onlineStatus: number;
    accountMembershipStatus: number;
    isGlobal: boolean;
    reputation: number;
    postsCount: number;
    membersCount: number;
    nickname: string;
    mediaList?: any;
    icon?: any;
    isNicknameVerified: boolean;
    mood?: any;
    level: number;
    notificationSubscriptionStatus: number;
    pushEnabled: boolean;
    membershipStatus: number;
    content?: any;
    joinedCount: number;
    role: number;
    commentsCount: number;
    aminoId: string;
    ndcId: number;
    createdTime: Date;
    extensions?: any;
    storiesCount: number;
    blogsCount: number;
}

export interface ProfilePartial {
    uid: string;
    status: number;
    icon: string;
    reputation: number;
    role: number;
    nickname: string;
    level: number;
    accountMembershipStatus: number;
}