import {ExponentialDistribution, UniformDistribution} from "@tramways/projects-service-api";

export function newUniformDistribution(): UniformDistribution {
    return {
        distributionType: "UniformDistributionType",
        left: 0,
        right: 1
    }
}

export function newExponentialDistribution(): ExponentialDistribution {
    return {
        distributionType: "UniformDistributionType",
        lambda: 1
    }
}
