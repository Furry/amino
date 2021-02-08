import { BaseClient } from "..";
import { GenericObject } from "../api/RequestBuilder";
import { Profile } from "./Profile";

export class Comment {
    constructor(client: BaseClient, data: GenericObject) {
        const arangement = {
            ...data.comment,
            account: new Profile(client, data.author)
        }
        Object.assign(this, arangement)
    }
}

export interface Extensions {

}

export interface Comment {
    modifiedTime: Date;
    ndcId: number;
    votedValue: number;
    parentType: number;
    commentId: string;
    parentNdcId: number;
    mediaList?: any;
    votesSum: number;
    author: Profile;
    content: string;
    extensions: Extensions;
    parentId: string;
    createdTime: Date;
    subcommentsCount: number;
    type: number;
}