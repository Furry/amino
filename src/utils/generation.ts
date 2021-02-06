export function generateId(sequence: number[] = [8, 4, 4, 4, 12], charset = "abcdef1234567890") {
    const chars = charset.split("")
    let res = ""
    sequence.forEach((item, index) => {
        for (let i = 0; i < item; i++) {
            res += chars[Math.floor(Math.random() * chars.length)]
        }
        if (index + 1 != sequence.length) {
            res += "-"
        }
    })
    return res
}