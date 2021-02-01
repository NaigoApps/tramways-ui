import {createStyles, makeStyles, StyleRules, Theme} from "@material-ui/core/styles";
import {BaseCSSProperties} from "@material-ui/core/styles/withStyles";

/*
 * Trick
 */
const absolute: "absolute" = "absolute";
const relative: "relative" = "relative";


const useStyles = makeStyles(({palette, spacing}: Theme) => createStyles({
    appBarTitle: {
        flexGrow: 1
    },
    fab: {
        position: absolute,
        top: spacing(2),
        right: spacing(2)
    },
    relative: {
        position: relative
    },
    container: {
        position: relative,
        marginTop: spacing(2)
    },
    centerContent: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column'
    },
    card: {
        padding: spacing(1)
    },
    formControl: {
        margin: spacing(1),
        minWidth: 120
    }
}));

export default useStyles;
