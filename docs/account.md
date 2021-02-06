# Account
Represents the client account, containing an additional Profile as a property.
## Methods
  - NA

## Properties:
```ts
export interface Account {
    profile: Profile
    username?: any;
    status: number;
    uid: string;
    modifiedTime: Date;
    twitterID?: any;
    activation: number;
    phoneNumberActivation: number;
    emailActivation: number;
    appleID?: any;
    facebookID?: any;
    nickname: string;
    mediaList?: any;
    googleID?: any;
    icon?: any;
    securityLevel: number;
    phoneNumber?: any;
    membership?: any;
    advancedSettings: AdvancedSettings;
    role: number;
    aminoIdEditable: boolean;
    aminoId: string;
    createdTime: Date;
    extensions: Extensions;
    email: string;
}

export interface AdvancedSettings {
    amplitudeAnalyticsEnabled: number;
    amplitudeAppId?: any;
}

export interface DeviceInfo {
    lastClientType: number;
}

export interface Ads {
    status: number;
}

export interface PopupConfig {
    ads: Ads;
}

export interface Extensions {
    adsFlags: number;
    adsLevel: number;
    deviceInfo: DeviceInfo;
    popupConfig: PopupConfig;
    mediaLabAdsMigrationAugust2020: boolean;
    adsEnabled: boolean;
}
```