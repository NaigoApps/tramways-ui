import React from "react";
import TramIcon from "@material-ui/icons/Tram";
import DriveEtaIcon from "@material-ui/icons/DriveEta";
import HelpIcon from "@material-ui/icons/Help";

export function pointIcon(point: any) {
    switch (point.kind) {
        case "CAR":
            return <DriveEtaIcon/>;
        case "TRAM":
            return <TramIcon/>;
        default:
            return <HelpIcon/>;
    }
}
