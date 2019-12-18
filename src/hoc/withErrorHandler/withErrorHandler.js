import React, {Component} from "react";
import Modal from "../../components/UI/Modal/Modal";

const withErrorHandler = (WrappedComponent, axios) => {

    return class extends Component {

        // using a constructor to execute interceptors right at the beginning
        // because "componentWillMount" is depricated
        // and componentDidMount only works for errors from post requests
        // it does not work for get requests because get requests happen before componentDidMount
        // so contructor is best option

        constructor(props) {
            super(props);
            this.state = {
                err: null
            };

            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({error: null});
                return req;
            });
            this.resInterceptor = axios.interceptors.response.use(res => res, err => {
                this.setState({err: err});
            });
        };

        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

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