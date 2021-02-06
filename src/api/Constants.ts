export default {
    API: {
        version: "v1",
        url: "https://service.narvii.com/api",
        defaultCommunity: "g",
        suffix: "s"
    },
    Socket: {
        url: `wss://ws4.narvii.com`
    },
    Device: {
        // PLEASE help me find a way to make this dynamic...
        userAgent: "Amino-Wrapper/2.0 NodeJS (https://github.com/furry/amino)",
        deviceID: "01A1D20632BF568909214A9E22EF09DE4BEB27522EA3554C8659D730C77AF1ED22412BEC2B4D9F7219",
        msgSignature: "AXFuxvjq3Drs589R8UmpwsuB1kp3"
    }
}