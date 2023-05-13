export type ScannerOptions = {
    ingestUrl: string;
};
export declare function scanner(options: ScannerOptions): {
    scanner: string;
    hash: string;
};
