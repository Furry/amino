import { GenericObject } from "../api/RequestBuilder";

export class Wallet {
    constructor(data: GenericObject) {
        Object.assign(this, data)
    }
}

/* START OF TYPINGS */
export interface Wallet {
    newUserCoupon: NewUserCoupon;
    adsVideoStats?: any;
    totalBusinessCoinsFloat: number;
    adsEnabled: boolean;
    businessCoinsEnabled: boolean;
    totalBusinessCoins: number;
    totalCoins: number;
    adsFlags: number;
    totalCoinsFloat: number;
}

export interface NewUserCoupon {
    scopeDesc: string;
    createdTime: Date;
    modifiedTime: Date;
    couponType: number;
    couponId: string;
    status: number;
    expiredTime?: any;
    expiredType: number;
    title: string;
    couponValue: number;
}