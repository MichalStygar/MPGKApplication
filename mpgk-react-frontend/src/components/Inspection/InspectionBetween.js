import React, { Component } from "react";
import { connect } from "react-redux";
import {
	getConnectionAndStartTimeBetween,
	clearInspectionsListState
} from "../../actions/inspectionActions";
import { getConnections } from "../../actions/connectionActions";
import { getDevices } from "../../actions/deviceActions";
import { getPersons } from "../../actions/personActions";
import PropTypes from "prop-types";
import FormatDate from "../Common/FormatDate";
import { Link } from "react-router-dom";
import { tableStyles } from "../../consts/themeConsts";
import {
	withStyles,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	Button,
	TextField,
	Grid,
	Radio,
	RadioGroup,
	FormControlLabel,
	FormLabel,
	Typography,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Table,
	TableBody
} from "@material-ui/core";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";
import ErrorIcon from "@material-ui/icons/Error";
import { setSnackbar } from "../../reducers/snackbarReducer";
import { Formik, Form } from "formik";

class InspectionBetween extends Component {
	state = {
		connectionId: "",
		deviceId: "",
		personId: "",
		startTime: "",
		endTime: "",
		typeName: "przeglad"
	};

	onChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	componentWillUnmount() {
		this.props.clearInspectionsListState();
	}
	componentDidMount() {
		this.props.getConnections();
		this.props.getDevices();
		this.props.getPersons();
	}

	handleSubmit = () => {
		const {
			typeName,
			connectionId,
			deviceId,
			personId,
			startTime,
			endTime
		} = this.state;

		let id;
		switch (typeName) {
			case "przeglad":
				id = connectionId;
				break;
			case "urzadzenie":
				id = deviceId;
				break;
			case "pracownik":
				id = personId;
				break;
			default:
				break;
		}

		this.props
			.getConnectionAndStartTimeBetween(
				id,
				startTime,
				endTime,
				typeName,
				this.props.history
			)
			.then((res) => {
				if (res === 0) {
					this.props.setSnackbar(true, "Nie znaleziono przeglądów!");
				}
			});
	};

