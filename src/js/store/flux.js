const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			contacts: null,
			full_name: "",
			email: "",
			agenda_slug: "my_super_agenda",
			address: "",
			phone: "",
			deleteId: ""
		},
		actions: {
			handleChange: e => {
				setStore({ [e.target.name]: e.target.value });
			},
			getContactsByAgenda: () => {
				const store = getStore();
				fetch("https://assets.breatheco.de/apis/fake/contact/agenda/my_super_agenda", {
					method: "GET",
					headers: {
						"Content-Type": "application/json"
					}
				})
					.then(resp => resp.json())
					.then(data => setStore({ contacts: data }))
					.catch(error => console.log(error));
			},
			saveContact: () => {
				const store = getStore();

				const contact = {
					full_name: store.full_name,
					email: store.email,
					agenda_slug: store.agenda_slug,
					address: store.adress,
					phone: store.phone
				};

				fetch("https://assets.breatheco.de/apis/fake/contact/", {
					method: "POST",
					body: JSON.stringify(contact),
					headers: {
						"Content-Type": "application/json"
					}
				})
					.then(resp => resp.json())
					.then(data => {
						getActions().getContactsByAgenda();
						setStore({
							full_name: "",
							email: "",
							agenda_slug: "my_super_agenda",
							address: "",
							phone: ""
						});
					})
					.catch(error => console.log(error));
			},
			editContact: id => {
				const store = getStore();
				const contact = {
					full_name: store.full_name,
					email: store.email,
					agenda_slug: store.agenda_slug,
					address: store.adress,
					phone: store.phone
				};

				fetch("https://assets.breatheco.de/apis/fake/contact/" + id, {
					method: "PUT",
					body: JSON.stringify(contact),
					headers: {
						"Content-Type": "application/json"
					}
				})
					.then(resp => resp.json())
					.then(data => {
						getActions().getContactsByAgenda();
						setStore({
							full_name: "",
							email: "",
							agenda_slug: "my_super_agenda",
							address: "",
							phone: ""
						});
					})
					.catch(error => console.log(error));
			},
			getElementId: id => {
				setStore({ deleteId: id });
			},
			deleteContact: () => {
				const store = getStore();
				fetch(`https://assets.breatheco.de/apis/fake/contact/${store.deleteId}`, {
					method: "DELETE",
					headers: {
						"Content-Type": "application/json"
					}
				})
					.then(resp => resp.json())
					.then(data => getActions().getContactsByAgenda())
					.catch(error => console.log(error));
			}
		}
	};
};

export default getState;
