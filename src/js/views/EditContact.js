import React, { useState, useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";

export const EditContact = ({ match: { params } }) => {
	const { store, actions } = useContext(Context);

	const [contact, setContact] = useState({});

	const { index } = params;

	useEffect(() => {
		if (store.contacts != null) {
			setContact(...store.contacts.filter((contact, i) => i == index));
		}
	}, []); //setea en el state contact el objeto que estamos llamando con el indice.

	return (
		<div className="container">
			<div>
				<h1 className="text-center mt-5">Edit your contact</h1>
				<form
					onSubmit={e => {
						e.preventDefault();
						actions.editContact(contact.id);
					}}>
					<div className="form-group">
						<label>Full Name</label>
						<input
							type="text"
							className="form-control"
							name="full_name"
							placeholder="Enter full name"
							defaultValue={contact.full_name}
							required
							onChange={actions.handleChange}
						/>
					</div>
					<div className="form-group">
						<label>Email</label>
						<input
							type="email"
							className="form-control"
							name="email"
							placeholder="Enter email"
							defaultValue={contact.email}
							required
							onChange={actions.handleChange}
						/>
					</div>
					<div className="form-group">
						<label>Phone</label>
						<input
							type="phone"
							className="form-control"
							name="phone"
							placeholder="Enter phone"
							defaultValue={contact.phone}
							required
							onChange={actions.handleChange}
						/>
					</div>
					<div className="form-group">
						<label>Address</label>
						<input
							type="text"
							className="form-control"
							name="adress"
							placeholder="Enter address"
							defaultValue={contact.address}
							required
							onChange={actions.handleChange}
						/>
					</div>
					<button className="btn btn-primary form-control">save changes</button>
					<Link className="mt-3 w-100 text-center" to="/">
						or get back to contacts
					</Link>
				</form>
			</div>
		</div>
	);
};

EditContact.propTypes = {
	match: PropTypes.object
};
