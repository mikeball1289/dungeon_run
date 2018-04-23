export interface IProvider {
    ready(): Promise<void>;
    isReady(): boolean;
}