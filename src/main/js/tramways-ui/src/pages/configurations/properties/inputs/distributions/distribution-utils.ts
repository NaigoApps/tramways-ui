import {
  DistributionType,
  ExponentialDistribution,
  UniformDistribution
} from "../../../../../api/generated/projects";

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
