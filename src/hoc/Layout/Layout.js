import React, {Component} from "react";
import classes from "./Layout.module.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

class Layout extends Component {

    state = {
        showSideDrawer: false
    }

    toggleSideDrawerHandler = () => {
        this.setState(prevState => {
            return {showSideDrawer: !prevState.showSideDrawer};
        });
    }

    render() {
        return (
            <React.Fragment>
                <Toolbar 
                    toggleSideDrawer={this.toggleSideDrawerHandler}/>
                <SideDrawer 
                    showSideDrawer={this.state.showSideDrawer}
                    toggleSideDrawer={this.toggleSideDrawerHandler}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </React.Fragment>
        )
    }
};

export default Layout;