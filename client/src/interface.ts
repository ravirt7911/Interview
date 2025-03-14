interface Data {
    Header: {
        Time: string;
        ReportName: string;
        DateMacro: string;
        ReportBasis: string;
        SummarizeColumnsBy: string;
        Currency: string;
        Option: {
        Name: string;
        Value: string;
        }[];
    };
    Columns: {
        Column: {
        ColTitle: string;
        ColType: string;
        MetaData: {
            Name: string;
            Value: string;
        }[];
        }[];
    };
    Rows: {
        Row: {
        Header?: {
            ColData: {
            value: string;
            id?: string;
            }[];
        };
        Rows?: {
            Row: {
            Header?: {
                ColData: {
                value: string;
                id?: string;
                }[];
            };
            Rows?: {
                Row: {
                ColData: {
                    value: string;
                    id?: string;
                }[];
                type?: string;
                }[];
            };
            ColData: {
                value: string;
                id?: string;
            }[];
            type?: string;
            }[];
        };
        ColData?: {
            value: string;
            id?: string;
        }[];
        type?: string;
        Summary?: {
            ColData: {
            value: string;
            }[];
        };
        }[];
    };
    }

export default Data;
    