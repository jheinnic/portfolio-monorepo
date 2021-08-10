import {IPrimePowerRingProviderFactory} from "./prime-power-ring-provider-factory.interface";
import {IllegalArgumentError} from "@thi.ng/errors";
import {PrimePowerRingProvider} from "./prime-power-ring-provider.class";
import {IPrimePowerRingProvider} from "./prime-power-ring-provider.interface";

export class PrimePowerRingProviderFactory implements IPrimePowerRingProviderFactory {
    initProvider(generator: number, base_prime: number, prime_power: number): IPrimePowerRingProvider {
        if (generator < 2) {
            throw new IllegalArgumentError("generator must be > 1");
        }
        if (base_prime < 3) {
            throw new IllegalArgumentError("Prime must be > 2");
        }
        if (generator >= base_prime) {
            throw new IllegalArgumentError("generator must be less than base_prime");
        }
        if (prime_power < 1) {
            throw new IllegalArgumentError("prime power must be a positive number");
        }
        return new PrimePowerRingProvider(generator, base_prime, prime_power);
    }

}