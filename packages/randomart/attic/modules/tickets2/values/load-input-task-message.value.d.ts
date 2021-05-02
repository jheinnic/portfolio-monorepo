import { KeyPairLocator } from '../interface/locators';
import { CompletionSignal } from '../../../../src/modules/randomArt/messages';
import { Path, UUID } from '../../../../../src/infrastructure/validation';
import { RenderStyleName } from '../interface/policies';
export declare class LoadInputTaskMessage {
    readonly publicKeyLocator: KeyPairLocator;
    readonly renderPolicyName: RenderStyleName;
    readonly configVersion: UUID;
    readonly relativeOutputPath: Path;
    readonly completeSignal: CompletionSignal<void>;
    constructor(publicKeyLocator: KeyPairLocator, renderPolicyName: RenderStyleName, configVersion: UUID, relativeOutputPath: Path, completeSignal: CompletionSignal<void>);
}
//# sourceMappingURL=load-input-task-message.value.d.ts.map