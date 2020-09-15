import {DistributionType, ExponentialDistribution, UniformDistribution} from "../../../../../api/generated";

export function newUniformDistribution(): UniformDistribution {
    return {
        distributionType: DistributionType.UNIFORM,
        left: 0,
        right: 1
    }
}

export function newExponentialDistribution(): ExponentialDistribution {
    return {
        distributionType: DistributionType.EXPONENTIAL,
        lambda: 1
    }
}
