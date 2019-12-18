import React, {Component} from "react";
import Modal from "../../components/UI/Modal/Modal";

const withErrorHandler = (WrappedComponent, axios) => {

    return class extends Component {

        constructor(props) {
            super(props);
            this.state = {
                err: null
            };
            axios.interceptors.request.use(req => {
                this.setState({error: null});
                return req;
            });
            axios.interceptors.response.use(res => res, err => {
                this.setState({err: err});
            });
        }

        // componentDidMount() {
        //     axios.interceptors.request.use(req => {
        //         this.setState({error: null});
        //         return req;
        //     });
        //     axios.interceptors.response.use(res => res, err => {
        //         this.setState({err: err});
        //     });
        // }

        errConfirmedHandler = () => {
            this.setState({err: null});
        }

        render () {
            return (
                <React.Fragment>
                    <Modal 
                        show={this.state.err}
                        togglePurchase={this.errConfirmedHandler}>
                        {this.state.err ? this.state.err.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </React.Fragment>
            );
        }
    }
}

export default withErrorHandler;