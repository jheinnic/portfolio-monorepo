import {IPrimePowerRingProvider} from "./prime-power-ring-provider.interface";

export interface IPrimePowerRingProviderFactory {
    initProvider(generator: number, base_prime: number, prime_power: number): IPrimePowerRingProvider
}