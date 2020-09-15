import {DecimalProperty, IntegerProperty, Property} from "../../../api/generated";

export function integerProperty(props: Array<Property>, name: string): IntegerProperty {
    return props.find(p => p.name === name) as IntegerProperty;
}

export function decimalProperty(props: Array<Property>, name: string): DecimalProperty {
    return props.find(p => p.name === name) as DecimalProperty;
}