	render() {
		const { classes } = this.props;
		const { inspectionsList } = this.props.inspection;
		const { connections } = this.props.connection;
		const { devices } = this.props.device;
		const { persons } = this.props.person;

		return (
			<>
				<Formik
					initialValues={{
						inspection: ""
					}}
					onSubmit={this.handleSubmit}
				>
					{({ values }) => (
						<Form className={classes.form}>
							<Grid container spacing={2}>
								<Grid item xs={12}>
									<FormControl component="fieldset" required>
										<FormLabel component="legend">
											Metoda wyszukiwania
										</FormLabel>
										<RadioGroup row>
											<FormControlLabel
												value="przeglad"
												onChange={() => this.setState({ typeName: "przeglad" })}
												control={<Radio color="primary" />}
												label="Przegląd"
												checked={this.state.typeName === "przeglad"}
												labelPlacement="start"
											/>

											<FormControlLabel
												value="urzadzenie"
												onChange={() =>
													this.setState({ typeName: "urzadzenie" })
												}
												control={<Radio color="primary" />}
												label="Urządzenie"
												checked={this.state.typeName === "urzadzenie"}
												labelPlacement="start"
											/>

											<FormControlLabel
												onChange={() =>
													this.setState({ typeName: "pracownik" })
												}
												value="pracownik"
												checked={this.state.typeName === "pracownik"}
												control={<Radio color="primary" />}
												label="Pracownik"
												labelPlacement="start"
											/>
										</RadioGroup>
									</FormControl>
								</Grid>
								<Grid item xs={12}>
									{this.state.typeName === "przeglad" ? (
										<FormControl
											required
											variant="outlined"
											className={classes.formControl}
										>
											<InputLabel>Przegląd</InputLabel>
											<Select
												name="connectionId"
												value={this.state.connectionId}
												onChange={this.onChange}
												label="Przegląd"
											>
												<MenuItem value="">
													<em>Wybierz przegląd</em>
												</MenuItem>
												{connections.map((connection, index) => (
													<MenuItem key={index} value={connection.connectionId}>
														{connection.name}
													</MenuItem>
												))}
											</Select>
										</FormControl>
									) : this.state.typeName === "urzadzenie" ? (
										<FormControl
											required
											variant="outlined"
											className={classes.formControl}
										>
											<InputLabel>Urządzenie</InputLabel>
											<Select
												name="deviceId"
												value={this.state.deviceId}
												onChange={this.onChange}
												label="Urządzenie"
											>
												<MenuItem value="">
													<em>Wybierz urządzenie</em>
												</MenuItem>
												{devices.map((device, index) => (
													<MenuItem key={index} value={device.deviceId}>
														{device.name}
													</MenuItem>
												))}
											</Select>
										</FormControl>
									) : this.state.typeName === "pracownik" ? (
										<FormControl
											required
											variant="outlined"
											className={classes.formControl}
										>
											<InputLabel>Pracownik</InputLabel>
											<Select
												name="personId"
												value={this.state.personId}
												onChange={this.onChange}
												label="Pracownik"
											>
												<MenuItem value="">
													<em>Wybierz pracownika</em>
												</MenuItem>
												{persons.map((person, index) => (
													<MenuItem key={index} value={person.personId}>
														{person.name + " " + person.surname}
													</MenuItem>
												))}
											</Select>
										</FormControl>
									) : null}
								</Grid>
								<Grid item xs={12}>
									<TextField
										className={classes.formControl}
										required
										id="startTime"
										label="Początkowa data"
										type="datetime-local"
										variant="outlined"
										name="startTime"
										value={this.state.startTime}
										onChange={this.onChange}
										InputLabelProps={{
											shrink: true
										}}
									/>
								</Grid>
								<Grid item xs={12}>
									<TextField
										className={classes.formControl}
										required
										id="endTime"
										label="Końcowa data"
										type="datetime-local"
										variant="outlined"
										name="endTime"
										value={this.state.endTime}
										onChange={this.onChange}
										InputLabelProps={{
											shrink: true
										}}
									/>
								</Grid>
								<Grid item xs={12}>
									<Button
										className="mt-2 ml-2"
										type="submit"
										color="primary"
										variant="contained"
									>
										Szukaj
									</Button>
								</Grid>
							</Grid>
						</Form>
					)}
				</Formik>
                <Grid  container className={classes.form}>				
						<Grid item xs={false} md={2} />
						<Grid item xs={12} md={8}>
							<TableContainer>
								<Table>
									<TableHead>
                                        {inspectionsList[0] ? (
                                            <TableRow>
                                                <TableCell>
                                                    <Typography>
                                                        <b>Nazwa przeglądu</b>
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography>
                                                        <b>Plan</b>
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography>
                                                        <b>Status</b>
                                                    </Typography>
                                                </TableCell>
                                            </TableRow>
                                        ) : null}
									</TableHead>
									<TableBody>
                                    {inspectionsList.map((inspection, i) => (
										<TableRow key={i}>
											<TableCell>
												<Typography>
													<Link
														style={{
															color: "#000",
															textDecoration: "none"
														}}
														to={`/inspections/list/${inspection.connection.connectionId}/${inspection.startTime}/to/${inspection.endTime}/show`}
													>
														{inspection.connection.name}
													</Link>
												</Typography>
											</TableCell>
											<TableCell>
												<Typography>
                                                    <FormatDate date={inspection.startTime} /> Do
									                <FormatDate date={inspection.endTime} />
												</Typography>
											</TableCell>
											<TableCell>
												<Typography>
													{inspection.inspectionStatus === "Wykonany" ? (
														<CheckCircleIcon fontSize="large" color="primary" />
													) : inspection.inspectionStatus === "W trakcie" ? (
														<CancelIcon fontSize="large" color="primary" />
													) : (
                                                        <ErrorIcon fontSize="large" color="secondary" />
                                                    )}
												</Typography>
											</TableCell>
										</TableRow>
                                        ))}
									</TableBody>
								</Table>
							</TableContainer>
						</Grid>
						<Grid item xs={false} md={2} />
					</Grid>
                    
			</>
		);
	}
}

InspectionBetween.propTypes = {
	inspection: PropTypes.object.isRequired,
	connection: PropTypes.object.isRequired,
	device: PropTypes.object.isRequired,
	person: PropTypes.object.isRequired,
	getConnectionAndStartTimeBetween: PropTypes.func.isRequired,
	getConnections: PropTypes.func.isRequired,
	getDevices: PropTypes.func.isRequired,
	getPersons: PropTypes.func.isRequired,
	clearInspectionsListState: PropTypes.func.isRequired
};

const mapStateToPros = (state) => ({
	inspection: state.inspection,
	connection: state.connection,
	device: state.device,
	person: state.person
});

const mapDispatchToProps = (dispatch) => {
	return {
		getConnections: () => {
			dispatch(getConnections());
		},
		getDevices: () => {
			dispatch(getDevices());
		},
		getPersons: () => {
			dispatch(getPersons());
		},
		clearInspectionsListState: () => {
			dispatch(clearInspectionsListState());
		},
		setSnackbar: (snackbarOpen, snackbarMessage, snackbarTime) => {
			dispatch(setSnackbar(snackbarOpen, snackbarMessage, snackbarTime));
		},
		getConnectionAndStartTimeBetween(
			connectionId,
			startTime,
			endTime,
			typeName,
			history
		) {
			return dispatch(
				getConnectionAndStartTimeBetween(
					connectionId,
					startTime,
					endTime,
					typeName,
					history
				)
			).then((res) => {
				if (res && res.status === 200) return res.data.length;
			});
		}
	};
};

export default connect(
	mapStateToPros,
	mapDispatchToProps
)(withStyles(tableStyles)(InspectionBetween));
