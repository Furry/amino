# Client (extends (BaseClient extends EventEmitter))
Represents the client account, containing an additional Profile as a property.

## Emits:
```ts
// On Thread/DM Message
"message", instanceof Message

// Raw socket data
"raw", instanceof String
```

## Getters:
  - ```ts
    /** 
     * Elevates the protected API class to instanceof BaseClient 
     */
    get elevator(): API { // ...
    ```

  - ```ts
    /**
     * Returns the self account
     */
    get account(): Account { // ...
    ```
## Methods
  - ```ts
    /** LOGIN
     * 
     * Logs into the client session
     * @param email string The email of the user account
     * @param password string The password of the user account
     */
    async login(email: string, password: string) { // ...
    ```

  - ```ts
    /** SEARCHCOMMUNITIES
     * 
     * Searches for communities matching a given string
     * @param query string The search element
     * @param start number Beginning Paging Index
     * @param stop number Ending Paging Index
     */
    async searchCommunities(query: string, start = 0, stop = 25): Promise<Community[]> {
    ```

  - ```ts
    /** SEARCHTHREADS
     * 
     * Searches for all threads matching a given search query.
     * @param query string The search element
     * @param start number Beginning Paging Index
     * @param stop number Ending Paging Index
     */
    async searchThreads(query: string, start = 0, stop = 25): Promise<Thread[]> {
    ```

  - ```ts
    /** FETCHTHREAD
     * 
     * Fetches a given thread from it's ID
     * @param id string The Thread's ID
     */
    async fetchThread(id: string): Promise<Thread> {
    ```

  - ```ts
    /** FETCHUSER
     * 
     * Fetches a user's profile from a given ID
     * @param id string The User's ID
     */
    async fetchUser(id: string): Promise<Profile> { // ...
    ```

  - ```ts
    /** FETCHBLOCKED
     * 
     * Returns a list of all blocked useres and users blocking you.
     */
    async fetchBlocked(): Promise<{ blockedUidList: string[], blockerUidList: string[] }> { // ...
    ```

  - ```ts
    /** FETCHWALLET
     * 
     * Returns the wallet of the client user
     */
    async fetchWallet(): Promise<Wallet> { // ...
    ```

## Properties:
  - NA