import React, { Component } from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getDevice, updateDevice } from "../../actions/deviceActions";

class UpdateDevice extends Component {
    constructor() {
        super();

        this.state = {
            id: "",
            name: "",
            status: "",
            type: "",
            errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    componentDidMount() {
        const { id } = this.props.match.params;
        this.props.getDevice(id, this.props.history);
    }

    componentDidUpdate(props, state, snapshot) {
        if (this.props.device !== props.device) {
            const { deviceId, name, status, type } = this.props.device;
            let editStatus;
            let editType;
            if (status === true) {
                editStatus = "true";
            } else {
                editStatus = "false";
            }
            if (type === true) {
                editType = "true";
            } else {
                editType = "false";
            }
            this.setState({
                id: deviceId,
                name: name,
                status: editStatus,
                type: editType
            });
        }
    }

    onSubmit(e) {
        e.preventDefault();

        const updatedDevice = {
            id: this.state.id,
            name: this.state.name,
            status: this.state.status,
            type: this.state.type
        };

        this.props.updateDevice(
            this.state.id,
            updatedDevice,
            this.props.history
        );
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.errors !== prevState.errors) {
            return { errors: nextProps.errors };
        } else {
            return null;
        }
    }

    render() {
        const { errors } = this.props;
        return (
            <div className="container mt-4">
                <h1 className="h2">Edytuj urządzenie</h1>
                <form onSubmit={this.onSubmit} className="mt-4">
                    <div className="row">
                        <div className="col-md-4 offset-md-4 text-center">
                            <div className="form-group">
                                <input
                                    className={classnames("form-control", {
                                        "is-invalid": errors.name
                                    })}
                                    name="name"
                                    type="text"
                                    value={this.state.name || ""}
                                    onChange={this.onChange}
                                    placeholder="Nazwa urządzenia"
                                />
                                {errors.name && (
                                    <div className="invalid-feedback">
                                        {errors.name}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-4 offset-md-4 text-center">
                            <div className="form-group ">
                                <label>Status urządzenia</label>
                                <br />
                                <div className="form-check">
                                    <input
                                        className={classnames(
                                            "form-check-input",
                                            { "is-invalid": errors.status }
                                        )}
                                        type="radio"
                                        name="status"
                                        value="true"
                                        checked={this.state.status === "true"}
                                        onChange={this.onChange}
                                    />
                                    <label className="form-check-label">
                                        Aktywne
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input
                                        className={classnames(
                                            "form-check-input",
                                            { "is-invalid": errors.status }
                                        )}
                                        type="radio"
                                        name="status"
                                        value="false"
                                        checked={this.state.status === "false"}
                                        onChange={this.onChange}
                                    />
                                    <label className="form-check-label">
                                        Nieaktywne
                                    </label>
                                    {errors.status && (
                                        <div className="invalid-feedback">
                                            {errors.status}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-4 offset-md-4 text-center">
                            <div className="form-group">
                                <label>Typ urządzenia</label>
                                <br />
                                <div className="form-check">
                                    <input
                                        className={classnames(
                                            "form-check-input",
                                            {
                                                "is-invalid": errors.type
                                            }
                                        )}
                                        type="radio"
                                        name="type"
                                        value="true"
                                        checked={this.state.type === "true"}
                                        onChange={this.onChange}
                                    />
                                    <label className="form-check-label">
                                        Z przeglądem
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input
                                        className={classnames(
                                            "form-check-input",
                                            {
                                                "is-invalid": errors.type
                                            }
                                        )}
                                        type="radio"
                                        name="type"
                                        value="false"
                                        checked={this.state.type === "false"}
                                        onChange={this.onChange}
                                    />
                                    <label className="form-check-label">
                                        Bez przeglądu
                                    </label>
                                    {errors.type && (
                                        <div className="invalid-feedback">
                                            {errors.type}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-12 text-center">
                            <button type="submit" className="btn btn-primary">
                                Zapisz
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

UpdateDevice.propTypes = {
    getDevice: PropTypes.func.isRequired,
    device: PropTypes.object.isRequired,
    updateDevice: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    device: state.device.device,
    errors: state.errors
});

export default connect(mapStateToProps, { getDevice, updateDevice })(
    UpdateDevice
);