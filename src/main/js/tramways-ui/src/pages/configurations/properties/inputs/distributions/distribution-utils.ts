import {
  ExponentialDistribution,
  UniformDistribution
} from "../../../../../api/generated/projects";
import {DistributionType} from "../../../../../api/generated/analysis";

export function newUniformDistribution(): UniformDistribution {
    return {
        distributionType: DistributionType.Uniform,
        left: 0,
        right: 1
    }
}

export function newExponentialDistribution(): ExponentialDistribution {
    return {
        distributionType: DistributionType.Exponential,
        lambda: 1
    }
}
