export declare namespace Configuration {
    /** Configuration defaults -> all of these keys are optional for users of your module. */
    interface Defaults {
        /** If set to true, my module will always fail. Default = false */
        keyCount: number;
        curve: "ed25519" | "jubjub";
    }
    /** Required configuration options, no defaults are used here */
    interface Required {
    }
    /** This is the interface you - as the module developer - are working with*/
    interface Runtime extends Defaults, Required {
    }
}
/** This is the interface for your module clients */
export interface Configuration extends Partial<Configuration.Defaults>, Configuration.Required {
}
export declare class ConfigurationImpl implements Configuration.Runtime {
    readonly curve: "ed25519" | "jubjub";
    readonly keyCount: number;
    constructor(overrides: Partial<Configuration.Defaults> & Configuration.Required);
}
//# sourceMappingURL=configuration.d.ts.map