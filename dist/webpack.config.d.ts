export namespace entry {
    const index: string;
}
export const target: string;
export namespace module {
    const rules: ({
        test: RegExp;
        use: {
            loader: string;
            options: {
                compilerOptions: {
                    noEmit: boolean;
                };
            };
        }[];
        exclude: RegExp;
        type?: undefined;
    } | {
        test: RegExp;
        type: string;
        use?: undefined;
        exclude?: undefined;
    })[];
}
export namespace resolve {
    const extensions: string[];
}
export namespace output {
    const path: string;
    const filename: string;
    namespace library {
        const type: string;
    }
}
export namespace optimization {
    const minimize: boolean;
}
export const devtool: string;
