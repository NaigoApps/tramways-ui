import Container from "@material-ui/core/Container";
import React, {FunctionComponent, useContext, useEffect} from "react";
import AppContext from "../AppContext";
import useStyles from "../utils/useStyles";

type PageProps = {
    title: string;
}

const Page: FunctionComponent<PageProps> = ({title, children}) => {
    const classes = useStyles();

    const {setAppBarTitle} = useContext(AppContext);

    useEffect(() => {
        setAppBarTitle(title);
    }, [setAppBarTitle, title]);

    return (
        <Container className={classes.container}>
            {children}
        </Container>
    );
};

export default Page;
