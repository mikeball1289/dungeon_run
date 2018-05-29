// generic provider methods
export interface IProvider {
    ready(): Promise<void>;
    isReady(): boolean;
}